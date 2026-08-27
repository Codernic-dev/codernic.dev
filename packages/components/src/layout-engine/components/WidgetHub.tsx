// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useLayoutEngine } from '../context';
import type { WidgetDefinition } from '../strategy/types';

interface WidgetHubProps {
  widgetRegistry?: Record<string, WidgetDefinition>;
}

export function WidgetHub({ widgetRegistry }: WidgetHubProps): React.ReactElement | null {
  const { state } = useLayoutEngine();
  const isEditMode = state.isEditMode;

  if (!isEditMode) return null;

  const registry = widgetRegistry || (state.blocks as any)?._strategyRegistry || {};
  const widgetList = Object.values(registry) as WidgetDefinition[];

  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('application/codernic-widget', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const activeWidgetTypes = new Set(
    Object.values(state.blocks)
      .filter((b) => b.type === 'widget' && b.widgetType)
      .map((b) => b.widgetType)
  );

  return (
    <div className="w-64 border-l border-zinc-800/50 bg-[#131316] p-4 flex flex-col gap-2 h-full overflow-y-auto shrink-0 z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] font-sans">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
        Widget Palette
      </h3>
      <div className="flex flex-col gap-2">
        {widgetList.map((def) => {
          const isActive = activeWidgetTypes.has(def.type);
          const IconComp = def.icon;
          return (
            <div
              key={def.type}
              draggable
              onDragStart={(e) => onDragStart(e, def.type)}
              className={`flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-800 cursor-grab active:cursor-grabbing transition-colors relative overflow-hidden ${
                isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {IconComp ? (
                  <IconComp className="w-4 h-4 text-zinc-400" />
                ) : (
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
                <span className="text-xs font-medium text-zinc-300">{def.name}</span>
              </div>
              {isActive && (
                <div className="text-[9px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  Placé
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
