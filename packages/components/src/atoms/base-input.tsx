// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { InputHTMLAttributes } from 'react'
import { Skeleton } from './skeleton.js'
import { useTestId } from '../hooks/useTestId';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean
  dataTestId?: string;
}

export function BaseInput({ dataTestId,
  isLoading = false,
  type      = 'text',
  className,
  ...props
}: Readonly<BaseInputProps>) {
  
  const { rootId, getTestId } = useTestId('base-input', dataTestId);
if (isLoading) {
    const skeletonClass = type === 'checkbox'
      ? 'h-4 w-4 rounded'
      : 'h-8 w-full rounded-node'
    return <Skeleton data-testid={getTestId('skeleton')} className={skeletonClass} />
  }

  return <input type={type} className={className} {...props} />
}
