// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { selectGlobalStatus } from '../../../entities/telemetry/model/telemetry-slice';
import { selectPirsigMetrics } from '../../../features/dag/store/dag.slice';
import { selectEngineConfig } from '../../../features/system/store/system.slice';
import { initSwgConfigRequest } from '../../../features/swg-control/model/swg-slice';
import { Card, MetricCard, Banner } from '@codernic/components';

export interface ShieldProxyWidgetProps {
  className?: string;
}

export function ShieldProxyWidget({ className = '' }: ShieldProxyWidgetProps): JSX.Element {
  const dispatch = useDispatch();
  const globalStatus = useSelector(selectGlobalStatus);
  const pirsig = useSelector(selectPirsigMetrics);
  const swg = useSelector((state: RootState) => state.swg);
  const engineConfig = useSelector(selectEngineConfig);

  const swgPort = engineConfig?.network?.swg_port || 9090;

  useEffect(() => {
    dispatch(initSwgConfigRequest());
  }, [dispatch]);

  const isOnline = swg.status === 'online' || globalStatus === 'ok';

  return (
    <div className={`p-5 bg-zinc-950 text-zinc-100 flex flex-col gap-5 h-full overflow-y-auto ${className}`}>
      <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
        <div>
          <h2 className="text-base font-bold font-mono text-zinc-100 flex items-center gap-2">
            <span>🛡️</span>
            <span>Codernic Shield (Pirsig Proxy & SWG Gateway)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time deep content inspection, DLP filtering, and token economics.
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
            isOnline
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}
        >
          {isOnline ? `GATEWAY ACTIVE (PORT ${swgPort})` : 'OFFLINE'}
        </span>
      </div>

      {/* Real-time Telemetry Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          title="TOTAL INTERCEPTIONS"
          value={swg.totalRequests.toLocaleString()}
          color="blue"
        />
        <MetricCard
          title="TOKENS SAVED"
          value={swg.tokensSavedTotal > 0 ? `+${swg.tokensSavedTotal.toLocaleString()}` : '0'}
          color="emerald"
        />
        <MetricCard
          title="BLOCKED REQUESTS"
          value={swg.pirsigBlocked.toLocaleString()}
          color="red"
        />
      </div>

      {pirsig ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 border-zinc-800 bg-[#121214]">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 font-mono">
              Pirsig Compliance Analysis
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-zinc-400">Score KPI:</span>
              <span
                className={`text-sm font-bold font-mono ${
                  pirsig.kpi_score > 80
                    ? 'text-emerald-400'
                    : pirsig.kpi_score > 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {pirsig.kpi_score}/100
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Symbols Processed: {pirsig.symbols_count}
            </p>
          </Card>

          <Card className="p-4 border-zinc-800 bg-[#121214]">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 font-mono">
              Architectural Quality Flags
            </h3>
            {pirsig.qualitative_flags && pirsig.qualitative_flags.length > 0 ? (
              <ul className="space-y-1 text-xs text-amber-300 font-mono">
                {pirsig.qualitative_flags.map((flag: string, index: number) => (
                  <li key={index}>• {flag}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-400 font-mono">
                ✓ No violations detected. Architecture complies with sovereign standards.
              </p>
            )}
          </Card>
        </div>
      ) : (
        <Banner
          variant="info"
          title="Pirsig Shield Active"
          description={`Air-Gapped Local DLP Forward Proxy operational on port ${swgPort}. All network boundaries inspected.`}
        />
      )}
    </div>
  );
}
