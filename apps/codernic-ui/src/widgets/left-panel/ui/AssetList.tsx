// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { AssetListItem } from '@codernic/components';

export interface AssetListProps {
  items: { id: string; name: string }[];
  onOpen: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
}

export function AssetList({ items, onOpen, onDelete, icon }: AssetListProps): JSX.Element {
  if (items.length === 0) {
    return (
      <div className="text-[var(--text-muted,#71717a)] text-[11px] italic py-1 px-1.5">
        None defined
      </div>
    );
  }

  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
      {items.map((item) => (
        <AssetListItem
          key={item.id}
          id={item.id}
          name={item.name}
          icon={icon}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
