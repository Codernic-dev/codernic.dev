// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { Activity, ShieldCheck, Zap, Server } from 'lucide-react';

interface MetricsOverviewProps {
  totalRequests?: number;
  pirsigBlocked?: number;
  tokensSavedTotal?: number;
  status?: string;
  pirsigEnabled?: boolean;
  ockhamEnabled?: boolean;
}

export function MetricsOverview(props: MetricsOverviewProps): React.ReactElement {
  const swgState = useSelector((state: RootState) => state.swg);

  const totalRequests = props.totalRequests ?? swgState?.totalRequests ?? 0;
  const pirsigBlocked = props.pirsigBlocked ?? swgState?.pirsigBlocked ?? 0;
  const tokensSavedTotal = props.tokensSavedTotal ?? swgState?.tokensSavedTotal ?? 0;
  const status = props.status ?? swgState?.status ?? 'online';
  const pirsigEnabled = props.pirsigEnabled ?? swgState?.pirsigEnabled ?? true;
  const ockhamEnabled = props.ockhamEnabled ?? swgState?.ockhamEnabled ?? true;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num || 0);
  };

  const cards = [
    {
      title: 'TOTAL MONITORED REQUESTS',
      value: formatNumber(totalRequests),
      subtext: 'Live proxy traffic inspected',
      icon: Activity,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'PIRSIG DLP BLOCKED',
      value: formatNumber(pirsigBlocked),
      subtext: pirsigEnabled ? 'DLP Engine active & filtering' : 'DLP Engine paused',
      icon: ShieldCheck,
      color: pirsigBlocked > 0 ? 'text-rose-400' : 'text-emerald-400',
      bgColor: pirsigBlocked > 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10',
      borderColor: pirsigBlocked > 0 ? 'border-rose-500/20' : 'border-emerald-500/20',
    },
    {
      title: 'TOKENS SAVED TOTAL',
      value: formatNumber(tokensSavedTotal),
      subtext: ockhamEnabled ? 'Ockham optimizer compressing' : 'Ockham optimizer paused',
      icon: Zap,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      title: 'GATEWAY STATUS',
      value: (status || 'ONLINE').toUpperCase(),
      subtext: `Pirsig: ${pirsigEnabled ? 'ON' : 'OFF'} • Ockham: ${ockhamEnabled ? 'ON' : 'OFF'}`,
      icon: Server,
      color: status === 'online' ? 'text-emerald-400' : 'text-rose-400',
      bgColor: status === 'online' ? 'bg-emerald-500/10' : 'bg-rose-500/10',
      borderColor: status === 'online' ? 'border-emerald-500/20' : 'border-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-panel rounded-lg border border-border h-full max-h-full min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar font-sans min-w-0 max-w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-surface border ${card.borderColor} rounded-lg p-3.5 shadow-card transition-all duration-200 hover:border-amber-500/40 relative overflow-hidden flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase truncate">
                {card.title}
              </span>
              <div className={`p-1.5 rounded ${card.bgColor} ${card.color} shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-slate-100 tracking-tight">
              {card.value}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans truncate">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
