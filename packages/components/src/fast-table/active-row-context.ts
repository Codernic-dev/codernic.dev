// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

'use client'

import { createContext, useContext } from 'react'

// ─── Active row context value ─────────────────────────────────────────────────

export interface ActiveRowContextValue {
  /** The row id that currently owns the active/edit FormularProvider. */
  activeRowId:    string | number | null
  setActiveRowId: (id: string | number | null) => void
}

// ─── Context + throwing hook ─────────────────────────────────────────────────

const ActiveRowContext = createContext<ActiveRowContextValue | null>(null)

ActiveRowContext.displayName = 'ActiveRowContext'

export { ActiveRowContext }

export function useActiveRow(): ActiveRowContextValue {
  const ctx = useContext(ActiveRowContext)
  if (!ctx) {
    throw new Error(
      'useActiveRow: must be used inside <FastTable>. ' +
      'Did you forget to wrap your component?',
    )
  }
  return ctx
}
