// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { setInterceptionModeRequest } from '../model/swg-slice';
import { selectEngineConfig } from '../../system/store/system.slice';
import { Network, CheckCircle } from 'lucide-react';

export function InterceptionModeSelector(): React.ReactElement {
  const dispatch = useDispatch();
  const activeMode = useSelector((state: RootState) => state.swg.interceptionMode);
  const switching = useSelector((state: RootState) => state.swg.loading.interceptionMode);
  const message = useSelector((state: RootState) => state.swg.error);
  const engineConfig = useSelector(selectEngineConfig);

  const swgPort = engineConfig?.network?.swg_port || 9090;

  const handleModeSwitch = (mode: string) => {
    dispatch(setInterceptionModeRequest(mode));
  };

  const modes = [
    { id: 'transparent', label: 'Transparent Kernel', desc: 'iptables / PF packet redirection' },
    { id: 'system_proxy', label: 'OS System Proxy', desc: 'GNOME / WinINet environment settings' },
    { id: 'pac_wpad', label: 'WPAD / PAC Script', desc: `Auto-config via port ${swgPort}/wpad.dat` },
    { id: 'manual', label: 'Manual Client Only', desc: `HTTP_PROXY on port ${swgPort}` },
  ];

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-amber-500" />
          <h2 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider">
            Interception Mode
          </h2>
        </div>
        {message && (
          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
            {message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {modes.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              disabled={switching}
              onClick={() => handleModeSwitch(m.id)}
              className={`text-left p-3 rounded-lg border transition-all relative ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                  : 'bg-surface border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-slate-200">{m.label}</span>
                {isActive && <CheckCircle className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{m.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
