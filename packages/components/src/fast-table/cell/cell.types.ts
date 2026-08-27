// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { ColumnDef, TableRowState } from '../types.js'

export interface CellProps<T> {
  column:   ColumnDef<T>
  rowState: TableRowState<T>
}

export interface SelectionCellProps {
  rowId:      string | number
  isSelected: boolean
  onToggle:   (id: string | number) => void
}
