// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';
import { SessionMetaSchema } from '../shared/types.schema.js';

export const SessionsStateSchema = f.object({
  sessions: f.record(f.string(), SessionMetaSchema),
  currentSessionId: f.string().nullable(),
  erathosSnapshots: f.record(f.string(), f.string()),
});

const initialState = {
  sessions: {},
  currentSessionId: null,
  erathosSnapshots: {},
};

export function createSessionsState(partial: Partial<IInfer<typeof SessionsStateSchema>> = {}): IInfer<typeof SessionsStateSchema> {
  return { ...initialState, ...partial } as IInfer<typeof SessionsStateSchema>;
}
