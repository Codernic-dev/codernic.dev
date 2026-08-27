// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { put, takeLatest, delay } from 'redux-saga/effects';
import { setRosterLoading, setRosterError } from './roster.slice';

// Example of a strict implementation following the rules
export function* fetchRosterInitialDataSaga() {
  try {
    yield put(setRosterLoading(true));
    // Simulate some async initialization or REST fallback if WS is not ready
    yield delay(500); 
  } catch (error: any) {
    yield put(setRosterError(error.message));
  } finally {
    yield put(setRosterLoading(false));
  }
}

export function* watchRosterSaga() {
  yield takeLatest('roster/fetchInitialData', fetchRosterInitialDataSaga);
}
