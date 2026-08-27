import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSandboxSecurityMode,
  setSecurityMode,
} from '../../model/sandbox-slice';
import type { SecurityMode } from '../../model/sandbox-types';
import ForensicDiffModal from './ForensicDiffModal';
import Mode1SingleDocument from './Mode1SingleDocument';
import Mode2BatchScan from './Mode2BatchScan';

export function SecurityPillarHub() {
  const dispatch = useDispatch();
  const mode = useSelector(selectSandboxSecurityMode);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Pillar Hero Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-950 to-zinc-950 border border-purple-500/30 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl p-2 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/50">
            <img
              src="/cosa-logo.svg"
              alt="Cosa SWG Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white tracking-wide uppercase">
                Pilier 5 : Sécurité & DLP Vault
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                Cosa SWG 2026
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Pipeline de Sanitisation en RAM vive (100 Mo max), Caviarisation Granulaire Pirsig & Filigrane Invisible
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-stretch md:self-auto">
          <button
            onClick={() => dispatch(setSecurityMode('single'))}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'single'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Mode 1 : Document Unique
          </button>
          <button
            onClick={() => dispatch(setSecurityMode('batch'))}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'batch'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Mode 2 : Scan Batch / ZIP
          </button>
        </div>
      </div>

      {/* Active Mode View */}
      {mode === 'single' ? <Mode1SingleDocument /> : <Mode2BatchScan />}

      {/* Granular Forensic Visual Diff Modal */}
      <ForensicDiffModal />
    </div>
  );
}

export default SecurityPillarHub;
