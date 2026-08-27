// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// MCP module public API
// ─────────────────────────────────────────────────────────────────────────────

export type { McpTransport, McpToolResult } from './mcp-transport.interface';
export { StructuraInMemoryTransport, structuraInMemoryTransport } from './structura-in-memory-transport';
export { HttpMcpTransport, httpMcpTransport } from './http-mcp-transport';
export { mcpRegistry } from './mcp-transport-registry';
