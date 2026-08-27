// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { X, SlidersHorizontal, Shield } from 'lucide-react';
import { ControlPanels } from './ControlPanels';

interface ControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pirsigEnabled: boolean;
  ockhamEnabled: boolean;
  panicMode: boolean;
  loading: {
    pirsig: boolean;
    ockham: boolean;
    panic: boolean;
    reset: boolean;
  };
  onTogglePirsig: (enabled: boolean) => void;
  onToggleOckham: (enabled: boolean) => void;
  onTogglePanic: (enabled: boolean) => void;
  onResetConnections: () => void;
}

export function ControlDrawer({
  isOpen,
  onClose,
  pirsigEnabled,
  ockhamEnabled,
  panicMode,
  loading,
  onTogglePirsig,
  onToggleOckham,
  onTogglePanic,
  onResetConnections,
}: ControlDrawerProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark Overlay Background */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Left Sliding Collapsible Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#121212] border-r border-border shadow-2xl h-full flex flex-col z-10 font-sans overflow-hidden">
        {/* Drawer Header */}
        <div className="px-4 py-3 bg-panel border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <h2 className="font-mono text-xs font-bold text-slate-100 uppercase tracking-wider m-0">
              Gateway Control & Accreditations
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body Scroll Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <ControlPanels
            pirsigEnabled={pirsigEnabled}
            ockhamEnabled={ockhamEnabled}
            panicMode={panicMode}
            loading={loading}
            onTogglePirsig={onTogglePirsig}
            onToggleOckham={onToggleOckham}
            onTogglePanic={onTogglePanic}
            onResetConnections={onResetConnections}
          />
        </div>

        {/* Drawer Footer */}
        <div className="px-4 py-2.5 bg-panel border-t border-border text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>CODERNIC SECURE WEB GATEWAY</span>
          <span className="text-emerald-400 flex items-center gap-1 font-bold">
            <Shield className="w-3 h-3" /> ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
