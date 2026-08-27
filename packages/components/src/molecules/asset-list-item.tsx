// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { IconX } from '../atoms/icons';
import { useTestId } from '../hooks/useTestId';

export interface AssetListItemProps {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  onOpen: (id: string) => void;
  onDelete?: (id: string, name: string) => void;
  isActive?: boolean;
  className?: string;
  dataTestId?: string;
}

export function AssetListItem({
  id,
  name,
  icon: Icon,
  onOpen,
  onDelete,
  isActive = false,
  className = '',
  dataTestId,
}: AssetListItemProps): React.ReactElement {
  const { rootId, getTestId } = useTestId('asset-list-item', dataTestId);

  return (
    <li
      data-testid={rootId}
      className={`group/row flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm,4px)] text-[11px] text-[var(--text-body,#a1a1aa)] cursor-pointer select-none transition-colors duration-150 hover:bg-[var(--bg-card-hover,rgba(255,255,255,0.06))] hover:text-[var(--text-primary,#ffffff)] ${
        isActive ? 'bg-[var(--bg-card-hover,rgba(255,255,255,0.08))] text-[var(--text-primary,#ffffff)] font-medium' : ''
      } ${className}`}
      onClick={() => onOpen(id)}
    >
      <Icon
        data-testid={getTestId('icon')}
        size={11}
        className="text-[var(--text-muted,#71717a)] group-hover/row:text-[var(--accent-primary,#f59e0b)] shrink-0 transition-colors"
      />
      <span className="flex-1 truncate" title={name}>
        {name}
      </span>
      {onDelete && (
        <button
          type="button"
          data-testid={getTestId('delete-button')}
          title="Delete"
          className="opacity-0 group-hover/row:opacity-100 p-0.5 rounded-[var(--radius-xs,2px)] text-[var(--text-muted,#71717a)] hover:text-rose-400 hover:bg-rose-950/40 transition-all shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id, name);
          }}
        >
          <IconX size={10} />
        </button>
      )}
    </li>
  );
}
