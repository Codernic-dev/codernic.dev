// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { Skeleton } from '../atoms/index.js'

interface SkeletonRowProps {
  cols: number
}

/** Single masked table row */
export function SkeletonRow({ cols }: SkeletonRowProps) {
  return (
    <tr aria-hidden="true">
      {Array.from({ length: cols }, (_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton data-testid={`skeleton-row-item-${i}`} className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}
