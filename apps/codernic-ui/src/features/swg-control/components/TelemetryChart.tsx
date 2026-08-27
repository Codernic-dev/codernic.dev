// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { Activity, Radio } from 'lucide-react';
import { TelemetryEvent } from '../api/swg-api';

interface TelemetryChartProps {
  events?: TelemetryEvent[];
}

export function TelemetryChart(props: TelemetryChartProps): React.ReactElement {
  const swgEvents = useSelector((state: RootState) => state.swg?.telemetryEvents || []);
  const events = props.events || swgEvents;

  // Aggregate event counts in 16 time slices
  const eventSlices = React.useMemo(() => {
    const slices = new Array(16).fill(0);
    if (!events.length) return slices;

    events.forEach((_, idx) => {
      const targetIndex = idx % 16;
      slices[targetIndex] += 1;
    });

    return slices;
  }, [events]);

  const maxVal = Math.max(...eventSlices, 1);

  return (
    <div className="bg-panel border border-border rounded-xl p-4 shadow-card h-full max-h-full min-h-0 flex flex-col justify-between overflow-hidden font-sans">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
          <h3 className="font-heading text-sm font-bold text-slate-200 uppercase tracking-wider">
            LIVE TELEMETRY STREAM ACTIVITY
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          BUFFER: {events.length} EVENTS
        </span>
      </div>

      <div className="h-28 flex items-end gap-1.5 pt-4 pb-2 px-2 bg-surface rounded-lg border border-border/60">
        {eventSlices.map((count, idx) => {
          const heightPercent = Math.max((count / maxVal) * 100, 8);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t transition-all duration-300 ${
                  count > 5
                    ? 'bg-amber-500 group-hover:bg-amber-400'
                    : count > 0
                    ? 'bg-amber-500/60 group-hover:bg-amber-500'
                    : 'bg-slate-800'
                }`}
              />
              <span className="text-[9px] font-mono text-slate-500">
                T-{16 - idx}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
