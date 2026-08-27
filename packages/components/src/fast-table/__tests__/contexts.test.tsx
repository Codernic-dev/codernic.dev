// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useActiveRow } from '../active-row-context.js'
import { useFastTableContext } from '../fast-table-context.js'

describe('useFastTableContext', () => {
  it('throws a descriptive error when used outside <FastTable>', () => {
    expect(() => renderHook(() => useFastTableContext())).toThrow(
      'useFastTableContext: must be used inside <FastTable>.',
    )
  })
})

describe('useActiveRow', () => {
  it('throws a descriptive error when used outside <FastTable>', () => {
    expect(() => renderHook(() => useActiveRow())).toThrow(
      'useActiveRow: must be used inside <FastTable>.',
    )
  })
})
