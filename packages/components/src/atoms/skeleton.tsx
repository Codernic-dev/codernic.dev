// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useTestId } from '../hooks/useTestId';

interface SkeletonProps {
  className?: string;
  dataTestId?: string;
}

/** Animated shimmer placeholder block — sized via className */
export function Skeleton({ className = '', dataTestId }: SkeletonProps) {
  const { rootId } = useTestId('skeleton', dataTestId);
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded skeleton-loader ${className}`}
      data-testid={rootId}
    />
  );
}
