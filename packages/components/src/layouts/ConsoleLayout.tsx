// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useRef } from 'react';
import { TerminalWidget, TerminalRef } from '../atoms/terminal/TerminalWidget';

export interface ConsoleLayoutProps {
  provider?: string;
  model?: string;
  authTier?: string;
  onData?: (data: string) => void;
  className?: string;
}

export const ConsoleLayout = ({
  provider = 'Google Antigravity SDK',
  model = 'antigravity-gemini-ultra-agent',
  authTier = 'Tier 1 (Transparent AGY Socket)',
  onData,
  className = '',
}: ConsoleLayoutProps): React.JSX.Element => {
  const terminalRef = useRef<TerminalRef>(null);

  return (
    <div className={`flex flex-col w-full h-screen bg-zinc-950 text-zinc-200 font-mono ${className}`}>
      {/* Header Bar Pinned Status - Zero Emoji */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs select-none">
        <div className="flex items-center space-x-4">
          <span className="text-emerald-400 font-bold">[ONLINE]</span>
          <span>
            Provider: <strong className="text-cyan-400">{provider}</strong>
          </span>
          <span>
            Model: <strong className="text-cyan-400">{model}</strong>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-amber-400">Auth: {authTier}</span>
        </div>
      </div>

      {/* Terminal Container */}
      <div className="flex-1 w-full h-full p-2 bg-zinc-950">
        <TerminalWidget
          ref={terminalRef}
          onData={(data) => {
            if (onData) {
              onData(data);
            }
          }}
        />
      </div>

      {/* Bottom Hotkeys Bar - Zero Emoji */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-400 select-none">
        <span>F1:Provider</span>
        <span>F2:Model</span>
        <span>F3:Mode</span>
        <span>F4:ModelHub</span>
        <span>F5:Auth</span>
        <span>Ctrl+B:Brainstorm</span>
        <span>Ctrl+P:Plan</span>
        <span>Ctrl+E:Execute</span>
      </div>
    </div>
  );
};
