import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSandboxActivePillar,
  setActivePillar,
} from '../model/sandbox-slice';
import type { SandboxPillarId } from '../model/sandbox-types';

interface PillarDef {
  id: SandboxPillarId;
  toolNum: string;
  name: string;
  subtitle: string;
  logo: string;
  color: string;
  accentBorder: string;
  glowBg: string;
  badge: string;
}

const PILLARS: PillarDef[] = [
  {
    id: 'execution',
    toolNum: 'TOOL 1',
    name: 'EXÉCUTION',
    subtitle: 'Deming 14B & FreeToken MoE',
    logo: '/deming-logo.svg',
    color: '#FF4D4D',
    accentBorder: 'border-[#FF4D4D]/50',
    glowBg: 'bg-[#FF4D4D]/10 text-[#FF4D4D]',
    badge: '14B 37-LoRA Fleet',
  },
  {
    id: 'memory',
    toolNum: 'TOOL 2',
    name: 'MÉMOIRE',
    subtitle: 'RagTime 3-Zone & Neura 3D',
    logo: '/ragtime-logo.svg',
    color: '#00D084',
    accentBorder: 'border-[#00D084]/50',
    glowBg: 'bg-[#00D084]/10 text-[#00D084]',
    badge: '100% In-RAM AST',
  },
  {
    id: 'governance',
    toolNum: 'TOOL 3',
    name: 'GOUVERNANCE',
    subtitle: 'Galileus DAG & Pirsig Vault',
    logo: '/galileus-logo.svg',
    color: '#0077FF',
    accentBorder: 'border-[#0077FF]/50',
    glowBg: 'bg-[#0077FF]/10 text-[#0077FF]',
    badge: 'Blake3 Preflight Gates',
  },
  {
    id: 'optimization',
    toolNum: 'TOOL 4',
    name: 'OPTIMISATION',
    subtitle: 'Ockham Token & Frugalité',
    logo: '/ockham-logo.svg',
    color: '#FFB800',
    accentBorder: 'border-[#FFB800]/50',
    glowBg: 'bg-[#FFB800]/10 text-[#FFB800]',
    badge: '0ms KV Hit Rate',
  },
  {
    id: 'security',
    toolNum: 'TOOL 5',
    name: 'SÉCURITÉ',
    subtitle: 'Cosa SWG & DLP Vault',
    logo: '/cosa-logo.svg',
    color: '#9F7AEA',
    accentBorder: 'border-[#9F7AEA]/50',
    glowBg: 'bg-[#9F7AEA]/10 text-[#9F7AEA]',
    badge: 'Zero-Width Watermark',
  },
];

interface PillarNavigationBarProps {
  className?: string;
}

export function PillarNavigationBar({ className = '' }: PillarNavigationBarProps) {
  const dispatch = useDispatch();
  const activePillar = useSelector(selectSandboxActivePillar);

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Header Banner */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Showcase Interactif 5 Piliers
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
            SaaS Live Demo 2026
          </span>
        </div>
        <span className="text-xs text-zinc-500 font-mono">
          Codernic Sovereign Enterprise AI
        </span>
      </div>

      {/* 5 Pillars Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
        {PILLARS.map((pillar) => {
          const isActive = activePillar === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => dispatch(setActivePillar(pillar.id))}
              className={`flex flex-col p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group ${
                isActive
                  ? `${pillar.accentBorder} bg-zinc-900/90 shadow-lg shadow-black/40 ring-1 ring-white/10`
                  : 'border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              {/* Active top glow indicator */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: pillar.color }}
                />
              )}

              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg p-1 bg-zinc-900 border border-zinc-700/50 flex items-center justify-center shrink-0">
                    <img
                      src={pillar.logo}
                      alt={pillar.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 font-mono">
                    {pillar.toolNum}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                    isActive ? pillar.glowBg : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {pillar.badge}
                </span>
              </div>

              <div className="flex flex-col">
                <span
                  className="text-xs font-bold uppercase tracking-tight"
                  style={{ color: isActive ? pillar.color : '#e4e4e7' }}
                >
                  {pillar.name}
                </span>
                <span className="text-[11px] text-zinc-400 line-clamp-1">
                  {pillar.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PillarNavigationBar;
