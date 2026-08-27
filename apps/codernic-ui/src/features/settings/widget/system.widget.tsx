// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { SystemTab } from '../../../features/settings/ui/system-tab';
import { useTestId } from '@codernic/components';

export function SystemWidget({ dataTestId }: { dataTestId?: string }) {
  const { rootId, getTestId } = useTestId('system-widget', dataTestId);
return (
    <div data-testid={getTestId('root')} className="w-full h-full bg-[#09090b] overflow-y-auto">
      <SystemTab data-testid={getTestId('system-tab')} />
    </div>
  );
}
