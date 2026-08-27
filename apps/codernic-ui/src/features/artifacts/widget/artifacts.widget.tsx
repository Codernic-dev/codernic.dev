// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { ArtifactsPanel } from '../../../widgets/right-panel/ui/ArtifactsPanel';
import { useSelector } from 'react-redux';
import { selectCurrentSessionId } from '../../../features/sessions/store/sessions.slice';
import { ErrorBoundary } from '../../../app/ErrorBoundary';
import { useTestId } from '@codernic/components';

export function ArtifactsWidget({ dataTestId, id }: { id?: string; dataTestId?: string; }) {
  
  const { rootId, getTestId } = useTestId('artifacts-widget', dataTestId);
const currentSessionId = useSelector(selectCurrentSessionId);
  return (
    <ErrorBoundary data-testid={getTestId('error-boundary')}>
      <div data-testid={getTestId('root')} className="w-full h-full bg-zinc-950 overflow-hidden">
        <div data-testid="artifacts-panel" className="w-full h-full">
          <ArtifactsPanel sessionId={currentSessionId} widgetId={id} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
