// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { SkeletonRow } from './skeleton-row.js'

interface SkeletonRowsProps {
  rows?: number
  cols?: number
}

/** Drop-in replacement for `<tbody>` content while loading */
export function SkeletonRows({ rows = 5, cols = 5 }: SkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <SkeletonRow data-testid={`skeleton-rows-item-${i}`} key={i} cols={cols} />
      ))}
    </>
  )
}
