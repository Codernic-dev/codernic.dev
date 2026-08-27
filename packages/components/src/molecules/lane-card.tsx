// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useTestId } from '../hooks/useTestId';

export interface LaneCardProps {
  title: string;
  badgeText?: string;
  badgeVariant?: 'cyan' | 'amber' | 'emerald' | 'rose' | 'slate';
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

const BADGE_VARIANTS: Record<NonNullable<LaneCardProps['badgeVariant']>, { badgeClass: string; borderClass: string; shadowClass: string; titleClass: string }> = {
  cyan: {
    badgeClass: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
    borderClass: 'border-cyan-900/40 hover:border-cyan-800/60',
    shadowClass: 'shadow-[0_0_15px_rgba(8,145,178,0.05)] hover:shadow-[0_0_20px_rgba(8,145,178,0.1)]',
    titleClass: 'text-cyan-400',
  },
  amber: {
    badgeClass: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
    borderClass: 'border-amber-900/40 hover:border-amber-800/60',
    shadowClass: 'shadow-[0_0_15px_rgba(217,119,6,0.05)] hover:shadow-[0_0_20px_rgba(217,119,6,0.1)]',
    titleClass: 'text-amber-400',
  },
  emerald: {
    badgeClass: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
    borderClass: 'border-emerald-900/40 hover:border-emerald-800/60',
    shadowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]',
    titleClass: 'text-emerald-400',
  },
  rose: {
    badgeClass: 'bg-rose-900/40 text-rose-300 border-rose-700/40',
    borderClass: 'border-rose-900/40 hover:border-rose-800/60',
    shadowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.05)] hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]',
    titleClass: 'text-rose-400',
  },
  slate: {
    badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700/40',
    borderClass: 'border-zinc-800 hover:border-zinc-700',
    shadowClass: 'shadow-card',
    titleClass: 'text-zinc-300',
  },
};

export function LaneCard({
  title,
  badgeText,
  badgeVariant = 'cyan',
  headerAction,
  children,
  className = '',
  dataTestId,
}: LaneCardProps): React.ReactElement {
  const { rootId, getTestId } = useTestId('lane-card', dataTestId);
  const variant = BADGE_VARIANTS[badgeVariant];

  return (
    <div
      data-testid={rootId}
      className={`flex flex-col flex-1 min-w-[300px] shrink-0 bg-[#121214] border rounded-xl overflow-hidden transition-all duration-300 ${variant.borderClass} ${variant.shadowClass} ${className}`}
    >
      <div className="px-4 py-3 bg-zinc-950/40 border-b border-zinc-800/60 flex items-center justify-between">
        <h3 className={`text-sm font-semibold font-mono tracking-wider ${variant.titleClass}`}>
          {title.toUpperCase()}
        </h3>
        <div className="flex items-center gap-2">
          {badgeText && (
            <span
              data-testid={getTestId('badge')}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${variant.badgeClass}`}
            >
              {badgeText}
            </span>
          )}
          {headerAction}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
