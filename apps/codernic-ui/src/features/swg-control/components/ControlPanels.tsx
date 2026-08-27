// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { InterceptionModeSelector } from './InterceptionModeSelector';
import { AccreditationManager } from './AccreditationManager';
import { LockdownControls } from './LockdownControls';

export interface ControlPanelsProps {
  pirsigEnabled: boolean;
  ockhamEnabled: boolean;
  panicMode: boolean;
  loading: {
    pirsig: boolean;
    ockham: boolean;
    panic: boolean;
    reset: boolean;
  };
  onTogglePirsig: (enabled: boolean) => void;
  onToggleOckham: (enabled: boolean) => void;
  onTogglePanic: (enabled: boolean) => void;
  onResetConnections: () => void;
}

export function ControlPanels({
  pirsigEnabled,
  ockhamEnabled,
  panicMode,
  loading,
  onTogglePirsig,
  onToggleOckham,
  onTogglePanic,
  onResetConnections,
}: ControlPanelsProps): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Engine Interception Controls */}
      <div className="bg-panel border border-border rounded-lg p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
          <Shield className="w-4 h-4 text-amber-500" />
          <h2 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider">
            Engine Interception Controls
          </h2>
        </div>

        <div className="space-y-3">
          {/* Pirsig DLP Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-border/80 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    PIRSIG DLP ENGINE
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      pirsigEnabled
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {pirsigEnabled ? 'ACTIVE' : 'BYPASSED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Deep content inspection, secret scrubbing, and PII anonymization.
                </p>
              </div>
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

          {/* Ockham Optimizer Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-border/80 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    OCKHAM PROMPT OPTIMIZER
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      ockhamEnabled
                        ? 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {ockhamEnabled ? 'ACTIVE' : 'BYPASSED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dynamic heuristic prompt compression and token reduction.
                </p>
              </div>
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

      {/* Discrete Lockdown & Maintenance Controls */}
      <LockdownControls
        panicMode={panicMode}
        loading={{ panic: loading.panic, reset: loading.reset }}
        onTogglePanic={onTogglePanic}
        onResetConnections={onResetConnections}
      />

      {/* Live Interception Mode Switcher */}
      <InterceptionModeSelector />

      {/* Live Application Accreditation Manager */}
      <AccreditationManager />
    </div>
  );
}
