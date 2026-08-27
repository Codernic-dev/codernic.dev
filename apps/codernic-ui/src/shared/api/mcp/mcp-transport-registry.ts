// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// MCP Transport Registry
//
// Selects the appropriate transport for each tool call.
// Transports are evaluated in priority order — first match wins.
//
// Default priority:
//   1. StructuraInMemoryTransport  (Structura tools — zero HTTP, in-process)
//   2. HttpMcpTransport            (everything else — requires backend)
// ─────────────────────────────────────────────────────────────────────────────

import type { McpToolResult, McpTransport } from './mcp-transport.interface';
import { structuraInMemoryTransport } from './structura-in-memory-transport';
import { httpMcpTransport } from './http-mcp-transport';

class McpTransportRegistry {
  private readonly transports: McpTransport[];

  constructor(transports: McpTransport[]) {
    this.transports = transports;
  }

  callTool(toolName: string, args: Record<string, unknown>): Promise<McpToolResult> {
    const transport = this.transports.find(t => t.canHandle(toolName));
    if (!transport) {
      return Promise.reject(new Error(`[McpRegistry] No transport found for tool: ${toolName}`));
    }
    return transport.callTool(toolName, args);
  }
}

export const mcpRegistry = new McpTransportRegistry([
  structuraInMemoryTransport,
  httpMcpTransport,
]);
