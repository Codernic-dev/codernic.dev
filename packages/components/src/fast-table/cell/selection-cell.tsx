// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

'use client'

import type { SelectionCellProps } from './cell.types.js'

export function SelectionCell({ rowId, isSelected, onToggle }: SelectionCellProps) {
  return (
    <div role="cell" className="ft-selection-cell">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(rowId)}
        aria-label={isSelected ? 'Deselect row' : 'Select row'}
      />
    </div>
  )
}
