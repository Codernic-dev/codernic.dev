import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDiffInspection,
  processDocumentRequest,
  selectAvailableSamples,
  selectEnableWatermark,
  selectProcessingResult,
  selectSandboxIsProcessing,
  selectSelectedSample,
  selectSensitivityLevel,
  selectUserRole,
  selectWatermarkUser,
  setEnableWatermark,
  setSelectedSample,
  setSensitivityLevel,
  setUserRole,
  setWatermarkUser,
} from '../../model/sandbox-slice';
import type { SlotDiffItem } from '../../model/sandbox-types';

export function Mode1SingleDocument() {
  const dispatch = useDispatch();
  const samples = useSelector(selectAvailableSamples);
  const selectedSample = useSelector(selectSelectedSample);
  const isProcessing = useSelector(selectSandboxIsProcessing);
  const result = useSelector(selectProcessingResult);
  const userRole = useSelector(selectUserRole);
  const sensitivity = useSelector(selectSensitivityLevel);
  const enableWatermark = useSelector(selectEnableWatermark);
  const watermarkUser = useSelector(selectWatermarkUser);

  const handleRunScan = () => {
    dispatch(processDocumentRequest({ filename: selectedSample }));
  };

  const handleInspectSlot = (slot: SlotDiffItem) => {
    dispatch(openDiffInspection({ diffItem: slot }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Toolbar / Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        {/* Sample Selection */}
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label className="text-xs font-bold text-zinc-300">
            📄 Document d'Entreprise à Inspecter
          </label>
          <select
            value={selectedSample}
            onChange={(e) => dispatch(setSelectedSample(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
          >
            {samples.map((s) => (
              <option key={s.filename} value={s.filename}>
                [{s.category.toUpperCase()}] {s.filename} - {s.description}
              </option>
            ))}
          </select>
        </div>

        {/* User Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-300">
            👤 Rôle de Sécurité (RBAC)
          </label>
          <select
            value={userRole}
            onChange={(e) => dispatch(setUserRole(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
          >
            <option value="external_partner">Partenaire Externe (Masquage Strict)</option>
            <option value="internal_employee">Employé Interne (Standard)</option>
            <option value="compliance_officer">Auditeur / CISO (Accrédité)</option>
          </select>
        </div>

        {/* Sensitivity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-300">
            🔒 Niveau de Sensibilité
          </label>
          <select
            value={sensitivity}
            onChange={(e) =>
              dispatch(
                setSensitivityLevel(
                  e.target.value as 'Public' | 'Internal' | 'Confidential' | 'SecretDefense'
                )
              )
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
          >
            <option value="Internal">Interne Entreprise</option>
            <option value="Confidential">Confidentiel Restreint</option>
            <option value="SecretDefense">Secret Défense / R&D</option>
            <option value="Public">Public (Non classifié)</option>
          </select>
        </div>
      </div>

      {/* Watermark & Scan Trigger Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-purple-200">
            <input
              type="checkbox"
              checked={enableWatermark}
              onChange={(e) => dispatch(setEnableWatermark(e.target.checked))}
              className="w-4 h-4 accent-purple-500 cursor-pointer rounded"
            />
            Filigrane Invisible Zero-Width (Traçabilité des fuites)
          </label>
          {enableWatermark && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <span>Porteur :</span>
              <input
                type="text"
                value={watermarkUser}
                onChange={(e) => dispatch(setWatermarkUser(e.target.value))}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-purple-500/40 text-purple-300 text-xs w-32 focus:outline-none"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleRunScan}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs shadow-lg transition-all ${
            isProcessing
              ? 'bg-purple-900/50 text-purple-300 cursor-wait'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40 hover:scale-[1.02]'
          }`}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">🌀</span> Traitement DLP en cours...
            </>
          ) : (
            <>
              <span>⚡</span> Lancer le DLP & Sanitisation
            </>
          )}
        </button>
      </div>

      {/* Processing Results Section */}
      {result && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-zinc-500">
                Temps de Traitement
              </span>
              <span className="text-lg font-black text-purple-400 font-mono">
                {(result.latencyUs / 1000).toFixed(2)} ms
              </span>
              <span className="text-[10px] text-zinc-400">Pipeline Zero-Disk RAM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-zinc-500">
                Slots Modifiés / Caviarisés
              </span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {result.modifiedSlotsCount} / {result.totalSlots}
              </span>
              <span className="text-[10px] text-zinc-400">Entités PII neutralisées</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-zinc-500">
                Merkle Audit Root
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono truncate mt-1">
                {result.merkleAuditRoot.slice(0, 16)}...
              </span>
              <span className="text-[10px] text-zinc-400">Blake3 Cryptographic Proof</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-zinc-500">
                Filigrane Invisible
              </span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5">
                {result.watermarkInjected ? '✅ Injecté & Traçable' : 'Désactivé'}
              </span>
              <span className="text-[10px] text-zinc-400">TX: {result.watermarkTx}</span>
            </div>
          </div>

          {/* Granular Inspection List */}
          <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Segments & Paragraphes du Document (Cliquez sur 👁️ pour inspecter)
              </span>
              <span className="text-xs text-purple-400 font-mono">
                {result.filename}
              </span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {result.diffs.map((slot) => (
                <div
                  key={slot.slotId}
                  className={`p-4 flex items-center justify-between gap-4 transition ${
                    slot.modified
                      ? 'bg-purple-950/10 hover:bg-purple-950/20'
                      : 'hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col gap-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        Slot #{slot.slotId}
                      </span>
                      {slot.modified ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Caviarisé & Sanitisé
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
                          Intact
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-zinc-300 line-clamp-1">
                      {slot.sanitizedText}
                    </p>
                  </div>

                  <button
                    onClick={() => handleInspectSlot(slot)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-xs font-semibold transition shrink-0"
                  >
                    <span>👁️</span>
                    <span>Visual Diff Forensique</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mode1SingleDocument;
