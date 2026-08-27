// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React from 'react';
import { StatusChipBase } from './StatusChipBase';
import { IsisMetricBar, useTestId } from '@codernic/components';

export interface ResourceStatusChipProps {
  cpuStr: string;
  ramStr: string;
  vramStr: string;
  dataTestId?: string;
}

export function ResourceStatusChip({ dataTestId, cpuStr, ramStr, vramStr }: ResourceStatusChipProps) {
  const { getTestId } = useTestId('resource-status-chip', dataTestId);

  const parseVal = (str: string): number => {
    const val = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : val;
  };

  const vramVal = parseVal(vramStr);

  return (
    <StatusChipBase data-testid={getTestId('status-chip-base')} title={`Telemetry - CPU: ${cpuStr} | RAM: ${ramStr} | VRAM: ${vramStr}`}>
      <div className="flex items-center gap-1">
        <span className="opacity-50">CPU</span>
        <span className="text-[var(--text-primary)] font-semibold">{cpuStr}</span>
        <span className="mx-0.5 opacity-20">|</span>
        <span className="opacity-50">RAM</span>
        <span className="text-[var(--text-primary)] font-semibold">{ramStr}</span>
        <span className="mx-0.5 opacity-20">|</span>
        <IsisMetricBar
          label="VRAM"
          current={vramVal}
          max={24}
          unit="GB"
        />
      </div>
    </StatusChipBase>
  );
}
