// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// callMcpTool — public entry point
//
// Routes every MCP tool call through the McpTransportRegistry.
// Callers don't need to know which transport is used.
//
// Priority (handled by the registry):
//   1. StructuraInMemoryTransport  → for all structura_* tools (zero HTTP)
//   2. HttpMcpTransport            → fallback for backend tools
// ─────────────────────────────────────────────────────────────────────────────

import { mcpRegistry } from './mcp/mcp-transport-registry';
import type { McpToolResult } from './mcp/mcp-transport.interface';

export async function callMcpTool(
  method: string,
  params: Record<string, unknown>
): Promise<McpToolResult> {
  return mcpRegistry.callTool(method, params);
}
