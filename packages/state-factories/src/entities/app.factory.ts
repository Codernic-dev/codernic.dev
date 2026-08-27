// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const AppStateSchema = f.object({
  loaders: f.record(f.string(), f.boolean()),
  workspaceName: f.string().nullable(),
  sandboxMode: f.boolean(),
  daemonIsLoaded: f.boolean(),
});

export type AppState = IInfer<typeof AppStateSchema>;

const sandboxModeFromStorage = typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage.getItem('FORCE_SANDBOX_MODE') === 'true';

export function createAppState(partial: Partial<AppState> = {}): AppState {
  const defaultState: AppState = {
    loaders: {},
    workspaceName: null,
    sandboxMode: sandboxModeFromStorage,
    daemonIsLoaded: false,
  };
  return { ...defaultState, ...partial } as IInfer<typeof AppStateSchema>;
}
