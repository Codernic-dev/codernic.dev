// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { createPortal } from 'react-dom';

export function FullScreenPortalOverlay({ children }: { children: React.ReactNode }) {
  const portalRoot = document.getElementById('fullscreen-portal-root') || document.body;

  return createPortal(
    <div 
      className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {children}
    </div>,
    portalRoot
  );
}
