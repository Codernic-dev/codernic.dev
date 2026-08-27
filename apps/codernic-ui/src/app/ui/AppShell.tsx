// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { ToastsContainer } from '../../features/notifications/components/toasts-container';
import { GlobalLoader } from './GlobalLoader';
import { LayoutEngine } from '../../features/layout-engine/components/templates/LayoutEngine';
import { StatusBarFooter } from '../../components/layout/StatusBarFooter';
import { Banner } from '@codernic/components';
import { GlobalModalsHost } from './GlobalModalsHost';

export interface AppShellProps {
  helpModalInfo: {
    isOpen: boolean;
    widgetName?: string;
    docUrl?: string;
  };
  onCloseHelpModal: () => void;
}

export function AppShell({ helpModalInfo, onCloseHelpModal }: AppShellProps): JSX.Element {
  return (
    <div data-testid="system-root" className="flex flex-col h-full w-full bg-black overflow-hidden relative">
      <ToastsContainer />
      <GlobalLoader />

      {/* Tablet Viewport Warning Banner */}
      <Banner
        id="tablet-viewport"
        message="Codernic is optimized for larger viewports. Mobile layouts are coming soon."
        type="warning"
        className="hidden md:flex lg:hidden z-[9999]"
      />

      {/* Main Layout Engine */}
      <main className="flex-1 min-h-0 w-full flex flex-col relative z-0">
        <LayoutEngine />
      </main>

      {/* Global Modals */}
      <GlobalModalsHost
        helpModalInfo={helpModalInfo}
        onCloseHelpModal={onCloseHelpModal}
      />

      {/* Footer */}
      <div className="relative z-[9999] flex-shrink-0">
        <StatusBarFooter />
      </div>

      {/* Mobile Viewport Overlay Disclaimer */}
      <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-6 text-center md:hidden">
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 animate-pulse">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-zinc-100 tracking-tight">Desktop-Only Optimization</h1>
        <p className="text-zinc-400 max-w-xs mb-8 text-sm leading-relaxed">
          Codernic is currently optimized for desktop viewports. Mobile and tablet workflows are under active development!
        </p>
        <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
          Codernic Workspace
        </div>
      </div>
    </div>
  );
}
