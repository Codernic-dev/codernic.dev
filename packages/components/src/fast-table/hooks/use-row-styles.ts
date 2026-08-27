// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useMemo } from 'react'
import type { RowStyleRule, TableRowState } from '../types.js'

export function mergeRules<T>(
  defaults:  RowStyleRule<T>[],
  overrides: RowStyleRule<T>[],
): RowStyleRule<T>[] {
  const map = new Map(defaults.map(r => [r.id, r]))
  for (const r of overrides) map.set(r.id, r)
  return [...map.values()].sort((a, b) => a.priority - b.priority)
}

export function useRowStyles<T>(
  rowState: TableRowState<T>,
  rules:    RowStyleRule<T>[],
): string {
  return useMemo(
    () => rules
      .filter(r => r.condition(rowState))
      .map(r => r.classes)
      .join(' '),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowState, rules],
  )
}
