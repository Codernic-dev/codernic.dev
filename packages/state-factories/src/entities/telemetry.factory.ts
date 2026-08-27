// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const HardwareMetricsSchema = f.object({
  vramUsedGb: f.number().nullable(),
  memoryLockLimit: f.string().nullable(),
});

export const BackendMetricsSchema = f.object({
  ragInitialized: f.boolean(),
  indexedChunksCount: f.number(),
  activeMcpBridges: f.array(f.string()),
});

export const FrontendMetricsSchema = f.object({
  activeWatchers: f.number(),
});

export const TelemetryStateSchema = f.object({
  globalStatus: f.enum(['ok', 'down', 'unknown']),
  hardware: HardwareMetricsSchema.nullable(),
  backend: BackendMetricsSchema.nullable(),
  frontend: FrontendMetricsSchema.nullable(),
});

export function createTelemetryState(
  partial: Partial<IInfer<typeof TelemetryStateSchema>> = {}
): IInfer<typeof TelemetryStateSchema> {
  const defaultState = {
    globalStatus: 'unknown' as const,
    hardware: null,
    backend: null,
    frontend: null,
  };
  return { ...defaultState, ...partial } as IInfer<typeof TelemetryStateSchema>;
}
