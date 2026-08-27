// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { all, call, takeEvery } from 'redux-saga/effects';
import { getCodernicHttpUrl } from '../../../shared/config';

function* handleAuthSetup(action: any): Generator<any, void, any> {
  const { payload, onSuccess, onError } = action.payload;
  try {
    const HTTP_URL = getCodernicHttpUrl();
    const res = yield call(fetch, `${HTTP_URL}/api/auth/setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error('Failed to save Identity Settings');
    }
    
    if (onSuccess) onSuccess();
  } catch (err: unknown) {
    const msg = (err as Error).message || 'An error occurred while saving.';
    if (onError) onError(msg);
  }
}

function* handleSaveRoleMatrix(action: any): Generator<any, void, any> {
  const { payload, onSuccess, onError } = action.payload;
  try {
    const HTTP_URL = getCodernicHttpUrl();
    const res = yield call(fetch, `${HTTP_URL}/api/auth/rbac/matrix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error('Failed to save Role Matrix');
    }
    
    if (onSuccess) onSuccess();
  } catch (err: unknown) {
    const msg = (err as Error).message || 'An error occurred while saving the role matrix.';
    if (onError) onError(msg);
  }
}

export function* authSaga(): Generator {
  yield all([
    takeEvery('auth/setupRequest', handleAuthSetup),
    takeEvery('auth/saveRoleMatrixRequest', handleSaveRoleMatrix),
  ]);
}
