// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { Shield, RefreshCw, Menu, AlertCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface HeaderProps {
  status: 'online' | 'offline' | 'error';
  sseStatus: 'connected' | 'connecting' | 'disconnected';
  panicMode: boolean;
  lastUpdated: string | null;
  isLoading: boolean;
  hasError?: boolean;
  drawerOpen?: boolean;
  onToggleDrawer?: () => void;
  onRefresh: () => void;
}

export function Header({
  status,
  sseStatus,
  panicMode,
  lastUpdated,
  isLoading,
  hasError = false,
  drawerOpen,
  onToggleDrawer,
  onRefresh,
}: HeaderProps): React.ReactElement {
  const effectiveStatus = hasError ? 'error' : status;

  return (
    <header className="bg-panel border-b border-border/80 px-4 sm:px-6 py-3 mb-6 shadow-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Burger Menu & Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDrawer}
            className={`p-2 rounded-lg border transition-all flex items-center justify-center font-mono text-xs ${
              drawerOpen
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-surface hover:bg-slate-800 border-border text-slate-300'
            }`}
            title="Toggle Control Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-500 shadow-amber flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2 m-0">
                CODERNIC SWG
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border/60 text-slate-400">
                v2.4.0-ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5 m-0">
              Secure Web Gateway &bull; Control Plane & Live Telemetry Engine
            </p>
          </div>
        </div>

        {/* Right: Status Indicators & Sync */}
        <div className="flex flex-wrap items-center gap-3">
          {hasError && (
            <span className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> API Gateway Error
            </span>
          )}

          {panicMode ? (
            <StatusBadge status="panic" label="LOCKDOWN" />
          ) : (
            <StatusBadge status={effectiveStatus} />
          )}

          <StatusBadge status={sseStatus} />

          <div className="h-6 w-px bg-border hidden sm:block" />

          {lastUpdated && (
            <span className="text-[11px] font-mono text-slate-500 hidden lg:inline">
              Updated: {lastUpdated}
            </span>
          )}

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface hover:bg-slate-800 border border-border hover:border-amber-500/40 text-xs font-mono font-medium text-slate-300 transition-all duration-200 disabled:opacity-50"
            title="Refresh System Status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-500' : ''}`} />
            <span>SYNC</span>
          </button>
        </div>
      </div>
    </header>
  );
}
