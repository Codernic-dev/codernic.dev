// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { Lock, Unlock, RefreshCw } from 'lucide-react';

export interface LockdownControlsProps {
  panicMode: boolean;
  loading: {
    panic: boolean;
    reset: boolean;
  };
  onTogglePanic: (enabled: boolean) => void;
  onResetConnections: () => void;
}

export function LockdownControls({
  panicMode,
  loading,
  onTogglePanic,
  onResetConnections,
}: LockdownControlsProps): React.ReactElement {
  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
        <Lock className="w-4 h-4 text-rose-400" />
        <h2 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider">
          Lockdown & Connection Flush
        </h2>
      </div>

      <div className="space-y-3">
        {/* Compact Lockdown Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border transition-all">
          <div className="flex items-start gap-2.5">
            <div
              className={`p-1.5 rounded mt-0.5 ${
                panicMode ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {panicMode ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-200">LOCKDOWN MODE</span>
                {panicMode && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Drop incoming TCP/UDP connections on gateway ports.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading.panic}
            onClick={() => onTogglePanic(!panicMode)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              panicMode ? 'bg-rose-600' : 'bg-slate-700'
            } ${loading.panic ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                panicMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Flush Active Sockets */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <span className="font-mono text-xs font-bold text-slate-200">FLUSH SOCKET POOL</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Reset proxy pool connections.</p>
          </div>

          <button
            type="button"
            disabled={loading.reset}
            onClick={onResetConnections}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] font-mono tracking-wider uppercase transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-3 h-3 ${loading.reset ? 'animate-spin' : ''}`} />
            <span>{loading.reset ? 'FLUSHING...' : 'FLUSH'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
