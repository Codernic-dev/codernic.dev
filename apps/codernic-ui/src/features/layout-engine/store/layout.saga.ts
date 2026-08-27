// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { all, call, takeEvery } from 'redux-saga/effects';
import { getCodernicHttpUrl } from '../../../shared/config';

function* handleFetchLayouts(action: any): Generator<any, void, any> {
  const { onSuccess, onError } = action.payload;
  try {
    const baseUrl = getCodernicHttpUrl();
    const res = yield call(fetch, `${baseUrl}/api/layouts?t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
    });
    if (res.ok) {
      const layouts = yield call([res, res.json]);
      if (onSuccess) onSuccess(layouts);
    } else {
      if (onError) onError();
    }
  } catch (e) {
    console.warn('Failed to load layouts from API:', e);
    if (onError) onError();
  }
}

function* handleSaveLayout(action: any): Generator<any, void, any> {
  const { name, blocks } = action.payload;
  try {
    const baseUrl = getCodernicHttpUrl();
    yield call(fetch, `${baseUrl}/api/layouts/${encodeURIComponent(name)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blocks)
    });
  } catch (e) {
    console.error('Failed to save layout', e);
  }
}

function* handleFetchShortcuts(action: any): Generator<any, void, any> {
  const { onSuccess } = action.payload;
  try {
    const baseUrl = getCodernicHttpUrl();
    const res = yield call(fetch, `${baseUrl}/api/shortcuts?t=${Date.now()}`);
    if (res.ok) {
      const data = yield call([res, res.json]);
      if (onSuccess) onSuccess(data);
    }
  } catch (e) {
    console.warn('Failed to load shortcuts from API', e);
  }
}

export function* layoutSaga(): Generator {
  yield all([
    takeEvery('layout/fetchLayoutsRequest', handleFetchLayouts),
    takeEvery('layout/saveLayoutRequest', handleSaveLayout),
    takeEvery('layout/fetchShortcutsRequest', handleFetchShortcuts),
  ]);
}
