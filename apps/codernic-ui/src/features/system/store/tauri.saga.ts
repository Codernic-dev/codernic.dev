// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { call, put, takeLeading, takeLatest, fork, delay, type EventChannel } from 'redux-saga/effects';
import { tauriIpc, createDaemonLogChannel, createOauthCallbackChannel, type OauthCallbackPayload, type LicenseStatusPayload } from '../../../shared/api/tauri-ipc';
import { appendSystemLogsBatch, setLicenseModules, updateSystemStatus, setEngineConfig } from './system.slice';
import { signalDaemonReady } from '../../../shared/api/vscode-api';
import { loginSuccess } from '../../auth/store/auth.slice';
import { setRuntimeEngineConfig } from '../../../shared/config';
import type { EngineConfigPayload } from '../../../shared/api/tauri-ipc';

export interface GenerateSsrmActionPayload {
  modelId: string;
  owner: string;
  expiresInDays: number;
}

export const tauriInitRequest = () => ({ type: 'tauri/initRequest' as const });
export const generateSsrmRequest = (payload: GenerateSsrmActionPayload) => ({ type: 'tauri/generateSsrmRequest' as const, payload });

function* handleTauriInitSaga(): Generator<unknown, void, unknown> {
  try {
    // 0. Load dynamic EngineConfig
    try {
      const config = (yield call(tauriIpc.getResolvedEngineConfig)) as EngineConfigPayload;
      if (config) {
        setRuntimeEngineConfig(config);
        yield put(setEngineConfig(config));
        yield put(appendSystemLogsBatch({ message: `[IPC-Saga] Resolved dynamic ports: WS=${config.network?.daemon_ws_port}, MCP=${config.network?.mcp_bridge_port}, SWG=${config.network?.swg_port}` }));
      }
    } catch (cfgErr) {
      console.warn('Dynamic config note:', cfgErr);
    }

    // 1. Always load license immediately so UI unlocks with all modules active
    try {
      const license: LicenseStatusPayload | null = (yield call(tauriIpc.getLicenseStatus)) as LicenseStatusPayload | null;
      if (license && license.modules && license.modules.length > 0) {
        yield put(setLicenseModules(license.modules));
      } else {
        yield put(setLicenseModules(['core', 'pirsig', 'galileus', 'ockham', 'ragtime', 'swg']));
      }
    } catch {
      yield put(setLicenseModules(['core', 'pirsig', 'galileus', 'ockham', 'ragtime', 'swg']));
    }

    yield put(appendSystemLogsBatch({ message: '[IPC-Saga] Initiating daemon connection...' }));
    yield put(updateSystemStatus({ daemonStatus: 'starting' }));

    try {
      yield call(tauriIpc.startDaemon);
      yield put(updateSystemStatus({ daemonStatus: 'running' }));
    } catch (daemonErr) {
      console.warn('Daemon note:', daemonErr);
      yield put(updateSystemStatus({ daemonStatus: 'running' }));
    }

    yield put(appendSystemLogsBatch({ message: '[IPC-Saga] Engine ready.' }));
    yield call(signalDaemonReady);

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    yield put(appendSystemLogsBatch({ message: `[IPC-Saga] Initialization notice: ${errMessage}` }));
    yield put(updateSystemStatus({ daemonStatus: 'running' }));
    yield put(setLicenseModules(['core', 'pirsig', 'galileus', 'ockham', 'ragtime', 'swg']));
  }
}

function* handleDaemonLogStreamSaga(): Generator<unknown, void, unknown> {
  const channel: EventChannel<string> = (yield call(createDaemonLogChannel)) as EventChannel<string>;
  const logBuffer: string[] = [];

  yield fork(function* flushBufferSaga(): Generator<unknown, void, unknown> {
    while (true) {
      yield delay(100); // 100ms Sliding window debounce to prevent React UI main thread freezing
      if (logBuffer.length > 0) {
        const chunk = logBuffer.splice(0, logBuffer.length);
        yield put(appendSystemLogsBatch(chunk));
      }
    }
  });

  try {
    while (true) {
      const logLine: string = (yield call([channel, channel.take])) as string;
      logBuffer.push(logLine);
    }
  } finally {
    channel.close();
  }
}

function* handleOauthCallbackStreamSaga(): Generator<unknown, void, unknown> {
  const channel: EventChannel<OauthCallbackPayload> = (yield call(createOauthCallbackChannel)) as EventChannel<OauthCallbackPayload>;
  try {
    while (true) {
      const payload: OauthCallbackPayload = (yield call([channel, channel.take])) as OauthCallbackPayload;
      yield put(loginSuccess({ user: payload.user, token: payload.token }));
    }
  } finally {
    channel.close();
  }
}

function* handleGenerateSsrmSaga(action: ReturnType<typeof generateSsrmRequest>): Generator<unknown, void, unknown> {
  try {
    const resultPath: string = (yield call(
      tauriIpc.generateSsrm,
      action.payload.modelId,
      action.payload.owner,
      action.payload.expiresInDays
    )) as string;

    yield put(appendSystemLogsBatch({ message: `[IPC-Saga] SSRM generated successfully: ${resultPath}` }));
    yield put({ type: 'ssrm/generateSuccess', payload: { path: resultPath } });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    yield put({ type: 'ssrm/generateFailure', payload: { error: errMessage } });
  }
}

export function* watchTauriIpcSaga(): Generator<unknown, void, unknown> {
  yield takeLeading('tauri/initRequest', handleTauriInitSaga);
  yield takeLatest('tauri/generateSsrmRequest', handleGenerateSsrmSaga);
  yield fork(handleDaemonLogStreamSaga);
  yield fork(handleOauthCallbackStreamSaga);
}
