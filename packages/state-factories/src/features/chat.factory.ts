// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';
import {
  ChatMsgSchema,
  CodernicContextFileSchema,
  ThinkingStateSchema,
  CodernicModeSchema,
} from '../shared/types.schema.js';

export const ChatStateSchema = f.object({
  messages: f.array(ChatMsgSchema),
  pendingAssistantId: f.string().nullable(),
  contextFiles: f.array(CodernicContextFileSchema),
  isDragging: f.boolean(),
  modeBySession: f.record(f.string(), CodernicModeSchema),
  sending: f.boolean(),
  activeTaskIdBySession: f.record(f.string(), f.string().nullable()),
  thinkingBySession: f.record(f.string(), ThinkingStateSchema),
  useRagBySession: f.record(f.string(), f.boolean()),
  autoPilotBySession: f.record(f.string(), f.boolean()),
  builderSubModeBySession: f.record(f.string(), f.enum(['manuel', 'automatic', 'dag'])),
  isPlanFrozenBySession: f.record(f.string(), f.boolean()),
  isProcessing: f.boolean(),
});

const initialState = {
  messages: [],
  pendingAssistantId: null,
  contextFiles: [],
  isDragging: false,
  modeBySession: {},
  sending: false,
  activeTaskIdBySession: {},
  thinkingBySession: {},
  useRagBySession: {},
  autoPilotBySession: {},
  builderSubModeBySession: {},
  isPlanFrozenBySession: {},
  isProcessing: false,
};

export function createChatState(partial: Partial<IInfer<typeof ChatStateSchema>> = {}): IInfer<typeof ChatStateSchema> {
  return { ...initialState, ...partial } as IInfer<typeof ChatStateSchema>;
}
