// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import { eventChannel } from 'redux-saga';
import type { EventChannel } from 'redux-saga';
import type { SwgStatusResponse, TelemetryEvent } from './swg-api';

export type WsHubStatus = 'connecting' | 'connected' | 'disconnected';

export interface StateSnapshotPayload extends SwgStatusResponse {
  active_mode: string;
}

export interface StateChangedPayload {
  field: string;
  value: unknown;
}

export type WsHubInboundMessage =
  | { type: 'status'; payload: WsHubStatus }
  | { type: 'state_snapshot'; payload: StateSnapshotPayload }
  | { type: 'telemetry'; payload: TelemetryEvent }
  | { type: 'state_changed'; payload: StateChangedPayload };

export interface WsHubClient {
  channel: EventChannel<WsHubInboundMessage>;
  sendCommand: (cmd: object) => void;
  close: () => void;
}

export function createWsHubClient(wsUrl: string): WsHubClient {
  let ws: WebSocket | null = null;
  let isClosedByApp = false;

  const channel = eventChannel<WsHubInboundMessage>((emitter) => {
    const connect = () => {
      if (isClosedByApp) return;

      emitter({ type: 'status', payload: 'connecting' });

      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        emitter({ type: 'status', payload: 'connected' });
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data) as WsHubInboundMessage;
          emitter(parsed);
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      ws.onclose = () => {
        emitter({ type: 'status', payload: 'disconnected' });
        if (!isClosedByApp) {
          // Reconnect with backoff
          setTimeout(connect, 2000);
        }
      };

      ws.onerror = (err) => {
        console.error('[WS_HUB] Error detected on WebSocket:', err);
        emitter({ type: 'status', payload: 'disconnected' });
        try {
          ws?.close();
        } catch (_e) {}
      };
    };

    connect();

    return () => {
      isClosedByApp = true;
      if (ws) {
        ws.close();
      }
    };
  });

  const sendCommand = (cmd: object) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(cmd));
    } else {
      console.warn('WebSocket not open. Cannot send command:', cmd);
    }
  };

  const close = () => {
    isClosedByApp = true;
    if (ws) {
      ws.close();
    }
  };

  return { channel, sendCommand, close };
}
