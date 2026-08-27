// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { CSSProperties } from 'react'
import type { ColumnDef, TableRowState } from '../types.js'

export interface RowProps<T> {
  rowState:   TableRowState<T>
  columns:    ColumnDef<T>[]
  rowId:      string | number
  isSelected: boolean
  onSelect:   (id: string | number) => void
  onActivate: (id: string | number) => void
  style?:     CSSProperties
}
