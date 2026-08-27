// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// Structura In-Memory MCP Transport
//
// Routes Structura tool calls directly through the browser-resident Structura
// instance — zero HTTP, zero Node.js server.
//
// When Structura is embedded in the same browser context as this application,
// it exposes two surfaces:
//
//   window.__STRUCTURA_API__      — low-level entity/link CRUD (always present)
//   window.__STRUCTURA_MCP_DISPATCH__ — high-level MCP handler (requires one
//                                       addition from the Structura team, see
//                                       the spec in ErathosCanvas.tsx)
//
// Strategy:
//   1. If __STRUCTURA_MCP_DISPATCH__ is available  →  delegate directly to it
//      (full fidelity: schema validation, animations, telemetry — all via
//       Structura's own handlers, just in-process instead of over HTTP)
//   2. Else fall back to __STRUCTURA_API__ low-level calls + manual DOM
//      attribute writes for the observability contract.
// ─────────────────────────────────────────────────────────────────────────────

import type { McpToolResult, McpTransport } from './mcp-transport.interface';

// ── Types ────────────────────────────────────────────────────────────────────

interface DagExchangeNode {
  id: string;
  name: string;
}

interface DagExchangeEdge {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
}

interface DagExchange {
  type: 'DAGExchange';
  version: string;
  nodes: DagExchangeNode[];
  edges: DagExchangeEdge[];
  applyAfterLoad?: string[];
}

interface TelemetryEntity {
  id: string;
  state: string;
  effect: string;
}

// ── Structura window surface ──────────────────────────────────────────────────

type StructuraMcpDispatch = (
  toolName: string,
  args: Record<string, unknown>
) => Promise<McpToolResult>;

interface StructuraApi {
  getAllEntities(): Array<{ id: string }> | null;
  getAllLinks(): Array<{ id: string }> | null;
  createEntity(entity: Record<string, unknown>): unknown;
  removeEntity(id: string): void;
  createLink(link: Record<string, unknown>): unknown;
  removeLink(id: string): void;
  updateEntityMetadata(id: string, metadata: Record<string, unknown>): void;
  fitToScreen(): void;
}

declare global {
  interface Window {
    __STRUCTURA_MCP_DISPATCH__?: StructuraMcpDispatch;
    __STRUCTURA_API__?: StructuraApi;
  }
}

// ── Handled tool names ────────────────────────────────────────────────────────

const STRUCTURA_TOOLS = new Set([
  'structura_inject_schema',
  'structura_report_progress',
  'structura_discovery',
  'structura_auto_layout',
  'structura_load_workspace',
  'structura_get_settings',
  'structura_update_settings',
  'structura_create_schema',
  'structura_rename_schema',
  'structura_activate_schema',
]);

// ── ok result helper ─────────────────────────────────────────────────────────

function ok(data: Record<string, unknown> = { success: true }): McpToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data) }] };
}

// ── Low-level fallback handlers (using __STRUCTURA_API__) ────────────────────

function getApi(): StructuraApi | null {
  return window.__STRUCTURA_API__ ?? null;
}

function getCanvasSvg(): Element | null {
  return document.querySelector('[data-testid="structura-canvas-svg"]');
}

/** Apply data-entity-state and data-entity-effect to DOM for observability */
function applyTelemetryAttributes(entities: TelemetryEntity[]): void {
  const svg = getCanvasSvg();
  if (!svg) return;

  for (const entity of entities) {
    const el = svg.querySelector(`[data-entity-id="${entity.id}"]`);
    if (!el) continue;

    el.setAttribute('data-entity-state', entity.state);
    if (entity.effect && entity.effect !== 'none') {
      el.setAttribute('data-entity-effect', entity.effect);
    } else {
      el.removeAttribute('data-entity-effect');
    }
  }
}

function handleInjectSchemaFallback(args: Record<string, unknown>): McpToolResult {
  const api = getApi();
  if (!api) return ok({ success: false, reason: '__STRUCTURA_API__ not available' });

  const dag = args.payload as DagExchange;
  if (!dag?.nodes) return ok({ success: false, reason: 'Invalid DAGExchange payload' });

  // 1. Clear existing topology
  try {
    const links = api.getAllLinks();
    if (links) links.forEach(l => api.removeLink(l.id));
    const entities = api.getAllEntities();
    if (entities) entities.forEach(e => api.removeEntity(e.id));
  } catch {
    // Canvas may not have a loaded workspace yet — that's OK
  }

  // 2. Create nodes
  for (const node of dag.nodes) {
    try {
      api.createEntity({ id: node.id, name: node.name });
    } catch (e) {
      console.warn(`[InMemoryMcp] createEntity(${node.id}) failed:`, e);
    }
  }

  // 3. Create edges
  for (const edge of dag.edges) {
    try {
      api.createLink({
        id: edge.id,
        sourceEntityId: edge.sourceEntityId,
        targetEntityId: edge.targetEntityId,
      });
    } catch (e) {
      console.warn(`[InMemoryMcp] createLink(${edge.id}) failed:`, e);
    }
  }

  // 4. Apply after-load directives
  if (dag.applyAfterLoad?.includes('auto-layout')) {
    try { api.fitToScreen(); } catch { /* no-op */ }
  }

  return ok();
}

function handleReportProgressFallback(args: Record<string, unknown>): McpToolResult {
  const entities = (args.entities as TelemetryEntity[]) ?? [];

  // Update entity metadata via low-level API if available
  const api = getApi();
  if (api) {
    for (const entity of entities) {
      try {
        api.updateEntityMetadata(entity.id, {
          telemetryState: entity.state,
          telemetryEffect: entity.effect,
        });
      } catch { /* entity may not exist yet */ }
    }
  }

  // Always write DOM attributes — these are the observability contract
  applyTelemetryAttributes(entities);

  return ok();
}

function handleAutoLayoutFallback(): McpToolResult {
  const api = getApi();
  if (api) { try { api.fitToScreen(); } catch { /* no-op */ } }
  return ok();
}

function handleDiscovery(): McpToolResult {
  const guide = {
    golden_rule: 'Use inject_schema for topology. Use report_progress for telemetry. Use load_workspace for full session restore only.',
    tools: {
      structura_inject_schema: 'Accepts DAGExchange. Replaces the entire topology. No positions — Structura handles layout.',
      structura_report_progress: 'Fire-and-forget telemetry. Sets entity state (not_started|in_progress|success|error|info) and effect (none|glow|shake|blink).',
      structura_load_workspace: 'Full WorkspaceState restore — pan, zoom, themes. Use once per session, never for incremental updates.',
      structura_auto_layout: 'Triggers layout engine. Prefer applyAfterLoad in DAGExchange instead.',
    },
  };
  return ok({ tools_guide: guide });
}

// ── Transport implementation ──────────────────────────────────────────────────

export class StructuraInMemoryTransport implements McpTransport {
  canHandle(toolName: string): boolean {
    return STRUCTURA_TOOLS.has(toolName);
  }

  /**
   * Wait up to `timeoutMs` for __STRUCTURA_MCP_DISPATCH__ to become available.
   * Structura's initializeStructuraWebview is async — the canvas mounts after
   * a few hundred ms. Calls that arrive before mount must wait.
   */
  private waitForDispatch(timeoutMs = 5000): Promise<StructuraMcpDispatch | null> {
    if (typeof window.__STRUCTURA_MCP_DISPATCH__ === 'function') {
      return Promise.resolve(window.__STRUCTURA_MCP_DISPATCH__!);
    }
    return new Promise(resolve => {
      const deadline = Date.now() + timeoutMs;
      const poll = setInterval(() => {
        if (typeof window.__STRUCTURA_MCP_DISPATCH__ === 'function') {
          clearInterval(poll);
          resolve(window.__STRUCTURA_MCP_DISPATCH__!);
        } else if (Date.now() > deadline) {
          clearInterval(poll);
          resolve(null);
        }
      }, 50);
    });
  }

  async callTool(
    toolName: string,
    args: Record<string, unknown>
  ): Promise<McpToolResult> {
    // ── Path 1: High-fidelity dispatch via __STRUCTURA_MCP_DISPATCH__ ─────────
    // Waits up to 5s for Structura to finish mounting (initializeStructuraWebview
    // is async). Once available, routes directly to Structura's internal handlers:
    // full schema validation, animations, telemetry — zero HTTP.
    const dispatch = await this.waitForDispatch();
    if (dispatch) {
      return dispatch(toolName, args);
    }

    // ── Path 2: Low-level fallback via __STRUCTURA_API__ ────────────────────
    // Functional but without Structura's internal animation engine.
    // DOM observability attributes are still applied correctly.
    console.debug(`[InMemoryMcp] Dispatching '${toolName}' via low-level API fallback`);

    switch (toolName) {
      case 'structura_inject_schema':
        return handleInjectSchemaFallback(args);
      case 'structura_report_progress':
        return handleReportProgressFallback(args);
      case 'structura_auto_layout':
        return handleAutoLayoutFallback();
      case 'structura_discovery':
        return handleDiscovery();
      default:
        return ok({ success: false, reason: `Tool '${toolName}' has no in-memory handler` });
    }
  }
}

export const structuraInMemoryTransport = new StructuraInMemoryTransport();
