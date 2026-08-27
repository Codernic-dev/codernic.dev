// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const EnterpriseMessageSchema = f.object({
  id: f.string(),
  role: f.enum(['user', 'assistant']),
  text: f.string(),
});

export const EnterpriseChatbotStateSchema = f.object({
  messages: f.array(EnterpriseMessageSchema),
  sending: f.boolean(),
});

export function createEnterpriseChatbotState(
  partial: Partial<IInfer<typeof EnterpriseChatbotStateSchema>> = {}
): IInfer<typeof EnterpriseChatbotStateSchema> {
  const defaultState = {
    messages: [],
    sending: false,
  };
  return { ...defaultState, ...partial } as IInfer<typeof EnterpriseChatbotStateSchema>;
}
