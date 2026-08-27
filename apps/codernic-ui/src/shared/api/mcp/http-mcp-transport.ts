// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

// ─────────────────────────────────────────────────────────────────────────────
// HTTP SSE MCP Transport
//
// Legacy transport — sends tool calls over the network via HTTP + SSE to a
// remote MCP server (Erathos daemon or any other MCP-compliant server).
//
// Used when:
//   - The application is connected to the real Erathos backend
//   - Calling backend-side MCP tools (non-Structura tools)
// ─────────────────────────────────────────────────────────────────────────────

import type { McpToolResult, McpTransport } from './mcp-transport.interface';
import { getErathosMcpUrl } from '../../config';

export class HttpMcpTransport implements McpTransport {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? getErathosMcpUrl();
  }

  canHandle(_toolName: string): boolean {
    // Fallback transport — handles everything not caught by a higher-priority transport
    return true;
  }

  callTool(toolName: string, args: Record<string, unknown>): Promise<McpToolResult> {
    return new Promise((resolve, reject) => {
      let baseUrl = this.baseUrl;
      if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

      const es = new EventSource(`${baseUrl}/events`);
      const id = Date.now().toString();
      let resolved = false;

      const cleanup = () => { es.close(); };

      es.addEventListener('endpoint', (e: Event) => {
        const endpoint = (e as MessageEvent).data as string;
        const postUrl = endpoint.startsWith('http')
          ? endpoint
          : `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

        fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'tools/call',
            params: { name: toolName, arguments: args },
            id,
          }),
        }).catch(err => {
          if (!resolved) { resolved = true; cleanup(); reject(err); }
        });
      });

      es.addEventListener('message', (e: Event) => {
        try {
          const data = JSON.parse((e as MessageEvent).data) as {
            id: string;
            error?: { message: string };
            result?: McpToolResult;
          };
          if (data.id === id && !resolved) {
            resolved = true;
            cleanup();
            if (data.error) {
              reject(new Error(data.error.message ?? 'MCP Tool Error'));
            } else {
              resolve(data.result ?? { content: [] });
            }
          }
        } catch { /* ignore parse errors */ }
      });

      es.onerror = () => {
        if (!resolved) { resolved = true; cleanup(); reject(new Error('SSE connection error')); }
      };
    });
  }
}

export const httpMcpTransport = new HttpMcpTransport();
