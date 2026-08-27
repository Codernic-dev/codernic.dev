// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// MCP Transport Interface
//
// A transport is responsible for routing an MCP tool call to its handler.
// The handler may live in-memory (when Structura is embedded in the same
// browser context) or over the network (HTTP SSE — when a backend MCP server
// is connected).
// ─────────────────────────────────────────────────────────────────────────────

export interface McpToolResult {
  content: Array<{ type: 'text'; text: string }>;
}

export interface McpTransport {
  /** Returns true if this transport can handle the given tool name. */
  canHandle(toolName: string): boolean;

  /** Execute the tool call and return the result. */
  callTool(toolName: string, args: Record<string, unknown>): Promise<McpToolResult>;
}
