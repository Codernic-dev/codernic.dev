// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const IntrospectionStreamNodeSchema = f.object({
  id: f.string(),
  timestamp: f.string(),
  type: f.enum(['thought', 'convergence', 'divergence', 'tool_call', 'dag_arbitration']),
  content: f.string(),
  agentId: f.string().optional(),
  messageId: f.string().optional(),
});

export const IntrospectionSessionSchema = f.object({
  introspectionId: f.string(),
  sessionId: f.string(),
  confidenceScore: f.number().nullable(),
  mode: f.enum(['free-flow', 'deterministic']),
  nodes: f.array(IntrospectionStreamNodeSchema),
});

export const IntrospectionStateSchema = f.object({
  activeIntrospectionId: f.string().nullable(),
  sessions: f.record(f.string(), IntrospectionSessionSchema),
});

export type IIntrospectionStreamNode = IInfer<typeof IntrospectionStreamNodeSchema>;
export type IIntrospectionSession = IInfer<typeof IntrospectionSessionSchema>;
export type IntrospectionState = IInfer<typeof IntrospectionStateSchema>;

export function createIntrospectionState(partial: Partial<IntrospectionState> = {}): IntrospectionState {
  const defaultState: IntrospectionState = {
    activeIntrospectionId: null,
    sessions: {},
  };
  return { ...defaultState, ...partial } as IInfer<typeof IntrospectionStateSchema>;
}
