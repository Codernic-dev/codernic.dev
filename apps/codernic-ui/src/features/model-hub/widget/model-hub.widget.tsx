// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { ModelHubPanel } from '../../../features/models/components/organisms/ModelHubPanel';
import { useTestId } from '@codernic/components';

export function ModelHubWidget({ dataTestId }: { dataTestId?: string }) {
  
  const { rootId, getTestId } = useTestId('model-hub-widget', dataTestId);
return (
    <div data-testid={getTestId('root')} className="w-full h-full bg-[#09090b] flex flex-col overflow-hidden p-3">
      <ModelHubPanel data-testid={getTestId('model-hub-panel')} />
    </div>
  );
}
