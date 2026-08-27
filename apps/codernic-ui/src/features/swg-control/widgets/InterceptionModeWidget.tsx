// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { fetchInterceptionModeRequest, setInterceptionModeRequest } from '../model/swg-slice';
import { CheckCircle } from 'lucide-react';

export function InterceptionModeWidget(): React.ReactElement {
  const dispatch = useDispatch();
  const swgState = useSelector((state: RootState) => state.swg);
  const activeMode = swgState?.interceptionMode || 'manual';
  const switching = swgState?.loading?.interceptionMode || false;

  useEffect(() => {
    dispatch(fetchInterceptionModeRequest());
  }, [dispatch]);

  const modes = [
    { id: 'transparent', label: 'Transparent Kernel', desc: 'iptables / PF redirection' },
    { id: 'system_proxy', label: 'OS System Proxy', desc: 'GNOME / WinINet settings' },
    { id: 'pac_wpad', label: 'WPAD / PAC Script', desc: 'http://127.0.0.1:9090/wpad.dat' },
    { id: 'manual', label: 'Manual Client Only', desc: 'HTTP_PROXY=127.0.0.1:8080' },
  ];

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card h-full max-h-full min-h-0 overflow-y-auto custom-scrollbar flex flex-col font-sans">
      {/* Single-column / 2-column Card Grid for side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 min-w-0 max-w-full overflow-hidden">
        {modes.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              disabled={switching}
              onClick={() => dispatch(setInterceptionModeRequest(m.id))}
              className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between min-w-0 max-w-full overflow-hidden ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/60 shadow-xs'
                  : 'bg-surface border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[11px] font-bold text-slate-200 truncate">{m.label}</span>
                {isActive && <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 m-0 truncate">{m.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
