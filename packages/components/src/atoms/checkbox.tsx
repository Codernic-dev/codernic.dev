// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { InputHTMLAttributes } from 'react'
import { cx } from '../lib/cx.js'
import { useTestId } from '../hooks/useTestId';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  dataTestId?: string;
}

export function Checkbox({
  label,
  dataTestId,
  className = '',
  ...props
}: CheckboxProps) {
  const { getTestId } = useTestId('checkbox', dataTestId);

  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        data-testid={getTestId('input')}
        className={cx(
          'mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-neutral-900',
          className
        )}
        {...props}
      />
      {label && (
        <span className="text-sm text-neutral-300 leading-relaxed">
          {label}
        </span>
      )}
    </label>
  );
}
