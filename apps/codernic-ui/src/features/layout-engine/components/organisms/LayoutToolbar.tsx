// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';

export function LayoutToolbar({ activeLayoutName }: { activeLayoutName: string | null }) {
  return (
    <div className="flex items-center gap-2 w-full p-1.5 bg-zinc-950/50 border-b border-zinc-800/50 rounded shadow-sm text-zinc-500 text-[10px] tracking-wider uppercase font-mono">
      <span className="opacity-30">/</span>
      <span className="text-amber-500/80">{activeLayoutName || 'Layout Engine'}</span>
    </div>
  );
}
