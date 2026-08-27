// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const AssetEntrySchema = f.object({
  id: f.string(),
  name: f.string(),
  description: f.string().optional(),
});

export const AssetsStateSchema = f.object({
  agents: f.record(f.string(), AssetEntrySchema),
  dags: f.record(f.string(), AssetEntrySchema),
  techs: f.record(f.string(), AssetEntrySchema),
  rules: f.record(f.string(), AssetEntrySchema),
  prompts: f.record(f.string(), AssetEntrySchema),
  providers: f.array(f.string()),
  routes: f.array(f.string()),
  llmProviders: f.record(f.string(), AssetEntrySchema),
  llmRoutes: f.record(f.string(), AssetEntrySchema),
  loaded: f.boolean(),
  editingAsset: f.object({
    type: f.string(),
    id: f.string(),
    content: f.string(),
  }).nullable(),
  jsonEditorSchemas: f.record(f.string(), f.string()),
  metadataSources: f.record(f.string(), f.string()),
  cloudModels: f.array(f.record(f.string(), f.string())),
  activeRouteProfile: f.string(),
});

export function createAssetsState(
  partial: Partial<IInfer<typeof AssetsStateSchema>> = {}
): IInfer<typeof AssetsStateSchema> {
  const defaultState = {
    agents: {},
    dags: {},
    techs: {},
    rules: {},
    prompts: {},
    providers: [],
    routes: [],
    llmProviders: {},
    llmRoutes: {},
    loaded: false,
    editingAsset: null,
    jsonEditorSchemas: {},
    metadataSources: {},
    cloudModels: [],
    activeRouteProfile: 'default',
  };
  return { ...defaultState, ...partial } as IInfer<typeof AssetsStateSchema>;
}
