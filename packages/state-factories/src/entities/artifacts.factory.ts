// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const ArtifactsStateSchema = f.object({
  list: f.array(f.string()),
  content: f.record(f.string(), f.string()),
  isLoadingList: f.boolean(),
  isLoadingContent: f.boolean(),
  error: f.string().nullable(),
});

export type ArtifactsState = IInfer<typeof ArtifactsStateSchema>;

export function createArtifactsState(partial: Partial<ArtifactsState> = {}): ArtifactsState {
  const defaultState: ArtifactsState = {
    list: [],
    content: {},
    isLoadingList: false,
    isLoadingContent: false,
    error: null,
  };
  return { ...defaultState, ...partial } as IInfer<typeof ArtifactsStateSchema>;
}
