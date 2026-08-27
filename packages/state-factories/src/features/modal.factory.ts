// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const ModalConfigSchema = f.object({
  title: f.string(),
  message: f.string().optional(),
  type: f.enum(['confirm', 'alert', 'prompt', 'spinner']).optional(),
  confirmText: f.string().optional(),
  cancelText: f.string().optional(),
});

export const ModalDeferredSchema = f.object({
  resolve: f.record(f.string(), f.string()),
  reject: f.record(f.string(), f.string()),
});

export const ModalStateSchema = f.object({
  isOpen: f.boolean(),
  config: ModalConfigSchema.nullable(),
  deferred: ModalDeferredSchema.nullable(),
});

export function createModalState(
  partial: Partial<IInfer<typeof ModalStateSchema>> = {}
): IInfer<typeof ModalStateSchema> {
  const defaultState = {
    isOpen: false,
    config: null,
    deferred: null,
  };
  return { ...defaultState, ...partial } as IInfer<typeof ModalStateSchema>;
}
