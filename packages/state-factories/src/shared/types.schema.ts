// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

// PATCH for formular.dev missing SchemaBase prototype on f.record
const originalRecord = f.record.bind(f);
f.record = ((keySchema: any, valueSchema: any) => {
  const r = originalRecord(keySchema, valueSchema);
  Object.setPrototypeOf(r, Object.getPrototypeOf(f.string()));
  return r;
}) as any;


export const DiagnosticInfoSchema = f.object({
  code: f.string(),
  title: f.string(),
  message: f.string(),
  fix_suggestion: f.string(),
  documentation_url: f.string().optional(),
});

export const ToolCallSchema = f.object({
  id: f.string(),
  name: f.string(),
  args: f.record(f.string(), f.record(f.string(), f.string())),
  status: f.enum(['running', 'success', 'failed']),
  result: f.string().optional(),
});

export const InferenceMetricsSchema = f.object({
  ttft_ms: f.number(),
  tokens_per_second: f.number(),
  vram_allocated_bytes: f.number(),
  context_tokens_count: f.number(),
});

export const SystemMsgSchema = f.object({
  id: f.string(),
  role: f.literal('system'),
  text: f.string(),
  diagnostic: DiagnosticInfoSchema.optional(),
});

export const UserMsgSchema = f.object({
  id: f.string(),
  role: f.literal('user'),
  text: f.string(),
  diagnostic: DiagnosticInfoSchema.optional(),
});

export const AssistantMsgSchema = f.object({
  id: f.string(),
  role: f.literal('assistant'),
  text: f.string(),
  streaming: f.boolean().optional(),
  diagnostic: DiagnosticInfoSchema.optional(),
  toolCalls: f.array(ToolCallSchema).optional(),
  metrics: InferenceMetricsSchema.optional(),
});

export const PlanCtaMsgSchema = f.object({
  id: f.string(),
  role: f.literal('plan-cta'),
  text: f.string(),
  cost: f.string(),
  duration: f.string(),
  task: f.string(),
});

export const ChatMsgSchema = f.union(
  SystemMsgSchema,
  UserMsgSchema,
  AssistantMsgSchema,
  PlanCtaMsgSchema,
);

export const SelectOptionSchema = f.object({
  value: f.string(),
  label: f.string(),
  group: f.string().optional(),
  isMissing: f.boolean().optional(),
});

export const PhaseGateStateSchema = f.object({
  phase: f.number(),
  summary: f.string(),
});

export const CheckpointStateSchema = f.object({
  id: f.string(),
  verdict: f.string(),
  durationMs: f.number(),
});

export const LaneStatusSchema = f.enum([
  'pending',
  'running',
  'success',
  'failed',
  'escalated',
]);

export const LaneStateSchema = f.object({
  id: f.string(),
  status: LaneStatusSchema,
  checkpoints: f.array(CheckpointStateSchema),
  durationMs: f.number().optional(),
  cost: f.number(),
});

export const AgentRunStateSchema = f.object({
  dagName: f.string(),
  runId: f.string(),
  lanes: f.array(LaneStateSchema),
  runningCostUSD: f.number(),
  startedAt: f.number(),
  status: f.enum(['running', 'success', 'failed', 'partial']),
});

export const AgentIntrospectionEventSchema = f.object({
  id: f.string().optional(),
  type: f.union(
    f.literal('step_start'),
    f.literal('step_success'),
    f.literal('step_retry'),
    f.literal('ToolExecutionResult'),
    f.literal('agent-thinking-stream'),
    f.string(),
  ),
  step_id: f.string().optional(),
  delta: f.string().optional(),
  payload: f.record(f.string(), f.string()).optional(),
  timestamp: f.number(),
});

export const AnalyseStepSchema = f.enum([
  'tech-identification',
  'convention-mining',
  'agent-generation',
]);

export const AnalyseStepStatusSchema = f.enum([
  'pending',
  'skipped',
  'running',
  'done',
  'error',
]);

export const AnalyseProgressStateSchema = f.object({
  steps: f.record(AnalyseStepSchema, AnalyseStepStatusSchema),
  currentStep: AnalyseStepSchema.nullable(),
  totalCostUSD: f.number(),
  errorMessage: f.string().optional(),
  profile: f.string().optional(),
});

export const PirsigMetricsSchema = f.object({
  kpi_score: f.number(),
  symbols_count: f.number(),
  qualitative_flags: f.array(f.string()).nullable(),
});

export const RagProgressStateSchema = f.object({
  filesIndexed: f.number(),
  totalFiles: f.number(),
  percentage: f.number(),
});

export const GalileusSessionSchema = f.object({
  id: f.string(),
  label: f.string(),
  state: f.enum(['ACTIVE', 'IDLE', 'WAITING', 'DONE']),
  agent_type: f.string(),
  claimed_files_count: f.number(),
  waiter_count: f.number(),
});

export const WorkspaceSnapshotSchema = f.object({
  sessions: f.array(GalileusSessionSchema),
  queue: f.array(f.record(f.string(), f.string())),
  generated_at: f.number(),
});

export const InfraStatsSchema = f.object({
  vram_used: f.number(),
  vram_total: f.number(),
  vram_available: f.number(),
  vram_required: f.number(),
});

export const ContextStatsSchema = f.object({
  current_tokens: f.number(),
  max_tokens: f.number(),
  usage_percent: f.number(),
  turn_count: f.number(),
});

export const ThinkingPhaseSchema = f.enum([
  'thinking',
  'reasoning',
  'considering',
  'reading',
  'searching',
  'reflecting',
  'planning',
  'writing',
  'executing',
  'loading',
  'idle',
]);

export const ThinkingStateSchema = f.object({
  phase: ThinkingPhaseSchema,
  detail: f.string().optional(),
});

export const CodernicContextFileSchema = f.object({
  id: f.string(),
  filePath: f.string(),
  fileName: f.string(),
  lines: f.array(f.number()).optional(),
});

export const SessionMetaSchema = f.object({
  id: f.string(),
  name: f.string(),
  status: f.enum(['idle', 'running', 'success', 'error']),
  last_updated: f.number(),
  current_mode: f.enum(['brainstorm', 'plan', 'agent']).optional(),
  llm_id: f.string().optional(),
  use_rag: f.boolean().optional(),
  auto_pilot: f.boolean().optional(),
  erathos_schema: f.record(f.string(), f.string()).optional(),
});

export const NodeStatusSchema = f.enum([
  'pending',
  'running',
  'success',
  'failed',
]);

export const DagNodeSchema = f.object({
  id: f.string(),
  role: f.string(),
  status: NodeStatusSchema,
  dependencies: f.array(f.string()),
  description: f.string().optional(),
  errorLog: f.string().optional(),
});

export const CodernicModeSchema = f.enum([
  'brainstorm',
  'builder',
  'debugger',
  'architect',
  'reviewer',
  'docgen',
]);

export const JourneyPhaseSchema = f.number();
export type CodernicContextFile = IInfer<typeof CodernicContextFileSchema>;
export type DiagnosticInfo = IInfer<typeof DiagnosticInfoSchema>;
export type ToolCall = IInfer<typeof ToolCallSchema>;
export type InferenceMetrics = IInfer<typeof InferenceMetricsSchema>;
export type ChatMsg = IInfer<typeof ChatMsgSchema>;
export type ThinkingState = IInfer<typeof ThinkingStateSchema>;

