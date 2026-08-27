// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { ErathosCanvas } from '../../../widgets/dag-pipeline/ui/ErathosCanvas';
import { ErrorBoundary } from '../../../app/ErrorBoundary';
import { useTestId } from '@codernic/components';

export function ErathosWidget({ dataTestId, id }: { id?: string; dataTestId?: string; }) {
  
  const { rootId, getTestId } = useTestId('erathos-widget', dataTestId);
return (
    <ErrorBoundary data-testid={getTestId('error-boundary')}>
      <div data-testid={getTestId('root')} className="w-full h-full bg-zinc-950 overflow-hidden">
        <div data-testid="erathos-preview-container" className="w-full h-full">
          <ErathosCanvas data-testid={getTestId('canvas')} id={id} hideHeader={true} readOnly={false} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
