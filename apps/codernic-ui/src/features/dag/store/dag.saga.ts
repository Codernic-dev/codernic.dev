// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { all, put, takeEvery, call, select, takeLatest, actionChannel, take } from 'redux-saga/effects';
import { callMcpTool } from '../../../shared/api/mcp-client';
import type { AgentRunState, AnalyseProgressState, PhaseGateState, RagProgressState, PirsigMetrics, AgentIntrospectionEvent } from '../../../entities/kernel/model/types';
import type { JourneyPhase } from '../../../../../codernic-ext/src/features/codernic/model/journey-state';
import { sendIntent } from '../../../shared/store/intent';
import type { RootState } from '../../../store';
import { fetchArtifactContentSuccess } from '../../../entities/artifacts/model/artifacts-slice';
import { SandboxSimulationEngine } from '../../sandbox/engine/sandbox.engine';

import {
  agentRunStarted,
  updateKernelState,
  setAnalyseProgress,
  setRagProgress,
  setPhaseGate,
  setJourneyPhase,
  setPirsigMetrics,
  setApprovalRequest,
  setArtifactReview,
  setErathosSyncing,
} from './dag.slice';
import { updateSystemStatus } from '../../system/store/system.slice';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface DagWsAction {
  type: string;
  payload?: Record<string, unknown> & {
    taskId?: string;
    profile?: string;
    currentStep?: string;
    percentage?: number;
    currentPhase?: number;
    type?: string;
    step_id?: string;
    delta?: string;
    status?: string;
    sessionId?: string;
  };
}

interface ReconstructedNode {
  id: string;
  name: string;
  dependencies: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Fire-and-forget MCP call
// Never blocks the saga — Structura handles what it receives asynchronously.
// ─────────────────────────────────────────────────────────────────────────────

function callMcpFireAndForget(tool: string, args: Record<string, unknown>): void {
  (callMcpTool as (name: string, args: unknown) => Promise<unknown>)(tool, args)
    .catch((err: unknown) => {
      console.warn(`[dag.saga] Fire-and-forget MCP call '${tool}' failed silently:`, err);
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Build a full Structura workspace from topology nodes.
// Uses structura_load_workspace (in-memory) rather than inject_schema,
// which requires the HTTP MCP server in Structura <= v2.3.18.
// Layout: BFS topological column assignment → column × row grid placement.
// ─────────────────────────────────────────────────────────────────────────────

const NODE_W = 200;
const NODE_H = 80;
const COL_GAP = 120;
const ROW_GAP = 60;

function buildStructuraWorkspace(nodes: ReconstructedNode[]) {
  // ── 1. Compute depth (column) for each node via BFS from roots ──────────
  const depthMap: Record<string, number> = {};
  const allIds = new Set(nodes.map(n => n.id));

  // Roots = nodes with no dependencies (or dependencies outside our set)
  const queue: string[] = [];
  nodes.forEach(n => {
    const internalDeps = n.dependencies.filter(d => allIds.has(d));
    if (internalDeps.length === 0) {
      depthMap[n.id] = 0;
      queue.push(n.id);
    }
  });

  // BFS
  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));
  const visited = new Set<string>(queue);
  let head = 0;
  while (head < queue.length) {
    const current = queue[head++];
    const currentDepth = depthMap[current] ?? 0;
    // Find all nodes that depend on current
    nodes.forEach(n => {
      if (n.dependencies.includes(current)) {
        const newDepth = currentDepth + 1;
        if (depthMap[n.id] === undefined || depthMap[n.id] < newDepth) {
          depthMap[n.id] = newDepth;
        }
        if (!visited.has(n.id)) {
          visited.add(n.id);
          queue.push(n.id);
        }
      }
    });
  }

  // Assign depth 0 to any remaining (disconnected) nodes
  nodes.forEach(n => { if (depthMap[n.id] === undefined) depthMap[n.id] = 0; });

  // ── 2. Assign row within each column ────────────────────────────────────
  const rowCountPerCol: Record<number, number> = {};
  const posMap: Record<string, { x: number; y: number }> = {};
  nodes.forEach(n => {
    const col = depthMap[n.id];
    const row = rowCountPerCol[col] ?? 0;
    rowCountPerCol[col] = row + 1;
    posMap[n.id] = {
      x: 60 + col * (NODE_W + COL_GAP),
      y: 60 + row * (NODE_H + ROW_GAP),
    };
  });

  // ── 3. Build Structura entities + links ─────────────────────────────────
  const entities = nodes.map(n => ({
    id: n.id,
    name: n.name,
    position: posMap[n.id],
    dimensions: { width: NODE_W, height: NODE_H },
    shape: 'box',
    color: '',
    description: '',
    properties: [] as Array<{ key: string; label: string; value: string; dataType: string; componentType: string }>,
  }));

  const links = nodes.flatMap(n =>
    n.dependencies
      .filter(dep => allIds.has(dep))
      .map(dep => ({
        id: `link-${dep}-${n.id}`,
        leftEntityId: dep,
        rightEntityId: n.id,
        leftAnchorId: 'right',
        rightAnchorId: 'left',
      }))
  );

  const schemaId = 'codernic-dag-schema';
  const canvasId = 'codernic-dag-canvas';

  return {
    id: 'codernic-dag-workspace',
    name: 'Codernic DAG',
    active_canvas_id: canvasId,
    canvases: {
      [canvasId]: {
        id: canvasId,
        name: 'DAG',
        active_schema_id: schemaId,
        schemas: {
          [schemaId]: {
            id: schemaId,
            name: 'Agent Graph',
            entities,
            links,
          },
        },
        viewport: { zoom: 1, pan: { x: 0, y: 0 } },
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Reconstruct current node topology from introspection events
// ─────────────────────────────────────────────────────────────────────────────

function reconstructNodesFromEvents(events: AgentIntrospectionEvent[]): Record<string, ReconstructedNode> {
  const nodes: Record<string, ReconstructedNode> = {};

  events.forEach(evt => {
    const innerPayload = (evt.payload as Record<string, unknown>) || {};
    const type = evt.type;

    if (type === 'dag_initialized') {
      // Reset — fresh DAG
      Object.keys(nodes).forEach(k => delete nodes[k]);
      let initNodes: Array<{ id: string; role?: string; dependencies?: string[] }> = [];
      if (typeof innerPayload.nodes === 'string') {
        try { initNodes = JSON.parse(innerPayload.nodes); } catch { /* ignore */ }
      } else if (Array.isArray(innerPayload.nodes)) {
        initNodes = innerPayload.nodes as typeof initNodes;
      }
      initNodes.forEach(n => {
        nodes[n.id] = { id: n.id, name: n.role || n.id, dependencies: n.dependencies || [] };
      });

    } else if (type === 'dag_mutation') {
      const mutationPayload = innerPayload as Record<string, unknown>;
      // New node added dynamically
      if (mutationPayload.type === 'node_added' && mutationPayload.node) {
        const n = mutationPayload.node as { id: string; role?: string; dependencies?: string[] };
        nodes[n.id] = { id: n.id, name: n.role || n.id, dependencies: n.dependencies || [] };
      }
      // Reviewer injected on failure
      const reviewerId = mutationPayload.new_reviewer_node as string | undefined;
      const failedNodeId = mutationPayload.failed_node as string | undefined;
      if (reviewerId && !nodes[reviewerId]) {
        nodes[reviewerId] = {
          id: reviewerId,
          name: 'Reviewer',
          dependencies: failedNodeId ? [failedNodeId] : [],
        };
      }
    }
  });

  return nodes;
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: Rebuild DAG topology and push to Structura via load_workspace.
// We bypass inject_schema (which requires the HTTP MCP server in v2.3.18)
// and instead push a full workspace state — entities already positioned
// via the BFS layout algorithm above. Structura reconciles the DOM on receipt.
// ─────────────────────────────────────────────────────────────────────────────

function* rebuildSchemaAndSync(): Generator<any, void, any> {
  const events: AgentIntrospectionEvent[] = yield select(
    (state: RootState) => state.dag.introspectionEvents
  );
  if (!events || events.length === 0) return;

  const nodeMap = reconstructNodesFromEvents(events);
  const nodes = Object.values(nodeMap);
  if (nodes.length === 0) return;

  const workspace = buildStructuraWorkspace(nodes);

  try {
    // structura_load_workspace dispatches 'state-loaded' inside Structura's Redux.
    // The canvas reconciliation loop then creates DOM entities from the schema.
    // Zero HTTP — all in-memory via window.__STRUCTURA_MCP_DISPATCH__.
    yield call(callMcpTool as any, 'structura_load_workspace', { payload: workspace });
  } catch (err) {
    console.error('[dag.saga] Failed to load workspace into Structura:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: Main WS event handler
// ─────────────────────────────────────────────────────────────────────────────

function* handleDagEvents(action: DagWsAction): Generator<any, void, any> {
  const type = action.type;
  const payload = action.payload;
  const currentSessionId: string | null = yield select((state: RootState) => state.sessions.currentSessionId);

  if (type === 'WS/codernic:agent-run-started') {
    yield put(agentRunStarted({ sessionId: payload?.sessionId || currentSessionId || '', run: payload as unknown as AgentRunState }));
    yield put({ type: 'chat/setThinking', payload: { sessionId: payload?.sessionId || currentSessionId || '', state: { phase: 'executing' } } });

  } else if (type === 'WS/kernel_state_update') {
    yield put(updateKernelState(payload));

  } else if (type === 'WS/codernic:await-approval') {
    yield put(setApprovalRequest(payload as { id: string; prompt: string }));

  } else if (type === 'WS/ArtifactRequestedReview') {
    yield put(setArtifactReview(payload as { title: string; filename: string; content?: string }));

  } else if (type === 'WS/codernic:task-ready') {
    yield put({ type: 'chat/setRemoteTaskId', payload: { sessionId: payload?.sessionId || currentSessionId || '', taskId: payload?.taskId } });

  } else if (type === 'WS/codernic:analyse-started') {
    yield put(setAnalyseProgress({
      sessionId: payload?.sessionId || currentSessionId || '',
      progress: {
        steps: { 'tech-identification': 'pending', 'convention-mining': 'pending', 'agent-generation': 'pending' },
        currentStep: 'tech-identification',
        totalCostUSD: 0,
        profile: payload?.profile,
      } as unknown as AnalyseProgressState
    }));
    yield put({ type: 'chat/setThinking', payload: { sessionId: payload?.sessionId || currentSessionId || '', state: { phase: 'reasoning' } } });

  } else if (type === 'WS/codernic:analyse-progress') {
    yield put(setAnalyseProgress({ sessionId: payload?.sessionId || currentSessionId || '', progress: payload as unknown as AnalyseProgressState }));
    if (payload?.currentStep === null) {
      yield put({ type: 'chat/setSending', payload: false });
      yield put({ type: 'chat/setThinking', payload: { sessionId: payload?.sessionId || currentSessionId || '', state: { phase: 'idle' } } });
    }

  } else if (type === 'WS/codernic:journey-phase-gate') {
    yield put(setPhaseGate(payload as unknown as PhaseGateState));

  } else if (type === 'WS/codernic:indexing-progress') {
    yield put(setRagProgress(payload as unknown as RagProgressState));
    if (payload?.percentage === 100) {
      yield put(setRagProgress(null));
    }

  } else if (type === 'WS/codernic:indexing-done' || type === 'WS/codernic:indexing-error') {
    yield put(setRagProgress(null));

  } else if (type === 'WS/codernic:journey-phase-advanced') {
    yield put(setJourneyPhase(payload?.currentPhase as JourneyPhase));
    yield put(setPhaseGate(null));

  } else if (type === 'WS/codernic:ast-metrics') {
    yield put(setPirsigMetrics(payload as unknown as PirsigMetrics));

  } else if (type === 'WS/codernic:agent-event' || type === 'WS/codernic:agent-introspection') {
    const typeStr = (payload?.type as string) || 'unknown';

    // 1. Persist in Redux (Galileus DAW)
    yield put({
      type: 'dag/addIntrospectionEvent',
      payload: {
        type: typeStr,
        step_id: payload?.step_id,
        delta: payload?.delta,
        payload: payload?.payload,
        timestamp: Date.now(),
      }
    });

    // 2. Rebuild topology if structural event
    if (typeStr === 'dag_initialized' || typeStr === 'dag_mutation') {
      yield call(rebuildSchemaAndSync);
    }

    // 3. Push telemetry to Structura — FIRE AND FORGET, never blocks
    if (typeStr === 'dag_initialized') {
      // Reset all nodes to not_started on a new DAG
      const rawNodes = (payload?.payload as Record<string, unknown>)?.nodes;
      const nodes = Array.isArray(rawNodes) ? rawNodes as Array<{ id: string }> : [];
      if (nodes.length > 0) {
        callMcpFireAndForget('structura_report_progress', {
          entities: nodes.map(n => ({ id: n.id, state: 'not_started', effect: 'none' })),
          links: [],
        });
      }
    } else {
      const nodeId = payload?.step_id || (payload?.payload as Record<string, unknown> | undefined)?.node_id;
      if (nodeId) {
        let stateVal = 'in_progress';
        let effectVal = 'glow';

        if (typeStr.includes('success') || typeStr.includes('end')) {
          stateVal = 'success';
          effectVal = 'none';
        } else if (typeStr.includes('fail') || typeStr.includes('error')) {
          stateVal = 'error';
          effectVal = 'shake';
        } else if (typeStr === 'vector_commit' || typeStr === 'agent_message') {
          stateVal = 'info';
          effectVal = 'blink';
        }

        callMcpFireAndForget('structura_report_progress', {
          entities: [{ id: nodeId, state: stateVal, effect: effectVal }],
          links: [],
        });
      }
    }

  } else if (type === 'WS/codernic:heartbeat') {
    yield put({ type: 'telemetry/updateHeartbeat', payload: (payload as Record<string, unknown>)?.status });
    yield put(updateSystemStatus({ daemonStatus: (payload as Record<string, unknown>)?.status === 'ok' ? 'running' : 'stopped' }));

  } else if (type === 'WS/codernic:health-telemetry') {
    yield put({ type: 'telemetry/updateDiagnostic', payload });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: Approvals
// ─────────────────────────────────────────────────────────────────────────────

interface ApprovalAction {
  type: string;
  payload: {
    id: string;
    verdict: string;
    feedback?: string;
  };
}

function* watchApprovals(action: ApprovalAction) {
  const { id, verdict, feedback } = action.payload;
  const currentSessionId: string | null = yield select((state: RootState) => state.sessions.currentSessionId);
  yield put(sendIntent({
    type: 'codernic:submit-approval',
    payload: { id, verdict, feedback, sessionId: currentSessionId },
  }));
}

interface ArtifactReviewAction {
  type: string;
  payload: {
    verdict: string;
    feedback?: string;
  };
}

function* watchArtifactReview(action: ArtifactReviewAction) {
  const { verdict, feedback } = action.payload;
  const currentSessionId: string | null = yield select((state: RootState) => state.sessions.currentSessionId);
  yield put(sendIntent({
    type: 'codernic:submit-approval',
    payload: { id: 'artifact', verdict, feedback, sessionId: currentSessionId },
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: "Send to Codernic" button (Structura toolbar)
// Sends the current schema to the backend — does NOT inject into Structura.
// ─────────────────────────────────────────────────────────────────────────────

function* handleSendSchemaToCodernic(action: { payload: { schema: unknown } }) {
  const schema = action.payload.schema;
  const currentSessionId: string | null = yield select((state: RootState) => state.sessions.currentSessionId);
  if (!currentSessionId) return;

  try {
    yield put(setErathosSyncing(true));
    // Send schema to backend only — Structura already has it.
    yield call(callMcpTool as any, 'update_erathos_schema', { session_id: currentSessionId, schema });
    yield put(sendIntent({
      type: 'codernic:chat',
      payload: {
        text: "J'ai mis à jour le schéma de la base de données. Analyse-le.",
        sessionId: currentSessionId,
        metadata: { silent: true },
      },
    }));
  } catch (error) {
    console.error('[dag.saga] Failed to send schema to backend:', error);
  } finally {
    yield put(setErathosSyncing(false));
  }
}

function* watchSendSchemaChannel(): Generator {
  const channel: any = yield actionChannel('dag/sendSchemaToCodernic');
  while (true) {
    const action = yield take(channel);
    yield call(handleSendSchemaToCodernic, action);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: Telemetry demo (sandbox — substitutes backend)
// ─────────────────────────────────────────────────────────────────────────────

function* handleTelemetryDemo() {
  const nodes = [
    { id: 'UserProxy', role: 'User Proxy', dependencies: [], durationMs: 1500 },
    { id: 'Planner', role: 'Planner', dependencies: ['UserProxy'], durationMs: 2500 },
    { id: 'Coder_1', role: 'Coder A', dependencies: ['Planner'], durationMs: 3500 },
    { id: 'Coder_2', role: 'Coder B', dependencies: ['Planner'], durationMs: 2000 },
    { id: 'Reviewer', role: 'Reviewer', dependencies: ['Coder_1', 'Coder_2'], durationMs: 1500 },
  ];
  yield call(SandboxSimulationEngine.runDag, nodes);
}

function* watchTelemetryDemo(): Generator {
  yield takeLatest('dag/startTelemetryDemo', handleTelemetryDemo);
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: Artifact schema rehydration
// ─────────────────────────────────────────────────────────────────────────────

function* watchArtifactSchemaChannel(): Generator {
  const channel: any = yield actionChannel(fetchArtifactContentSuccess.type);
  while (true) {
    const action = yield take(channel);
    yield call(handleArtifactContentSuccess, action);
  }
}

export function* handleArtifactContentSuccess(action: any) {
  const { filename, content } = action.payload;
  if (filename && filename.endsWith('_schema.md') && content) {
    try {
      const match = content.match(/```json\n([\s\S]*?)\n```/);
      if (match && match[1]) {
        const parsedSchema = JSON.parse(match[1]);
        // Only handle DAGExchange format — WorkspaceState restoration is not our concern.
        if (parsedSchema && parsedSchema.nodes && parsedSchema.version) {
          const currentSessionId: string | null = yield select((state: RootState) => state.sessions.currentSessionId);
          if (currentSessionId) {
            // Re-inject topology into Structura
            yield call(callMcpTool as any, 'structura_inject_schema', { payload: parsedSchema });
            // Persist to backend
            yield call(callMcpTool as any, 'update_erathos_schema', {
              session_id: currentSessionId,
              schema: parsedSchema,
            });
          }
        }
      }
    } catch (e) {
      console.error('[dag.saga] Failed to parse artifact schema content:', e);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Saga: MCP Telemetry init (runs once at startup)
// ─────────────────────────────────────────────────────────────────────────────

function* initMcpTelemetry(): Generator<any, void, any> {
  try {
    const response: any = yield call(callMcpTool as any, 'structura_discovery', { topic: 'all' });
    const discovery = JSON.parse(response?.content?.[0]?.text || '{}');

    if (discovery?.tools_guide) {
      console.info('[DagSaga] Structura MCP Tools Guide:', discovery.tools_guide.golden_rule);
    }
    if (discovery?.telemetry) {
      yield put({ type: 'dag/setTelemetryAssets', payload: discovery.telemetry });
    }
    if (discovery?.formats?.Telemetry?.schema) {
      yield put({ type: 'dag/setTelemetryFormat', payload: discovery.formats.Telemetry.schema });
    }
  } catch (err) {
    console.error('[DagSaga] Failed to initialize telemetry from MCP:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Root saga
// ─────────────────────────────────────────────────────────────────────────────

export function* dagSaga(): Generator {
  yield all([
    call(initMcpTelemetry),
    takeEvery((action: DagWsAction) => action.type.startsWith('WS/'), handleDagEvents),
    takeEvery('dag/resolveApproval', watchApprovals),
    takeEvery('dag/resolveArtifactReview', watchArtifactReview),
    call(watchSendSchemaChannel),
    call(watchTelemetryDemo),
    call(watchArtifactSchemaChannel),
  ]);
}
