// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { ButtonSize, ButtonVariant } from './button.types.js'

export const variantClass: Record<ButtonVariant, string> = {
  primary:   'bg-amber-500 hover:bg-amber-400 text-zinc-950 dark:text-zinc-950 font-bold border-transparent shadow-md shadow-amber-500/20',
  secondary: 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700',
  ghost:     'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 border-transparent',
  danger:    'bg-red-600 hover:bg-red-500 text-white border-transparent',
}

export const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1   text-xs',
  md: 'px-4   py-1.5 text-sm',
  lg: 'px-6   py-2   text-base',
  icon: 'p-1.5 flex items-center justify-center',
}
