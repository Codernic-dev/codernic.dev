// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';
import { InfraStatsSchema, ContextStatsSchema, InferenceMetricsSchema } from '../shared/types.schema.js';

export const ActorTypeSchema = f.enum(['Daemon', 'Configuration', 'Models', 'VSCode']);
export const ActorStatusSchema = f.enum(['connected', 'disconnected', 'error']);

export const ActorStateSchema = f.object({
  status: ActorStatusSchema,
  message: f.string().optional(),
});

export const SystemStateSchema = f.object({
  appVersion: f.string().nullable(),
  infraStats: InfraStatsSchema.nullable(),
  contextStats: ContextStatsSchema.nullable(),
  metrics: InferenceMetricsSchema.nullable(),
  daemonStatus: f.enum(['running', 'stopped', 'starting', 'stopping']),
  vramUsage: f.number().nullable(),
  vramTotal: f.number().nullable(),
  totalRam: f.number().nullable(),
  ramUsage: f.number().nullable(),
  cpuUsage: f.number().nullable(),
  gpuTarget: f.string(),
  systemLogs: f.array(f.string()),
  wsStatus: f.enum(['connecting', 'connected', 'disconnected']),
  actors: f.record(ActorTypeSchema, ActorStateSchema),
  loraTrainingStatus: f.string().nullable(),
});

const initialState = {
  appVersion: null,
  infraStats: null,
  contextStats: null,
  metrics: null,
  daemonStatus: 'stopped' as const,
  vramUsage: null,
  vramTotal: null,
  totalRam: null,
  ramUsage: null,
  cpuUsage: null,
  gpuTarget: '--',
  systemLogs: [],
  wsStatus: 'connecting' as const,
  actors: {
    Daemon: { status: 'disconnected' as const, message: 'Waiting for connection...' },
    Configuration: { status: 'disconnected' as const, message: 'Initializing...' },
    Models: { status: 'disconnected' as const, message: 'Waiting for configuration...' },
    VSCode: { status: 'disconnected' as const, message: 'Not connected to host' },
  },
  loraTrainingStatus: null,
};

export function createSystemState(partial: Partial<IInfer<typeof SystemStateSchema>> = {}): IInfer<typeof SystemStateSchema> {
  return { ...initialState, ...partial } as IInfer<typeof SystemStateSchema>;
}
