// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SequencerProvider,
  SequencerOverlay,
  architectureTourConfig,
  exhaustiveDebugDemoSequence,
} from '@codernic/components';

export interface GlobalSequencerHostProps {
  children: React.ReactNode;
}

export function GlobalSequencerHost({ children }: GlobalSequencerHostProps): JSX.Element {
  const dispatch = useDispatch();

  const isExhaustiveDemo =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('demo') === 'exhaustive';

  const config = isExhaustiveDemo ? exhaustiveDebugDemoSequence : architectureTourConfig;

  return (
    <SequencerProvider config={config} onDispatch={dispatch}>
      {children}
      <SequencerOverlay />
    </SequencerProvider>
  );
}
