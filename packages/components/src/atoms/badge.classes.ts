// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { StatusKey } from '../tokens/index.js'

export const statusClasses: Record<StatusKey, string> = {
  success: 'bg-success-100 text-success-700 border border-success-500',
  failed:  'bg-danger-100  text-danger-700  border border-danger-500',
  warning: 'bg-warning-100 text-warning-700 border border-warning-500',
  running: 'bg-brand-100   text-brand-700   border border-brand-500',
  pending: 'bg-neutral-100 text-neutral-600 border border-neutral-300',
  partial: 'bg-warning-100 text-warning-700 border border-warning-500',
}

export const dotClasses: Record<StatusKey, string> = {
  success: 'bg-success-500',
  failed:  'bg-danger-500',
  warning: 'bg-warning-500',
  running: 'bg-brand-500 animate-pulse',
  pending: 'bg-neutral-400',
  partial: 'bg-warning-500',
}
