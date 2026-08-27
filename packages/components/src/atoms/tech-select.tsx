// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { BaseSelect } from './base-select.js'
import { useTestId } from '../hooks/useTestId';

export interface TechOption {
  value: string
  label: string
}

interface TechSelectProps {
  value: string
  onChange(v: string): void
  options?: TechOption[]
  isLoading?: boolean
  placeholder?: string
  className?: string
  'aria-label'?: string
  dataTestId?: string;
}

export function TechSelect({ dataTestId,
  value,
  onChange,
  options = [],
  isLoading,
  placeholder = '— Select technology —',
  className,
  'aria-label': ariaLabel = 'Technology',
}: TechSelectProps) {
  
  const { rootId, getTestId } = useTestId('tech-select', dataTestId);
return (
    <BaseSelect data-testid={getTestId('base-select')}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      isLoading={isLoading}
      className={className}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </BaseSelect>
  )
}
