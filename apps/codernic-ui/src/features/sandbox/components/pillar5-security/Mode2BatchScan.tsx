import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDiffInspection,
  selectBatchFiles,
  selectSandboxIsProcessing,
  triggerBatchScanRequest,
} from '../../model/sandbox-slice';
import type { BatchFileItem } from '../../model/sandbox-types';

export function Mode2BatchScan() {
  const dispatch = useDispatch();
  const batchFiles = useSelector(selectBatchFiles);
  const isProcessing = useSelector(selectSandboxIsProcessing);

  const handleInspectBatchFile = (file: BatchFileItem) => {
    if (file.diffs.length > 0) {
      dispatch(openDiffInspection({ diffItem: file.diffs[0], batchFile: file }));
    }
  };

  const handleTriggerRescan = () => {
    dispatch(triggerBatchScanRequest());
  };

  const totalPii = batchFiles.reduce((acc, f) => acc + f.piiCount, 0);
  const totalSecrets = batchFiles.reduce((acc, f) => acc + f.secretsCount, 0);
  const criticalFiles = batchFiles.filter((f) => f.threatLevel === 'CRITICAL').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Batch Overview & Rescan Trigger */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col">
          <span className="text-[10px] uppercase font-bold text-zinc-500">
            Fichiers dans l'Archive ZIP
          </span>
          <span className="text-xl font-black text-purple-400 font-mono mt-1">
            {batchFiles.length} Documents
          </span>
          <span className="text-[10px] text-zinc-400">Scan Multi-Formats</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col">
          <span className="text-[10px] uppercase font-bold text-zinc-500">
            Fichiers Critiques / Données Sensibles
          </span>
          <span className="text-xl font-black text-red-400 font-mono mt-1">
            {criticalFiles} Bloqués
          </span>
          <span className="text-[10px] text-zinc-400">Caviarisation automatique</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col">
          <span className="text-[10px] uppercase font-bold text-zinc-500">
            Entités PII & Secrets Détectés
          </span>
          <span className="text-xl font-black text-amber-400 font-mono mt-1">
            {totalPii + totalSecrets} Violations
          </span>
          <span className="text-[10px] text-zinc-400">
            {totalPii} PII, {totalSecrets} Secrets API
          </span>
        </div>

        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col justify-center">
          <button
            onClick={handleTriggerRescan}
            disabled={isProcessing}
            className="w-full py-2.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
          >
            {isProcessing ? 'Scan Batch en cours...' : '🔄 Re-scanner l\'Archive ZIP'}
          </button>
        </div>
      </div>

      {/* Batch File Tree / Table */}
      <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Arborescence des Fichiers de l'Archive (Cliquez sur 👁️ pour inspecter le diff)
          </span>
          <span className="text-xs text-purple-400 font-mono">
            /vault/archive_enterprise_q4.zip
          </span>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {batchFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold font-mono text-zinc-400 uppercase">
                  {file.extension}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-200 truncate">
                      {file.name}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        file.threatLevel === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : file.threatLevel === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {file.threatLevel}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {file.path} • {(file.sizeBytes / 1024).toFixed(0)} KB •{' '}
                    {file.piiCount} PII • {file.secretsCount} Secrets
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {file.watermarked && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">
                    Filigrané
                  </span>
                )}
                {file.diffs.length > 0 ? (
                  <button
                    onClick={() => handleInspectBatchFile(file)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-xs font-semibold transition"
                  >
                    <span>👁️</span>
                    <span>Inspecter le Diff</span>
                  </button>
                ) : (
                  <span className="text-xs text-zinc-600 font-mono px-3 py-1.5">
                    Aucune modification
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mode2BatchScan;
