// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

'use client'

import { useForm } from './form-provider.js'

export interface FormSnapshot {
  isValid:     boolean
  isDirty:     boolean
  isBusy:      boolean
  submitCount: number
}

/**
 * Returns whole-form state from the React-backed FormBridge context.
 * The `form` parameter is kept for backward API compatibility but ignored —
 * state is always read from the nearest <FormProvider>.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormularForm(_form?: any): FormSnapshot {
  const bridge = useForm()
  return {
    isValid:     bridge.isValid,
    isDirty:     bridge.isDirty,
    isBusy:      bridge.isBusy,
    submitCount: bridge.submitCount,
  }
}
