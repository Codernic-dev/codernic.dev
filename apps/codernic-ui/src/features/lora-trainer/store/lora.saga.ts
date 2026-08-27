// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { all, call, takeEvery } from 'redux-saga/effects';
import { getCodernicHttpUrl } from '../../../shared/config';

function* handleTrainLora(action: any): Generator<any, void, any> {
  const { form, onSuccess, onError } = action.payload;
  try {
    const HTTP_URL = getCodernicHttpUrl();
    const response = yield call(fetch, `${HTTP_URL}/api/lora/train`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = yield call([response, response.json]);
    if (!data.success) {
      if (onError) onError(data.message);
    } else {
      if (onSuccess) onSuccess(data.message);
    }
  } catch (e: unknown) {
    const err = e instanceof Error ? e.message : String(e);
    if (onError) onError(err);
  }
}

export function* loraSaga(): Generator {
  yield all([
    takeEvery('lora/trainRequest', handleTrainLora),
  ]);
}
