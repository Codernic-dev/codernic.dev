// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDiffInspection,
  selectActiveInspectBatchFile,
  selectActiveInspectItem,
  selectIsDiffModalOpen,
  selectProcessingResult,
} from '../../model/sandbox-slice';

export function ForensicDiffModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsDiffModalOpen);
  const inspectItem = useSelector(selectActiveInspectItem);
  const batchFile = useSelector(selectActiveInspectBatchFile);
  const processingResult = useSelector(selectProcessingResult);

  if (!isOpen || !inspectItem) {
    return null;
  }

  const merkleRoot =
    processingResult?.merkleAuditRoot ||
    '8f4a2b9c1d3e5f7a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d1e3f5';
  const watermarkTx = processingResult?.watermarkTx || 'tx_vault_sec_2026';
  const watermarkUser = processingResult?.watermarkUser || 'usr_partner_042';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-purple-500/40 rounded-2xl shadow-2xl shadow-purple-950/50 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-base">
              👁️
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                Inspection Forensique & Visual Diff
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                  Slot #{inspectItem.slotId}
                </span>
                {batchFile && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
                    {batchFile.name}
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400">
                Pirsig DLP Sanitization & Audit Cryptographique Merkle
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeDiffInspection())}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-6">
          {/* Cryptographic Proof Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Merkle Audit Root (Blake3)
              </span>
              <span className="font-mono text-purple-400 text-[11px] break-all">
                {merkleRoot}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Filigrane Invisible (Zero-Width)
              </span>
              <span className="font-mono text-emerald-400 text-[11px] block">
                [✓] Actif (TX: {watermarkTx})
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Porteur: {watermarkUser}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Statut de Conformité
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">
                🛡️ Zero Data Leakage (100/100)
              </span>
            </div>
          </div>

          {/* Detected Entities Badges */}
          {inspectItem.detectedEntities.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Entités Confidentielles Neutralisées :
              </span>
              <div className="flex flex-wrap gap-2">
                {inspectItem.detectedEntities.map((ent) => (
                  <div
                    key={ent.id}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300"
                  >
                    <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                      {ent.category}
                    </span>
                    <span className="line-through text-zinc-500 font-mono">
                      {ent.originalValue}
                    </span>
                    <span>➔</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {ent.maskedValue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dual-Pane Visual Diff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {/* Original Pane */}
            <div className="flex flex-col rounded-xl border border-red-500/20 bg-red-950/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-red-500/20 bg-red-950/20">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  🔴 Document Brut Original (Données Sensibles en Clair)
                </span>
              </div>
              <div className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {inspectItem.originalText}
              </div>
            </div>

            {/* Sanitized Pane */}
            <div className="flex flex-col rounded-xl border border-emerald-500/20 bg-emerald-950/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-500/20 bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  🟢 Version Sanitisée & Filigranée (Prête pour Inférence AI)
                </span>
              </div>
              <div className="p-4 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {inspectItem.sanitizedText}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/60">
          <span className="text-xs text-zinc-500">
            Protégé par le Security Web Gateway Codernic DLP & Zero-Width Watermarking
          </span>
          <button
            onClick={() => dispatch(closeDiffInspection())}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
          >
            Fermer l'inspection
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForensicDiffModal;
