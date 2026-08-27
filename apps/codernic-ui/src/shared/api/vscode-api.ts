// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { RootState } from '../../store';
import { isTauri } from '../utils/env';
declare function acquireVsCodeApi(): {
  postMessage(msg: unknown): void;
  getState(): unknown;
};

export let signalDaemonReady: () => void;
export const daemonReadyPromise = new Promise<void>((resolve) => {
  signalDaemonReady = resolve;
});
declare const __CODERNIC_WS_PORT__: number | undefined;
const fallbackPort = typeof __CODERNIC_WS_PORT__ !== 'undefined' ? __CODERNIC_WS_PORT__ : 47321;

const WS_URL_RAW =
  typeof import.meta !== 'undefined'
    ? ((import.meta as { env?: Record<string, string> }).env?.['VITE_CODERNIC_WS_URL'] ??
       `ws://127.0.0.1:${fallbackPort}`)
    : `ws://127.0.0.1:${fallbackPort}`;
    
const WS_URL = WS_URL_RAW.endsWith('/ws') ? WS_URL_RAW : `${WS_URL_RAW}/ws`;

/**
 * Creates an auto-reconnecting WebSocket bridge to the VS Code extension's
 * WebSocket server. Incoming messages are re-dispatched as window MessageEvents
 * so all existing `window.addEventListener('message', ...)` handlers in
 * features and widgets work without modification.
 */
function createWsBridge() {
  let ws: WebSocket | null = null;
  const queue: unknown[] = [];

  function connect() {
    try {
      ws = new WebSocket(WS_URL);
    } catch {
      // Retry if URL is invalid or browser blocks the connection
      setTimeout(connect, 3000);
      return;
    }

    ws.onopen = () => {
      window.dispatchEvent(new CustomEvent('WS_STATUS_CHANGE', { detail: { status: 'connected' } }));
      import('../../store').then(({ store }) => {
        store.dispatch({
          type: 'system/updateActorStatus',
          payload: { actor: 'VSCode', status: 'connected', message: 'Connected to host via WebSocket' }
        });
      });
      // Flush any messages that were posted while connecting
      queue.forEach((m) => ws!.send(JSON.stringify(m)));
      queue.length = 0;
    };

    ws.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data as string) as unknown;
        // Re-dispatch as a standard MessageEvent so existing handlers work
        window.dispatchEvent(new MessageEvent('message', { data: parsed }));
      } catch {
        // Ignore malformed messages
      }
    };

    ws.onclose = () => {
      ws = null;
      window.dispatchEvent(new CustomEvent('WS_STATUS_CHANGE', { detail: { status: 'disconnected' } }));
      import('../../store').then(({ store }) => {
        store.dispatch({
          type: 'system/updateActorStatus',
          payload: { actor: 'VSCode', status: 'disconnected', message: 'Connection to host lost, retrying...' }
        });
      });
      // Auto-reconnect after 2s on unexpected close
      setTimeout(connect, 2000);
    };

    ws.onerror = () => {
      import('../../store').then(({ store }) => {
        store.dispatch({
          type: 'system/updateActorStatus',
          payload: { actor: 'VSCode', status: 'error', message: 'Failed to connect to host WebSocket' }
        });
      });
      ws?.close();
    };
  }

  if (isTauri()) {
    // In Tauri, the daemon WebSocket is owned exclusively by the telemetry saga.
    // The vscode-api bridge is only used in VSCode webview / PWA contexts.
    // We still return a no-op stub so callers (vscode.postMessage etc.) don't crash.
    return {
      postMessage: (_msg: unknown) => {},
      getState: () => undefined as unknown,
      setState: (_s: unknown) => {},
    };
  }
  connect();

  return {
    postMessage: (msg: unknown) => {
      if (ws && ws.readyState === 1) {
        ws.send(JSON.stringify(msg));
      } else {
        // Queue until the socket is open
        queue.push(msg);
      }
    },
    getState: () => undefined as unknown,
    setState: (_s: unknown) => {},
  };
}

export const vscode = (() => {
  if (typeof (window as any).acquireVsCodeApi !== 'undefined') {
    // Running inside a VS Code webview or mocked test — use the native/mock API
    return (window as any).acquireVsCodeApi();
  }
  
  if (typeof (window as any).__PLAYWRIGHT__ !== 'undefined' || typeof (window as any).mockVsCodeState !== 'undefined') {
    console.log('Skipping WebSocket bridge in Mock environment');
    return {
      postMessage: (msg: unknown) => { console.log('[Mock Fallback postMessage]', msg); },
      getState: () => undefined,
      setState: (state: RootState) => state
    };
  }

  // Running as a standalone PWA or Tauri — bridge via WebSocket
  return createWsBridge();
})();
