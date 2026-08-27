// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { IntrospectionPanel } from '../../../widgets/right-panel/ui/IntrospectionPanel';
import { useTestId } from '@codernic/components';

export function IntrospectionWidget({ dataTestId }: { dataTestId?: string }) {
  
  const { rootId, getTestId } = useTestId('introspection-widget', dataTestId);
return (
    <div data-testid={getTestId('root')} className="w-full h-full bg-zinc-950 overflow-hidden">
      <IntrospectionPanel data-testid={getTestId('introspection-panel')} />
    </div>
  );
}
