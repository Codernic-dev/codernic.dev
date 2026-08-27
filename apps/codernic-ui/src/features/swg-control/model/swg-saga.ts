// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import { call, put, takeLatest, select, fork, take, delay } from 'redux-saga/effects';
import { swgApi } from '../api/swg-api';
import type { SwgStatusResponse, ToggleResponse, AccreditationItem } from '../api/swg-api';
import { createWsHubClient } from '../api/ws-hub-client';
import type { WsHubClient, WsHubInboundMessage } from '../api/ws-hub-client';
import { tauriIpc } from '../../../shared/api/tauri-ipc';
import {
  initSwgConfigRequest,
  setApiUrls,
  fetchStatusRequest,
  fetchStatusSuccess,
  fetchStatusFailure,
  togglePirsigRequest,
  togglePirsigSuccess,
  togglePirsigFailure,
  toggleOckhamRequest,
  toggleOckhamSuccess,
  toggleOckhamFailure,
  togglePanicRequest,
  togglePanicSuccess,
  togglePanicFailure,
  resetConnectionsRequest,
  resetConnectionsSuccess,
  resetConnectionsFailure,
  fetchAuditLogRequest,
  fetchAuditLogSuccess,
  toggleAuditLogRequest,
  toggleAuditLogSuccess,
  fetchInterceptionModeRequest,
  fetchInterceptionModeSuccess,
  setInterceptionModeRequest,
  fetchAccreditationsRequest,
  fetchAccreditationsSuccess,
  addAccreditationRequest,
  deleteAccreditationRequest,
  setSseStatus,
  receiveTelemetryEvent,
  receiveTelemetryBatch,
} from './swg-slice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';

let wsClientInstance: WsHubClient | null = null;

const getApiBaseUrl = (state: RootState) => state.swg.apiBaseUrl;
const getWsUrl = (state: RootState) => state.swg.wsUrl;

// Worker Saga: Init Config
function* handleInitSwgConfig(): Generator<unknown, void, unknown> {
  try {
    const configYaml = (yield call(tauriIpc.getGlobalConfig)) as string;
    
    // Parse SWG port from YAML (e.g. `swg_port: 9090`)
    const portMatch = configYaml.match(/swg_port:\s*(\d+)/);
    const port = portMatch ? portMatch[1] : '9090';
    
    const isHttps = window.location.protocol === 'https:';
    const protocol = isHttps ? 'https:' : 'http:';
    const wsProtocol = isHttps ? 'wss:' : 'ws:';
    const host = window.location.hostname || '127.0.0.1';
    
    const apiBaseUrl = `${protocol}//${host}:${port}`;
    const wsUrl = `${wsProtocol}//${host}:${port}/api/v1/ws/hub`;
    
    yield put(setApiUrls({ apiBaseUrl, wsUrl }));
    
    // Once configured, bootstrap the rest
    yield put(fetchStatusRequest());
    yield call(handleFetchAccreditations);
    yield fork(watchWsHub);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error initializing SWG Config';
    yield put(fetchStatusFailure(errorMsg));
  }
}

// Worker Saga: Fetch Status (REST Fallback)
function* handleFetchStatus(): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    if (!baseUrl) return;
    const data: SwgStatusResponse = (yield call(swgApi.fetchStatus, baseUrl)) as SwgStatusResponse;
    yield put(fetchStatusSuccess(data));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error fetching status';
    yield put(fetchStatusFailure(errorMsg));
  }
}

// Worker Saga: Toggle Pirsig DLP
function* handleTogglePirsig(action: PayloadAction<boolean>): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'toggle_pirsig', value: action.payload });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      const res: ToggleResponse = (yield call(swgApi.togglePirsig, baseUrl, action.payload)) as ToggleResponse;
      yield put(togglePirsigSuccess(res.pirsig_enabled ?? action.payload));
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error toggling Pirsig DLP';
    yield put(togglePirsigFailure(errorMsg));
  }
}

// Worker Saga: Toggle Ockham
function* handleToggleOckham(action: PayloadAction<boolean>): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'toggle_ockham', value: action.payload });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      const res: ToggleResponse = (yield call(swgApi.toggleOckham, baseUrl, action.payload)) as ToggleResponse;
      yield put(toggleOckhamSuccess(res.ockham_enabled ?? action.payload));
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error toggling Ockham Optimizer';
    yield put(toggleOckhamFailure(errorMsg));
  }
}

// Worker Saga: Toggle Panic Mode
function* handleTogglePanic(action: PayloadAction<boolean>): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'toggle_panic', value: action.payload });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      const res: ToggleResponse = (yield call(swgApi.togglePanic, baseUrl, action.payload)) as ToggleResponse;
      yield put(togglePanicSuccess(res.panic_mode ?? action.payload));
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error toggling Panic Mode';
    yield put(togglePanicFailure(errorMsg));
  }
}

// Worker Saga: Reset Connections
function* handleResetConnections(): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'reset_connections' });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      yield call(swgApi.resetConnections, baseUrl);
    }
    yield put(resetConnectionsSuccess());
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error resetting connections';
    yield put(resetConnectionsFailure(errorMsg));
  }
}

// Worker Saga: Audit Log
function* handleFetchAuditLog(): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    const res = (yield call(swgApi.getAuditLog, baseUrl)) as { audit_dump_mode: boolean };
    yield put(fetchAuditLogSuccess(res.audit_dump_mode));
  } catch (_err) {}
}

function* handleToggleAuditLog(action: PayloadAction<boolean>): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'toggle_audit_log', value: action.payload });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      const res = (yield call(swgApi.toggleAuditLog, baseUrl, action.payload)) as { audit_dump_mode: boolean };
      yield put(toggleAuditLogSuccess(res.audit_dump_mode ?? action.payload));
    }
  } catch (_err) {}
}

// Worker Saga: Interception Mode
function* handleFetchInterceptionMode(): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    if (!baseUrl) return;
    const res = (yield call(swgApi.getInterceptionMode, baseUrl)) as { active_mode: string };
    if (res.active_mode) {
      yield put(fetchInterceptionModeSuccess(res.active_mode));
    }
  } catch (_err) {}
}

function* handleSetInterceptionMode(action: PayloadAction<string>): Generator<unknown, void, unknown> {
  try {
    if (wsClientInstance) {
      wsClientInstance.sendCommand({ cmd: 'set_mode', mode: action.payload });
    } else {
      const baseUrl: string = (yield select(getApiBaseUrl)) as string;
      const res = (yield call(swgApi.setInterceptionMode, baseUrl, action.payload)) as { active_mode?: string };
      yield put(fetchInterceptionModeSuccess(res.active_mode || action.payload));
    }
  } catch (_err) {}
}

// Worker Saga: Accreditations
function* handleFetchAccreditations(): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    if (!baseUrl) return;
    const res = (yield call(swgApi.getAccreditations, baseUrl)) as { accreditations: { exceptions: AccreditationItem[] } };
    if (res.accreditations?.exceptions) {
      yield put(fetchAccreditationsSuccess(res.accreditations.exceptions));
    }
  } catch (_err) {}
}

function* handleAddAccreditation(action: PayloadAction<AccreditationItem>): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    const current: AccreditationItem[] = (yield select((state: RootState) => state.swg.accreditations)) as AccreditationItem[];
    const updated = [...current, action.payload];
    yield call(swgApi.setAccreditations, baseUrl, updated);
    yield put(fetchAccreditationsSuccess(updated));
  } catch (_err) {}
}

function* handleDeleteAccreditation(action: PayloadAction<number>): Generator<unknown, void, unknown> {
  try {
    const baseUrl: string = (yield select(getApiBaseUrl)) as string;
    const current: AccreditationItem[] = (yield select((state: RootState) => state.swg.accreditations)) as AccreditationItem[];
    const updated = current.filter((_, idx) => idx !== action.payload);
    yield call(swgApi.setAccreditations, baseUrl, updated);
    yield put(fetchAccreditationsSuccess(updated));
  } catch (_err) {}
}

// WebSocket Hub Manager Saga with 50ms Telemetry Event Batch Throttling
function* watchWsHub(): Generator<unknown, void, unknown> {
  const wsUrl: string = (yield select(getWsUrl)) as string;
  if (!wsUrl) return;

  const client: WsHubClient = createWsHubClient(wsUrl);
  wsClientInstance = client;

  let eventBuffer: any[] = [];
  let lastFlush = Date.now();

  try {
    while (true) {
      const msg: WsHubInboundMessage = (yield take(client.channel)) as WsHubInboundMessage;

      if (msg.type === 'status') {
        yield put(setSseStatus(msg.payload));
        continue;
      }

      if (msg.type === 'state_snapshot') {
        yield put(fetchStatusSuccess(msg.payload));
        if (msg.payload.active_mode) {
          yield put(fetchInterceptionModeSuccess(msg.payload.active_mode));
        }
        continue;
      }

      if (msg.type === 'telemetry') {
        eventBuffer.push(msg.payload);
        const now = Date.now();
        if (now - lastFlush >= 50 || eventBuffer.length >= 25) {
          yield put(receiveTelemetryBatch([...eventBuffer]));
          eventBuffer = [];
          lastFlush = now;
        }
        continue;
      }

      if (msg.type === 'state_changed') {
        const { field, value } = msg.payload;
        if (field === 'pirsig_enabled' && typeof value === 'boolean') {
          yield put(togglePirsigSuccess(value));
        } else if (field === 'ockham_enabled' && typeof value === 'boolean') {
          yield put(toggleOckhamSuccess(value));
        } else if (field === 'panic_mode' && typeof value === 'boolean') {
          yield put(togglePanicSuccess(value));
        } else if (field === 'audit_dump_mode' && typeof value === 'boolean') {
          yield put(toggleAuditLogSuccess(value));
        } else if (field === 'active_mode' && typeof value === 'string') {
          yield put(fetchInterceptionModeSuccess(value));
        }
        continue;
      }
    }
  } catch (_err) {
    yield put(setSseStatus('disconnected'));
  } finally {
    client.close();
    wsClientInstance = null;
  }
}

// Root SWG Saga
export function* swgSaga(): Generator<unknown, void, unknown> {
  yield takeLatest(initSwgConfigRequest.type, handleInitSwgConfig);
  
  yield takeLatest(fetchStatusRequest.type, handleFetchStatus);
  yield takeLatest(togglePirsigRequest.type, handleTogglePirsig);
  yield takeLatest(toggleOckhamRequest.type, handleToggleOckham);
  yield takeLatest(togglePanicRequest.type, handleTogglePanic);
  yield takeLatest(resetConnectionsRequest.type, handleResetConnections);

  yield takeLatest(fetchAuditLogRequest.type, handleFetchAuditLog);
  yield takeLatest(toggleAuditLogRequest.type, handleToggleAuditLog);

  yield takeLatest(fetchInterceptionModeRequest.type, handleFetchInterceptionMode);
  yield takeLatest(setInterceptionModeRequest.type, handleSetInterceptionMode);

  yield takeLatest(fetchAccreditationsRequest.type, handleFetchAccreditations);
  yield takeLatest(addAccreditationRequest.type, handleAddAccreditation);
  yield takeLatest(deleteAccreditationRequest.type, handleDeleteAccreditation);
}
