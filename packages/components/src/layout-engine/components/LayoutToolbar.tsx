// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useLayoutEngine } from '../context';

interface LayoutToolbarProps {
  activeLayoutName?: string;
  onResetLayout?: () => void;
}

export function LayoutToolbar({ activeLayoutName, onResetLayout }: LayoutToolbarProps): React.ReactElement {
  const { state, dispatch } = useLayoutEngine();
  const isEditMode = state.isEditMode;

  const toggleEditMode = () => {
    dispatch({ type: 'TOGGLE_EDIT_MODE' });
  };

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-[#121212] border-b border-zinc-800/80 font-mono text-xs text-zinc-400 font-sans">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
          LAYOUT: {activeLayoutName || 'DEFAULT'}
        </span>
      </div>

      <div className="flex items-center gap-2 font-mono">
        {onResetLayout && (
          <button
            type="button"
            onClick={onResetLayout}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 transition-all text-[11px]"
            title="Reset Layout"
          >
            <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>RESET</span>
          </button>
        )}

        <button
          type="button"
          onClick={toggleEditMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all text-[11px] font-bold ${
            isEditMode
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/60 text-zinc-300'
          }`}
          title="Toggle Edit / Rearrange Mode"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>{isEditMode ? 'EXIT EDIT' : 'EDIT LAYOUT'}</span>
        </button>
      </div>
    </div>
  );
}
