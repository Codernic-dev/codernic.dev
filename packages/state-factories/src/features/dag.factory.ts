// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';
import {
  DagNodeSchema,
  AgentRunStateSchema,
  AnalyseProgressStateSchema,
  RagProgressStateSchema,
  PhaseGateStateSchema,
  JourneyPhaseSchema,
  PirsigMetricsSchema,
  AgentIntrospectionEventSchema,
  WorkspaceSnapshotSchema,
} from '../shared/types.schema.js';

export const DagStateSchema = f.object({
  nodes: f.record(f.string(), DagNodeSchema),
  nodeIds: f.array(f.string()),
  allCompleted: f.boolean(),
  activeNodeId: f.string().nullable(),
  approvalRequest: f.object({ id: f.string(), prompt: f.string() }).nullable(),
  artifactReview: f.object({ title: f.string(), filename: f.string(), content: f.string().optional() }).nullable(),
  agentRunBySession: f.record(f.string(), AgentRunStateSchema.nullable()),
  analyseProgressBySession: f.record(f.string(), AnalyseProgressStateSchema.nullable()),
  ragProgress: RagProgressStateSchema.nullable(),
  phaseGate: PhaseGateStateSchema.nullable(),
  journeyPhase: JourneyPhaseSchema,
  pirsigMetrics: PirsigMetricsSchema.nullable(),
  introspectionEvents: f.array(AgentIntrospectionEventSchema),
  galileusSnapshot: WorkspaceSnapshotSchema.nullable(),
  galileusError: f.string().nullable(),
  erathosSchema: f.record(f.string(), f.string()).nullable(),
  diffModalOpen: f.boolean(),
  isErathosSyncing: f.boolean(),
});

const initialState = {
  nodes: {},
  nodeIds: [],
  allCompleted: false,
  activeNodeId: null,
  approvalRequest: null,
  artifactReview: null,
  agentRunBySession: {},
  analyseProgressBySession: {},
  ragProgress: null,
  phaseGate: null,
  journeyPhase: 1,
  pirsigMetrics: null,
  introspectionEvents: [],
  galileusSnapshot: null,
  galileusError: null,
  erathosSchema: null,
  diffModalOpen: false,
  isErathosSyncing: false,
};

export function createDagState(partial: Partial<IInfer<typeof DagStateSchema>> = {}): IInfer<typeof DagStateSchema> {
  return { ...initialState, ...partial } as IInfer<typeof DagStateSchema>;
}
