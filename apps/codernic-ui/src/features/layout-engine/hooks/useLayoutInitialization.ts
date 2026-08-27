// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useMemo, useEffect } from 'react';
import type { BlockState } from '@codernic/components/layout-engine';
import { DEFAULT_LAYOUTS } from '../model/default-layouts';

export function useLayoutInitialization(
  activeLayoutName: string | null,
  savedLayouts: Record<string, Record<string, BlockState>>
) {
  // Force layout reset in development to prevent caching issues during active UI changes
  useEffect(() => {
    if (import.meta.env.DEV) {
      [
        'Coder',
        'Architect',
        'Settings',
        'Integrator',
        'Analyst',
        'Zen',
        'Admin',
        'EnterpriseChatbot',
      ].forEach((layout) => {
        localStorage.removeItem(`codernic_layout_${layout}`);
      });
    }
  }, []);

  const initialBlocks = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const forceDefault = params.get('forceDefault') === 'true';

    const baseBlocks =
      !forceDefault && activeLayoutName && savedLayouts[activeLayoutName]
        ? savedLayouts[activeLayoutName]
        : DEFAULT_LAYOUTS[activeLayoutName || 'Coder'] || DEFAULT_LAYOUTS['Coder'];

    let blocks = baseBlocks;
    try {
      const cached =
        !forceDefault && activeLayoutName
          ? localStorage.getItem(`codernic_layout_${activeLayoutName}`)
          : null;
      if (cached) {
        blocks = JSON.parse(cached);
      }
    } catch (e) {
      console.error('Failed to parse cached layout', e);
    }

    // SCHEMA CHECK: Ensure essential properties exist for Coder layout
    if (activeLayoutName === 'Coder' && !blocks['artifacts-w']) {
      console.warn(
        'Cache schema invalid for Coder layout (missing artifacts-w). Resetting to defaults.',
      );
      localStorage.removeItem(`codernic_layout_Coder`);
      blocks = DEFAULT_LAYOUTS['Coder'];
    }

    return blocks;
  }, [activeLayoutName, savedLayouts]);

  return { initialBlocks };
}
