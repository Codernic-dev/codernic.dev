// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { togglePirsigRequest, toggleOckhamRequest } from '../model/swg-slice';

interface EngineControlsWidgetProps {
  pirsigEnabled?: boolean;
  ockhamEnabled?: boolean;
  loading?: {
    pirsig: boolean;
    ockham: boolean;
  };
  onTogglePirsig?: (enabled: boolean) => void;
  onToggleOckham?: (enabled: boolean) => void;
}

export function EngineControlsWidget(props: EngineControlsWidgetProps): React.ReactElement {
  const dispatch = useDispatch();
  const swgState = useSelector((state: RootState) => state.swg);

  const pirsigEnabled = props.pirsigEnabled ?? swgState?.pirsigEnabled ?? true;
  const ockhamEnabled = props.ockhamEnabled ?? swgState?.ockhamEnabled ?? true;
  const loading = props.loading || swgState?.loading || { pirsig: false, ockham: false };
  const onTogglePirsig = props.onTogglePirsig || ((enabled: boolean) => dispatch(togglePirsigRequest(enabled)));
  const onToggleOckham = props.onToggleOckham || ((enabled: boolean) => dispatch(toggleOckhamRequest(enabled)));
  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card h-full max-h-full min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col font-sans min-w-0 max-w-full">
      <div className="mb-3 pb-2 border-b border-border/60">
        <h2 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider m-0">
          Engine Interception Controls
        </h2>
      </div>

      <div className="space-y-3">
        {/* Pirsig DLP Toggle Card */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <div className="font-mono text-xs font-bold text-slate-200">PIRSIG DLP ENGINE</div>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">Deep content inspection & secret scrubbing.</p>
          </div>

          <button
            type="button"
            disabled={loading.pirsig}
            onClick={() => onTogglePirsig(!pirsigEnabled)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              pirsigEnabled ? 'bg-amber-500' : 'bg-slate-700'
            } ${loading.pirsig ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                pirsigEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Ockham Optimizer Toggle Card */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <div className="font-mono text-xs font-bold text-slate-200">OCKHAM PROMPT OPTIMIZER</div>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">Heuristic prompt compression & token reduction.</p>
          </div>

          <button
            type="button"
            disabled={loading.ockham}
            onClick={() => onToggleOckham(!ockhamEnabled)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              ockhamEnabled ? 'bg-cyan-500' : 'bg-slate-700'
            } ${loading.ockham ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                ockhamEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
