// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useSelector } from 'react-redux';
import { PillarNavigationBar } from '../components/PillarNavigationBar';
import { SecurityPillarHub } from '../components/pillar5-security/SecurityPillarHub';
import { selectSandboxActivePillar } from '../model/sandbox-slice';

export function SandboxWidget() {
  const activePillar = useSelector(selectSandboxActivePillar);

  return (
    <div className="flex flex-col w-full h-full p-6 bg-zinc-950 text-zinc-100 overflow-y-auto gap-6">
      {/* 5-Pillars Global Navigation Bar */}
      <PillarNavigationBar />

      {/* Dynamic Content by Active Pillar */}
      <div className="flex-1 w-full">
        {activePillar === 'security' && <SecurityPillarHub />}

        {activePillar === 'execution' && (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-zinc-900/40 border border-[#FF4D4D]/30 text-center gap-4 animate-in fade-in">
            <div className="w-16 h-16 p-3 rounded-2xl bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 flex items-center justify-center">
              <img src="/deming-logo.svg" alt="Deming" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-black text-white uppercase">
              Pilier 1 : Exécution (Deming Engine 14B & FreeToken MoE)
            </h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Méta-Transformateur 14B, 37 LoRAs, routage sparse Top-K en &lt; 35 ns et streaming de couches.
            </p>
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#FF4D4D]/20 text-[#FF4D4D] font-bold border border-[#FF4D4D]/30">
              Prêt pour Phase 2 : Télémétrie Radar 37 Nœuds
            </span>
          </div>
        )}

        {activePillar === 'memory' && (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-zinc-900/40 border border-[#00D084]/30 text-center gap-4 animate-in fade-in">
            <div className="w-16 h-16 p-3 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-center">
              <img src="/ragtime-logo.svg" alt="RagTime" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-black text-white uppercase">
              Pilier 2 : Mémoire (RagTime 3-Zone & Simulateur 3D Neura)
            </h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Indexation FTS5 + AST, rendu 3D WebGL via MCP Bridge, limite 100 Mo 100% en RAM vive.
            </p>
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#00D084]/20 text-[#00D084] font-bold border border-[#00D084]/30">
              Prêt pour Phase 3 : Visualiseur Neura 3D WebGL
            </span>
          </div>
        )}

        {activePillar === 'governance' && (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-zinc-900/40 border border-[#0077FF]/30 text-center gap-4 animate-in fade-in">
            <div className="w-16 h-16 p-3 rounded-2xl bg-[#0077FF]/10 border border-[#0077FF]/30 flex items-center justify-center">
              <img src="/galileus-logo.svg" alt="Galileus" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-black text-white uppercase">
              Pilier 3 : Gouvernance (Galileus DAG & Pirsig Vault)
            </h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Orchestration DAG, Preflight Complexity Gates, exécution réelle et audit Pirsig 100/100.
            </p>
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#0077FF]/20 text-[#0077FF] font-bold border border-[#0077FF]/30">
              Prêt pour Phase 4 : Fusion codernic-dag-ui
            </span>
          </div>
        )}

        {activePillar === 'optimization' && (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-zinc-900/40 border border-[#FFB800]/30 text-center gap-4 animate-in fade-in">
            <div className="w-16 h-16 p-3 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center">
              <img src="/ockham-logo.svg" alt="Ockham" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-black text-white uppercase">
              Pilier 4 : Optimisation (Ockham Token Optimizer)
            </h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Comptage physique réel des jetons, ratio de réutilisation KV-cache Blake3 et mesure des watts.
            </p>
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#FFB800] font-bold border border-[#FFB800]/30">
              Prêt pour Phase 5 : Sondes de Tokens Live
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SandboxWidget;
