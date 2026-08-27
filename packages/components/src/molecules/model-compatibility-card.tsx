// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useTestId } from '../hooks/useTestId';
import { Button } from '../atoms/button';

export interface ModelCompatibilityCardProps {
  modelName: string;
  parameters?: string;
  quantization?: string;
  requiredVramGb: number;
  requiredRamGb: number;
  availableVramGb?: number;
  totalRamGb?: number;
  hasDedicatedGpu?: boolean;
  onLoad?: () => void;
  isLoading?: boolean;
  isLoaded?: boolean;
  extraContent?: React.ReactNode;
  dataTestId?: string;
  className?: string;
}

export function ModelCompatibilityCard({
  modelName,
  parameters = 'Unknown',
  quantization = 'Unknown',
  requiredVramGb,
  requiredRamGb,
  availableVramGb = 0,
  totalRamGb = 0,
  hasDedicatedGpu = false,
  onLoad,
  isLoading = false,
  isLoaded = false,
  extraContent,
  dataTestId,
  className = '',
}: ModelCompatibilityCardProps): React.ReactElement {
  const { rootId, getTestId } = useTestId('model-compatibility-card', dataTestId);

  // Fit calculations
  const fitsInVram = hasDedicatedGpu ? availableVramGb >= requiredVramGb : totalRamGb >= requiredRamGb;
  const fitsInSystemRam = totalRamGb >= requiredRamGb;

  let statusBorder = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
  let statusBadge = 'bg-emerald-900/40 text-emerald-400 border-emerald-700/40';
  let statusTitle = 'Fits in VRAM (Full Speed)';
  let statusDesc = 'This model runs entirely on local compute providing maximum throughput.';

  if (!fitsInVram && fitsInSystemRam) {
    statusBorder = 'border-amber-500/40 bg-amber-950/20 text-amber-300';
    statusBadge = 'bg-amber-900/40 text-amber-400 border-amber-700/40';
    statusTitle = 'Requires RAM Offloading (Slower)';
    statusDesc = `Model requires ${requiredVramGb.toFixed(1)} GB VRAM, but only ${availableVramGb.toFixed(1)} GB available. Execution will partially offload to system memory.`;
  } else if (!fitsInVram && !fitsInSystemRam) {
    statusBorder = 'border-rose-500/40 bg-rose-950/20 text-rose-300';
    statusBadge = 'bg-rose-900/40 text-rose-400 border-rose-700/40';
    statusTitle = 'Exceeds System Resources';
    statusDesc = `Model requires ${requiredRamGb.toFixed(1)} GB RAM, but system only has ${totalRamGb.toFixed(1)} GB available.`;
  }

  const canLoad = fitsInVram || fitsInSystemRam;

  return (
    <div
      data-testid={rootId}
      className={`p-4 border border-zinc-800 bg-[#121214] rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-card ${className}`}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-zinc-100 font-mono">{modelName}</h3>
          <span className="text-[10px] font-mono bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300">
            {requiredVramGb.toFixed(1)} GB VRAM
          </span>
        </div>
        <p className="text-xs text-zinc-400 mb-3">
          {parameters} | {quantization}
        </p>

        <div className={`border-l-2 p-2.5 rounded-r mb-3 text-xs ${statusBorder}`}>
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${statusBadge}`}>
              {fitsInVram ? 'VRAM TIER 1' : fitsInSystemRam ? 'RAM TIER 2' : 'UNSUPPORTED'}
            </span>
            <span>{statusTitle}</span>
          </div>
          <p className="opacity-80 text-[11px] leading-relaxed">{statusDesc}</p>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-zinc-800/60">
        {onLoad && (
          <Button
            data-testid={getTestId('load-button')}
            variant={canLoad ? 'primary' : 'secondary'}
            disabled={!canLoad || isLoading || isLoaded}
            onClick={onLoad}
            className="w-full text-xs font-mono"
          >
            {isLoaded ? 'Loaded' : isLoading ? 'Loading...' : canLoad ? 'Load Model' : 'Cannot Load'}
          </Button>
        )}
        {extraContent}
      </div>
    </div>
  );
}
