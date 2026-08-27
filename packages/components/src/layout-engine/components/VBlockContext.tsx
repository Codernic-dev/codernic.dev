// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createContext, useContext } from 'react';
import type { VBlockBehavior } from '../types';

export interface VBlockContextType {
  behavior: VBlockBehavior;
  isExpanded: boolean;
  allowFullScreen?: boolean;
  hideFrame?: boolean;
  isFullscreenOpen?: boolean;
  headerPortalRef?: React.RefObject<HTMLDivElement | null>;
  toggleExpand: () => void;
  toggleFullScreen?: () => void;
  setExpanded: (expanded: boolean) => void;
}

export const VBlockContext = createContext<VBlockContextType | null>(null);

export function useVBlockContext() {
  const context = useContext(VBlockContext);
  if (!context) {
    return {
      behavior: 'none' as VBlockBehavior,
      isExpanded: true,
      toggleExpand: () => {},
      setExpanded: () => {}
    };
  }
  return context;
}
