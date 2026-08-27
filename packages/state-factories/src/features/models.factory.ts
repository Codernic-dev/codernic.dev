// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';
import { SelectOptionSchema } from '../shared/types.schema.js';

export const CloudProviderSchema = f.object({
  id: f.string(),
  name: f.string(),
  subscription_url: f.string().optional(),
});

export const CloudModelPricingSchema = f.object({
  prompt: f.string().optional(),
  completion: f.string().optional(),
  image: f.string().optional(),
  request: f.string().optional(),
});

export const CloudModelSchema = f.object({
  id: f.string(),
  name: f.string(),
  provider: f.string(),
  context_length: f.number().optional(),
  pricing: CloudModelPricingSchema.optional(),
});

export const CloudModelsDigestSchema = f.object({
  updated_at: f.string(),
  providers: f.array(CloudProviderSchema),
  models: f.array(CloudModelSchema),
});

export const ModelsStateSchema = f.object({
  availableLlms: f.array(SelectOptionSchema),
  llmLoading: f.boolean(),
  sessionLlmBySession: f.record(f.string(), f.string()),
  routeProfiles: f.array(SelectOptionSchema),
  routeProfileBySession: f.record(f.string(), f.string()),
  providerFilters: f.array(SelectOptionSchema),
  providerFilter: f.string(),
  localModels: f.array(f.object({ name: f.string(), sizeBytes: f.number() })),
  activeDownloads: f.record(f.string(), 
    f.object({
      modelId: f.string(),
      file: f.string(),
      progress: f.string(),
      providerName: f.string().optional(),
    })
  ),
  searchState: f.object({
    query: f.string(),
    source: f.enum(['huggingface', 'local']),
    match: f.string(),
    type: f.string(),
    models: f.array(f.record(f.string(), f.string())),
    isSearching: f.boolean(),
    error: f.string().nullable(),
  }),
  cloudDigest: CloudModelsDigestSchema.nullable(),
  cloudDigestLoading: f.boolean(),
  cloudDigestError: f.string().nullable(),
});

const initialState = {
  availableLlms: [],
  llmLoading: true,
  sessionLlmBySession: {},
  routeProfiles: [],
  routeProfileBySession: {},
  providerFilters: [],
  providerFilter: 'default',
  localModels: [],
  activeDownloads: {},
  searchState: {
    query: '',
    source: 'huggingface' as const,
    match: 'c',
    type: 'all',
    models: [],
    isSearching: false,
    error: null,
  },
  cloudDigest: null,
  cloudDigestLoading: false,
  cloudDigestError: null,
};

export function createModelsState(partial: Partial<IInfer<typeof ModelsStateSchema>> = {}): IInfer<typeof ModelsStateSchema> {
  return { ...initialState, ...partial } as IInfer<typeof ModelsStateSchema>;
}
