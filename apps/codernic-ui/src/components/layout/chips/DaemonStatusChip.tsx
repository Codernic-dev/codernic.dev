// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React from 'react';
import { IsisHealthBadge, useTestId } from '@codernic/components';

export interface DaemonStatusChipProps {
  daemonOk?: boolean;
  daemonStatus: string;
  sandboxMode?: boolean;
  dataTestId?: string;
}

export function DaemonStatusChip({ dataTestId, daemonStatus, sandboxMode }: DaemonStatusChipProps) {
  const { getTestId } = useTestId('daemon-status-chip', dataTestId);

  let status: 'online' | 'degraded' | 'offline' = 'degraded';
  let label = 'Daemon';

  if (sandboxMode) {
    status = 'online';
    label = 'SandBox';
  } else if (daemonStatus === 'running' || daemonStatus === 'connected') {
    status = 'online';
    label = 'Daemon';
  } else if (daemonStatus === 'stopped' || daemonStatus === 'disconnected') {
    status = 'offline';
    label = 'Offline';
  } else {
    status = 'degraded';
    label = daemonStatus.toUpperCase();
  }

  return (
    <div data-testid={getTestId('root')}>
      <IsisHealthBadge status={status} label={label} />
    </div>
  );
}
