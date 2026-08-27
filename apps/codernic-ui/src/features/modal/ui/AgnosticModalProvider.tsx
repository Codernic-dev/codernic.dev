// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { selectAppVersion, selectLicenseModules } from '../../system/store/system.slice';
import logoUrl from '../../../assets/ai-agencee-logo-dark.svg';

export function AgnosticModalProvider() {
  const modalState = useSelector((state: RootState) => state.modal);
  const appVersion = useSelector(selectAppVersion);
  const licenseModules = useSelector(selectLicenseModules);
  const [inputValue, setInputValue] = useState('');

  // Reset input value when a new prompt opens
  React.useEffect(() => {
    if (modalState.config?.type === 'prompt') {
      setInputValue('');
    }
  }, [modalState.config?.type]);

  if (!modalState.isOpen || !modalState.config) {
    return null;
  }

  const { config, deferred } = modalState;

  const handleResolve = (result: any) => {
    if (deferred?.resolve) {
      deferred.resolve(result);
    }
  };

  const handleCancel = () => {
    if (deferred?.resolve) {
      deferred.resolve(false);
    }
  };

  if (config.type === 'spinner') {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
        <div className="flex flex-col items-center">
          <img 
            src={logoUrl} 
            alt="Codernic Loading" 
            className="w-24 h-24 animate-pulse"
            style={{ filter: 'drop-shadow(0 0 15px theme("colors.codernic.amber.500"))' }}
          />
          {config.title && (
            <div className="mt-4 text-white text-lg font-medium">{config.title}</div>
          )}
          <div className="mt-4 flex space-x-1 items-center">
            <div className="w-2 h-2 rounded-full bg-codernic-amber-500 animate-[bounce_1s_infinite_-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-codernic-amber-500 animate-[bounce_1s_infinite_-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-codernic-amber-500 animate-[bounce_1s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (config.type === 'splash') {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-500">
        <div className="relative flex flex-col items-center">
          {/* Logo with Glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
            <img 
              src={logoUrl} 
              alt="Codernic Logo" 
              className="w-32 h-32 relative z-10"
              style={{ filter: 'drop-shadow(0 0 20px theme("colors.codernic.amber.500"))' }}
            />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Codernic</h1>
          <div className="flex flex-col items-center gap-1 mb-6">
            <span className="text-sm font-mono text-zinc-400">UI v0.6.482</span>
            {appVersion && <span className="text-xs font-mono text-zinc-500">Ext {appVersion}</span>}
          </div>

          {/* License Verification */}
          <div className="mb-6 min-h-[20px] text-xs font-mono">
            {licenseModules && licenseModules.length > 0 ? (
              <div className="text-emerald-500/90 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>License Verified: {licenseModules.join(', ')}</span>
              </div>
            ) : (
              <div className="text-amber-500/80 flex items-center gap-2 animate-pulse px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <div className="w-2 h-2 rounded-full border border-amber-500 border-t-transparent animate-spin"></div>
                <span>Checking License...</span>
              </div>
            )}
          </div>

          {/* Status Message & Loader */}
          <div className="flex flex-col items-center h-12">
            <div className="flex space-x-2 items-center mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[bounce_1s_infinite_-0.3s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[bounce_1s_infinite_-0.15s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[bounce_1s_infinite]"></div>
            </div>
            {config.title && (
              <span className="text-zinc-400 text-sm font-medium animate-pulse">{config.title}</span>
            )}
          </div>

          {/* Close button if stuck */}
          {config.cancelText && (
            <button
              onClick={handleCancel}
              className="absolute -top-16 -right-16 md:-right-32 text-zinc-600 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Close Splash Screen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-zinc-950 border border-zinc-800 shadow-2xl rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-white mb-2">{config.title}</h2>
        
        {config.message && (
          <p className="text-zinc-400 mb-6">{config.message}</p>
        )}

        {config.type === 'prompt' && (
          <div className="mb-6">
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="Enter value..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleResolve(inputValue);
                if (e.key === 'Escape') handleCancel();
              }}
            />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          {config.type !== 'alert' && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded text-zinc-400 hover:bg-zinc-800 transition-colors"
            >
              {config.cancelText || 'Cancel'}
            </button>
          )}
          <button
            onClick={() => handleResolve(config.type === 'prompt' ? inputValue : true)}
            className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-500 transition-colors font-medium"
          >
            {config.confirmText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
