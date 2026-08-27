// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { ReactNode } from 'react'
import { cx } from '../lib/cx.js'
import type { LabelPosition } from './field-set.types.js'
import { fieldDisabled, labelBase } from './field.classes.js'
import type { FieldSnapshot } from './use-formular-field.js'
import { ValidationResult } from './validation-result.js'
import { useTestId } from '../hooks/useTestId';

interface FieldSetProps {
  field:          Pick<FieldSnapshot, 'id' | 'isFocused' | 'errors'>
  label?:         string
  labelPosition?: LabelPosition
  disabled?:      boolean
  className?:     string
  children:       ReactNode
  dataTestId?: string;
}

export function FieldSet({ dataTestId,
  field,
  label,
  labelPosition = 'top',
  disabled      = false,
  className     = '',
  children,
}: Readonly<FieldSetProps>) {
  
  const { rootId, getTestId } = useTestId('field-set', dataTestId);
const labelEl = label && (
    <label
      htmlFor={field.id}
      className={cx(
        labelBase,
        labelPosition === 'inline' && 'cursor-pointer select-none',
        disabled && fieldDisabled,
      )}
    >
      {label}
    </label>
  )

  return (
    <div className={cx('flex flex-col gap-1', className)}>
      {labelPosition === 'top' && labelEl}
      {labelPosition === 'inline' ? (
        <div className="flex items-center gap-2">
          {children}
          {labelEl}
        </div>
      ) : (
        children
      )}
      <ValidationResult data-testid={getTestId('validation-result')} field={field} />
    </div>
  )
}
