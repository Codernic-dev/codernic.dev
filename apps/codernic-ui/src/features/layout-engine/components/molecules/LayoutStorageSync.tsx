// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect } from 'react';
import { useLayoutEngine } from '@codernic/components/layout-engine';

export function LayoutStorageSync({ activeLayoutName }: { activeLayoutName: string | null }) {
  const { state } = useLayoutEngine();

  useEffect(() => {
    if (activeLayoutName && state.blocks) {
      localStorage.setItem(`codernic_layout_${activeLayoutName}`, JSON.stringify(state.blocks));
    }
  }, [state.blocks, activeLayoutName]);

  return null;
}
