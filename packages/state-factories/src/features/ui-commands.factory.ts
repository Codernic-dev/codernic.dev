// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const UICommandStateSchema = f.object({
  isExpanded: f.boolean().optional(),
  isMaximized: f.boolean().optional(),
  isDisabled: f.boolean().optional(),
  isBlinking: f.boolean().optional(),
  isHighlighted: f.boolean().optional(),
  isObscured: f.boolean().optional(),
  isBlurred: f.boolean().optional(),
  isSemiTransparent: f.boolean().optional(),
  lastRefreshed: f.number().optional(),
  validationErrors: f.array(f.string()).optional(),
});

export const UICommandsRootStateSchema = f.object({
  commands: f.record(f.string(), UICommandStateSchema),
});

export function createUICommandsRootState(
  partial: Partial<IInfer<typeof UICommandsRootStateSchema>> = {}
): IInfer<typeof UICommandsRootStateSchema> {
  const defaultState = {
    commands: {},
  };
  return { ...defaultState, ...partial } as IInfer<typeof UICommandsRootStateSchema>;
}
