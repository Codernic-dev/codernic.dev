// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { EventChannel } from 'redux-saga';
import { eventChannel, buffers, END } from 'redux-saga';
import { all, call, fork, put, take, delay } from 'redux-saga/effects';
import type { AgentRunState } from './types';
import { setContextStats, setInfraStats, updateActorStatus, updateSystemStatus, setWsStatus } from '../../../features/system/store/system.slice';
import { updateHeartbeat, updateDiagnostic } from '../../../entities/telemetry/model/telemetry-slice';
import { setAgentRun } from '../../../features/dag/store/dag.slice';

import { getCodernicWsUrl } from '../../../shared/config';
import { daemonReadyPromise } from '../../../shared/api/vscode-api';

let activeCoreWebSocket: WebSocket | null = null;

export const sendCoreWebSocketMessage = (message: unknown): boolean => {
  if (activeCoreWebSocket && activeCoreWebSocket.readyState === WebSocket.OPEN) {
    activeCoreWebSocket.send(typeof message === 'string' ? message : JSON.stringify(message));
    return true;
  }
  return false;
};

function createTelemetryChannel(): EventChannel<any> {
  return eventChannel((emitter) => {
    let ws: WebSocket;
    const dynamicWsUrl = getCodernicWsUrl();
    const targetUrl = dynamicWsUrl.endsWith('/ws') ? dynamicWsUrl : `${dynamicWsUrl}/ws`;
    try {
      emitter({ _type: 'SYS_LOG', payload: `[SAGA] Connecting WebSocket to ${targetUrl}` });
      ws = new WebSocket(targetUrl);
      activeCoreWebSocket = ws;
    } catch (e) {
      emitter({ _type: 'SYS_LOG', payload: `[SAGA_CRASH] createTelemetryChannel threw synchronously: ${e}` });
      emitter(END);
      return () => {};
    }

    ws.onopen = () => {
      activeCoreWebSocket = ws;
      emitter({ _type: 'SYS_LOG', payload: `[SAGA_WS] Connected to ${targetUrl}` });
      emitter({ _type: 'ACTOR_STATUS', payload: { actor: 'Daemon', status: 'connected', message: 'Connected to Core Daemon' } });
      emitter({ _type: 'WS_STATUS', payload: 'connected' });
    };

    ws.onmessage = (event) => {
      try {
        const telemetry = JSON.parse(event.data);
        emitter(telemetry);
      } catch (e) {
        emitter({ _type: 'SYS_LOG', payload: `[SAGA_WS_ERROR] Parse error: ${e}. Raw data: ${event.data}` });
      }
    };

    ws.onerror = (err) => {
      const errDetails = err ? Object.getOwnPropertyNames(err).reduce((acc, key) => {
        acc[key] = (err as any)[key];
        return acc;
      }, {} as any) : 'Unknown error';
      
      emitter({ _type: 'ACTOR_STATUS', payload: { actor: 'Daemon', status: 'error', message: 'Failed to connect to Daemon WebSocket' } });
      emitter({ _type: 'WS_STATUS', payload: 'disconnected' });
      emitter({ _type: 'SYS_LOG', payload: `[WS_ERROR] Failed to connect to ${targetUrl}. Details: ${JSON.stringify(errDetails)}` });
    };

    ws.onclose = () => {
      if (activeCoreWebSocket === ws) {
        activeCoreWebSocket = null;
      }
      emitter({ _type: 'ACTOR_STATUS', payload: { actor: 'Daemon', status: 'disconnected', message: 'Connection to Core Daemon lost' } });
      emitter({ _type: 'WS_STATUS', payload: 'disconnected' });
      emitter(END);
    };

    return () => {
      if (activeCoreWebSocket === ws) {
        activeCoreWebSocket = null;
      }
      ws.close();
    };
  }, buffers.expanding(100));
}

import { isTauri } from '../../../shared/utils/env';

function* watchTelemetry(): Generator {
  const tauri = isTauri();
  yield put({ type: 'system/appendSystemLogsBatch', payload: { message: `[SAGA] isTauri evaluated to ${tauri}` } });
  if (tauri) {
    yield put({ type: 'system/appendSystemLogsBatch', payload: { message: '[SAGA] Waiting for daemonReadyPromise...' } });
    yield call(() => daemonReadyPromise);
    yield put({ type: 'system/appendSystemLogsBatch', payload: { message: '[SAGA] daemonReadyPromise resolved!' } });
  }

  while (true) {
    const channel = (yield call(createTelemetryChannel)) as EventChannel<any>;
    
    try {
      while (true) {
        const telemetry = (yield take(channel)) as any;
        
        if (telemetry === END || (telemetry && telemetry.type === '@@redux-saga/CHANNEL_END')) {
          break;
        }
        
        if (telemetry._type === 'ACTOR_STATUS') {
          yield put(updateActorStatus(telemetry.payload));
        } else if (telemetry._type === 'WS_STATUS') {
          yield put(setWsStatus(telemetry.payload));
          if (telemetry.payload === 'disconnected') {
            yield put(updateHeartbeat('down'));
          } else if (telemetry.payload === 'connected') {
            yield put(updateHeartbeat('ok'));
          }
        } else if (telemetry._type === 'SYS_LOG') {
          yield put({ type: 'system/appendSystemLogsBatch', payload: { message: telemetry.payload } });
        } else if (telemetry.target === 'infra_telemetry') {
          yield put({ type: 'system/appendSystemLogsBatch', payload: { message: `[DEBUG] Incoming infra_telemetry: ${JSON.stringify(telemetry.fields)}` } });
          yield put(
            setInfraStats({
              vram_used: telemetry.fields.vram_used,
              vram_total: telemetry.fields.vram_total,
              vram_available: telemetry.fields.vram_available,
              vram_required: telemetry.fields.vram_required,
            }),
          );
          if (telemetry.fields.ram_used !== undefined) {
            yield put(updateSystemStatus({
              daemonStatus: 'running',
              ramUsage: telemetry.fields.ram_used,
              totalRam: telemetry.fields.ram_total,
              cpuUsage: telemetry.fields.cpu_usage,
            }));
            yield put(updateHeartbeat('ok'));
            yield put(updateDiagnostic({
              hardware: {
                vramUsedGb: typeof telemetry.fields.vram_used === 'number' ? telemetry.fields.vram_used : null,
                memoryLockLimit: null,
                totalRamGb: typeof telemetry.fields.ram_total === 'number' ? telemetry.fields.ram_total : 0,
                cpuCores: 0,
                hasCuda: typeof telemetry.fields.gpu_target === 'string' && telemetry.fields.gpu_target.includes('cuda'),
                hasRocm: false,
                hasMetal: typeof telemetry.fields.gpu_target === 'string' && telemetry.fields.gpu_target.includes('metal')
              },
              backend: {
                ragInitialized: true,
                indexedChunksCount: 0,
                activeMcpBridges: []
              },
              frontend: {
                activeWatchers: 1
              }
            }));
          }
        } else if (telemetry.target === 'context_telemetry') {
          yield put(
            setContextStats({
              current_tokens: telemetry.fields.current_tokens,
              max_tokens: telemetry.fields.max_tokens,
              usage_percent: telemetry.fields.usage_percent,
              turn_count: telemetry.fields.turn_count,
            }),
          );
        } else if (telemetry.type === 'agent-run-update') {
          yield put(setAgentRun({ sessionId: (telemetry.payload as any).sessionId || 'default', run: telemetry.payload as AgentRunState }));
        } else if (telemetry.target === 'roster_telemetry') {
          yield put({ type: 'roster/setRosterData', payload: telemetry.fields.agents });
        }
      }
    } catch (err) {
      console.error('Telemetry channel error:', err);
      yield put({ type: 'system/appendSystemLogsBatch', payload: { message: `[SAGA_CRASH] Telemetry loop crashed: ${err}` } });
    } finally {
      // When channel closes (via END), wait before reconnecting
      yield delay(2000);
    }
  }
}

export function* rootTelemetrySaga(): Generator {
  yield all([fork(watchTelemetry)]);
}
