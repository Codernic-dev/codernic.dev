// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React from 'react';
import { Activity, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'error' | 'panic' | 'connected' | 'connecting' | 'disconnected';
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps): React.ReactElement {
  const getStyles = () => {
    switch (status) {
      case 'online':
      case 'connected':
        return {
          bg: 'bg-emerald-950/60',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          dot: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
          icon: CheckCircle2,
          defaultLabel: status === 'connected' ? 'SSE STREAM ACTIVE' : 'ONLINE',
        };
      case 'panic':
        return {
          bg: 'bg-rose-950/80',
          border: 'border-rose-500/50',
          text: 'text-rose-400',
          dot: 'bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse',
          icon: ShieldAlert,
          defaultLabel: 'PANIC LOCKDOWN',
        };
      case 'connecting':
        return {
          bg: 'bg-amber-950/60',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          dot: 'bg-amber-500 animate-ping',
          icon: Activity,
          defaultLabel: 'CONNECTING',
        };
      case 'offline':
      case 'disconnected':
      case 'error':
      default:
        return {
          bg: 'bg-slate-900',
          border: 'border-slate-700/50',
          text: 'text-slate-400',
          dot: 'bg-slate-500',
          icon: XCircle,
          defaultLabel: 'OFFLINE',
        };
    }
  };

  const current = getStyles();
  const Icon = current.icon;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-mono font-medium';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${current.bg} ${current.border} ${current.text} ${padding} transition-all duration-200`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span className="tracking-wider uppercase font-semibold">{label || current.defaultLabel}</span>
    </span>
  );
};
