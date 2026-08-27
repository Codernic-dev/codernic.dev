// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { EventChannel } from 'redux-saga';
import { buffers, eventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { vscode } from '../../../shared/api/vscode-api';
import { sendIntent } from '../../../shared/store/intent';
import { setWsStatus, setContextStats, updateSystemStatus, appendSystemLogsBatch, setInfraStats } from './system.slice';
import { setSandboxMode } from '../../../entities/app/model/app-slice';
import { setDownloadStarted, setDownloadProgress, setDownloadDone } from '../../models/store/models.slice';
import { setValidationErrors } from '../../layout-engine/store/ui-commands.slice';
import { delay } from 'redux-saga/effects';
import { getCodernicHttpUrl, getOllamaUrl } from '../../../shared/config';
import { sendCoreWebSocketMessage } from '../../../entities/kernel/model/telemetry-saga';

type WsMessage = { type: string; payload?: unknown };

const outboxBuffer: unknown[] = [];

function createVsCodeChannel(): EventChannel<WsMessage> {
  return eventChannel((emitter) => {
    vscode.postMessage({ type: 'codernic:request-assets' });
    vscode.postMessage({ type: 'codernic:request-llms' });

    while (outboxBuffer.length > 0) {
      const payload = outboxBuffer.shift();
      vscode.postMessage(payload);
    }

    const handler = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        // Handle MessageBusEnvelope (Telemetry)
        if ('topic' in event.data && typeof event.data.topic === 'string') {
          console.log('SAGA IN (BUS):', event.data);
          emitter({ type: 'WS_MESSAGE_RECEIVED', payload: { type: event.data.topic, payload: event.data.payload } });
        }
        // Handle standard VSCode/WebSocket intents
        else if ('type' in event.data && typeof event.data.type === 'string') {
          if (event.data.type.startsWith('codernic:') || event.data.type.startsWith('ac:') || event.data.type === 'kernel_state_update' || event.data.type === 'ArtifactRequestedReview') {
            console.log('SAGA IN:', event.data);
            emitter({ type: 'WS_MESSAGE_RECEIVED', payload: event.data });
          }
        }
      }
    };

    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
  }, buffers.expanding(100));
}

function* watchIncoming(channel: EventChannel<WsMessage>): Generator {
  while (true) {
    const action = (yield take(channel)) as { type: string; payload: unknown };
    if (action.type === 'WS_STATUS_CHANGE') {
      yield put(setWsStatus(action.payload as 'connected' | 'disconnected' | 'connecting'));
    } else if (action.type === 'WS_MESSAGE_RECEIVED') {
      const msg = action.payload as WsMessage;
      yield put({ type: `WS/${msg.type}`, payload: msg.payload });
    }
  }
}

function* watchOutgoing(): Generator {
  yield takeEvery(sendIntent.type, function* (action: { type: string; payload: unknown }) {
    const msg = action.payload as { type: string; payload?: any };
    try {
      if (msg.type === 'codernic:daemon-action') {
        const actionType = msg.payload?.action;
        if (actionType === 'stop') {
          yield put(updateSystemStatus({ daemonStatus: 'stopping' }));
        } else if (actionType === 'start' || actionType === 'restart') {
          yield put(updateSystemStatus({ daemonStatus: 'starting' }));
        }
      }
      sendCoreWebSocketMessage(msg);
      vscode.postMessage(msg);
    } catch (err) {
      console.error('[SAGA WS] Error sending intent:', err);
    }
  });
}

interface SystemWsAction {
  type: string;
  payload?: Record<string, unknown> & {
    currentTokens?: number;
    current_tokens?: number;
    maxTokens?: number;
    max_tokens?: number;
    usagePercent?: number;
    usage_percent?: number;
    turnCount?: number;
    turn_count?: number;
    files?: unknown[];
  };
}

function* handleSystemEvents(action: SystemWsAction) {
  const type = action.type;
  const payload = action.payload;

  if (type === 'WS/codernic:context-window-update') {
    yield put(setContextStats({
      current_tokens: payload.currentTokens || payload.current_tokens || 0,
      max_tokens: payload.maxTokens || payload.max_tokens || 0,
      usage_percent: payload.usagePercent || payload.usage_percent || 0,
      turn_count: payload.turnCount || payload.turn_count || 0,
    }));
    if (payload.files) {
       yield put({ type: 'chat/setContextFiles', payload: payload.files });
    }
  } else if (type === 'WS/infra.telemetry.vram') {
    // Read from the MessageBusEnvelope payload correctly
    yield put(setInfraStats({
      vram_used: payload.vram_used || 0,
      vram_total: payload.vram_total || 0,
      vram_available: payload.vram_available || 0,
      vram_required: payload.vram_required || 0,
      ram_used: payload.ram_used,
      ram_total: payload.ram_total,
      cpu_usage: payload.cpu_usage,
      daemon_version: payload.daemon_version,
      hardware_type: payload.hardware_type,
    }));
  }
}

function* handleSandboxToggle(action: { type: string; payload: boolean }) {
  if (typeof window !== 'undefined') {
    const current = localStorage.getItem('FORCE_SANDBOX_MODE');
    const next = action.payload ? 'true' : 'false';
    if (current !== next) {
      localStorage.setItem('FORCE_SANDBOX_MODE', next);
      window.location.reload();
    }
  }
}

interface SequencerStepAction {
  type: string;
  payload: {
    widget: string;
    data: string | Record<string, any>;
  };
}

function* handleSequencerStep(action: SequencerStepAction): Generator<any, void, any> {
  const { widget, data } = action.payload;

  try {
    const HTTP_URL = getCodernicHttpUrl();
    const response = yield call(fetch, `${HTTP_URL}/api/v1/sequencer/step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ widget, data })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to execute sequencer step: ${response.statusText}`);
    }
    
    const realState = yield call([response, response.json]);
    
    if (realState && realState.slice) {
      // In a real environment, the backend would either return the exact Redux actions 
      // or we dispatch a generic state update action for the given slice.
      console.log(`[Sequencer] Received state from backend for slice '${realState.slice}'`);
      
      switch (realState.slice) {
        case 'chat':
          if (realState.data.messages) yield put({ type: 'chat/setMessages', payload: realState.data.messages });
          if (realState.data.contextFiles) yield put({ type: 'chat/setContextFiles', payload: realState.data.contextFiles });
          if (realState.data.isAutopilot !== undefined) yield put({ type: 'chat/setAutopilot', payload: realState.data.isAutopilot });
          break;
        case 'sessions':
          if (realState.data.list) yield put({ type: 'sessions/setSessions', payload: realState.data.list });
          break;
        case 'artifacts':
          if (realState.data.items) yield put({ type: 'artifacts/fetchArtifactsSuccess', payload: realState.data.items });
          break;
        case 'dag':
          if (realState.data.nodes) yield put({ type: 'dag/setNodes', payload: realState.data.nodes });
          if (realState.data.edges) yield put({ type: 'dag/setEdges', payload: realState.data.edges });
          break;
        // Keep the rest of realState handlers as needed...
        default:
          yield put({ type: `${realState.slice}/updateFromSequencer`, payload: realState.data });
      }
    }
  } catch (err: unknown) {
    console.error(`[Sequencer] Error executing step:`, err);
  }
}

function* handleVisionCapture(action: any): Generator<any, void, any> {
  const { url, onSuccess, onError } = action.payload;
  try {
    const HTTP_URL = getCodernicHttpUrl();
    const response = yield call(fetch, `${HTTP_URL}/api/vision/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = yield call([response, response.json]);
    if (onSuccess) onSuccess(data);
  } catch (e: unknown) {
    if (onError) onError(e instanceof Error ? e.message : String(e));
  }
}

function* handleVramBenchmark(action: any): Generator<any, void, any> {
  const { onSuccess, onError } = action.payload;
  try {
    const HTTP_URL = getCodernicHttpUrl();
    const response = yield call(fetch, `${HTTP_URL}/api/benchmark/vram`, { method: 'POST' });
    const data = yield call([response, response.json]);
    if (onSuccess) onSuccess(data);
  } catch (e: unknown) {
    if (onError) onError(e instanceof Error ? e.message : String(e));
  }
}

function* pollMetrics(): Generator {
  while (true) {
    try {
      const HTTP_URL = getCodernicHttpUrl();
      const response = yield call(fetch, `${HTTP_URL}/api/v1/metrics/inference`);
      if ((response as Response).ok) {
        const data = yield call([response as Response, (response as Response).json]);
        yield put({ type: 'system/setMetrics', payload: data });
      } else if ((response as Response).status === 404) {
        console.debug('Metrics endpoint not mounted. Halting polling to prevent 404 spam.');
        break;
      }
    } catch (e) {
      console.debug('Metrics endpoint not ready:', e);
    }
    yield delay(5000);
  }
}

export function* systemSaga(): Generator {
  const channel = (yield call(createVsCodeChannel)) as EventChannel<WsMessage>;
  yield all([
    fork(watchIncoming, channel),
    fork(watchOutgoing),
    fork(pollMetrics),
    takeEvery((action: SystemWsAction) => action.type.startsWith('WS/'), handleSystemEvents),
    takeEvery(setSandboxMode.type, handleSandboxToggle),
    takeEvery('sequencer/executeStep', handleSequencerStep),
    takeEvery('system/visionCaptureRequest', handleVisionCapture),
    takeEvery('system/vramBenchmarkRequest', handleVramBenchmark)
  ]);
}
