// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { LabelHTMLAttributes } from 'react';
import { cx } from '../lib/cx.js';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cx(
        'text-[11px] font-mono font-bold tracking-wider text-[var(--text-muted)] uppercase',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
