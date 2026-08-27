// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { Activity, Shield, Zap, RotateCcw } from 'lucide-react';
import type { TelemetryEvent } from '../api/swg-api';

interface LlmStreamViewerProps {
  events?: TelemetryEvent[];
}

export function LlmStreamViewer(props: LlmStreamViewerProps): React.ReactElement {
  const swgEvents = useSelector((state: RootState) => state.swg?.telemetryEvents || []);
  const events = props.events || swgEvents;
  // 4 Filter Toggles: Pirsig Before, Pirsig After, Ockham Before, Ockham After
  const [filterPirsigBefore, setFilterPirsigBefore] = useState<boolean>(true);
  const [filterPirsigAfter, setFilterPirsigAfter] = useState<boolean>(true);
  const [filterOckhamBefore, setFilterOckhamBefore] = useState<boolean>(true);
  const [filterOckhamAfter, setFilterOckhamAfter] = useState<boolean>(true);

  // Filter events EXCLUSIVELY relevant to LLM Pirsig DLP and Ockham token optimization
  const lllmEvents = events.filter(
    (e) =>
      e.event_type === 'request_intercepted' ||
      e.event_type === 'dlp_block' ||
      e.event_type === 'sse_rehydrated_chunk' ||
      e.pirsig !== undefined ||
      e.ockham !== undefined
  );

  // Reset / Clear All Filters
  const handleClearAll = () => {
    setFilterPirsigBefore(false);
    setFilterPirsigAfter(false);
    setFilterOckhamBefore(false);
    setFilterOckhamAfter(false);
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card flex flex-col h-full min-h-0 overflow-y-auto overflow-x-hidden font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col space-y-3 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                Live LLM Stream Inspector
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Granular Step Stream
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Line-by-line pipeline stream with granular Pirsig DLP & Ockham stage filtering
              </p>
            </div>
          </div>
        </div>

        {/* 4 Granular Stage Filter Toggles + Clear Button */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-xs text-slate-400 font-semibold mr-1">Stream Filters:</span>
          
          {/* Pirsig Before */}
          <button
            onClick={() => setFilterPirsigBefore(!filterPirsigBefore)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 border ${
              filterPirsigBefore
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10'
                : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:text-slate-300'
            }`}
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span>Pirsig Before</span>
          </button>

          {/* Pirsig After */}
          <button
            onClick={() => setFilterPirsigAfter(!filterPirsigAfter)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 border ${
              filterPirsigAfter
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:text-slate-300'
            }`}
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Pirsig After</span>
          </button>

          {/* Ockham Before */}
          <button
            onClick={() => setFilterOckhamBefore(!filterOckhamBefore)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 border ${
              filterOckhamBefore
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/10'
                : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:text-slate-300'
            }`}
          >
            <Zap className="w-3 h-3 text-blue-400" />
            <span>Ockham Before</span>
          </button>

          {/* Ockham After */}
          <button
            onClick={() => setFilterOckhamAfter(!filterOckhamAfter)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 border ${
              filterOckhamAfter
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm shadow-indigo-500/10'
                : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:text-slate-300'
            }`}
          >
            <Zap className="w-3 h-3 text-indigo-400" />
            <span>Ockham After</span>
          </button>

          {/* Reset / Clear All */}
          <button
            onClick={handleClearAll}
            className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all flex items-center space-x-1 ml-auto"
            title="Reset / Disable All Filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Stream Line-by-Line Terminal */}
      <div className="flex-1 min-h-0 overflow-y-auto font-mono text-xs space-y-1.5 p-3 bg-slate-950 rounded-lg border border-slate-800 mt-3 custom-scrollbar">
        {lllmEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
            <span>Awaiting LLM prompt transformations...</span>
          </div>
        ) : (
          lllmEvents.map((evt, idx) => {
            const rawPrompt = evt.pirsig?.raw_payload || evt.ockham?.raw_prompt || evt.target || '';
            const piiSanitized = evt.pirsig?.sanitized_payload || '';
            const ockhamBefore = evt.ockham?.raw_prompt || piiSanitized || rawPrompt;
            const ockhamAfter = evt.ockham?.compressed_prompt || piiSanitized || rawPrompt;

            const isDlpBlock = evt.event_type === 'dlp_block' || (evt.pirsig && evt.pirsig.action === 'BLOCKED');

            return (
              <div key={evt.id || idx} className="space-y-1 py-1 border-b border-slate-900 text-[11px] min-w-0 max-w-full overflow-hidden">
                {/* DLP Block Warning Line */}
                {isDlpBlock && (
                  <div className="p-1.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center space-x-2 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-rose-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0">DLP BLOCK</span>
                    <span className="font-semibold text-rose-200 shrink-0">{evt.dlp_block?.target || evt.target}:</span>
                    <span className="truncate min-w-0">{evt.dlp_block?.reason || 'Secret exfiltration prevented'}</span>
                  </div>
                )}

                {/* Fallback STREAM OUTBOUND / INBOUND Line */}
                {(!filterPirsigBefore && !filterPirsigAfter && !filterOckhamBefore && !filterOckhamAfter) || (!rawPrompt && !piiSanitized && evt.io_stream) ? (
                  <div className="flex items-center space-x-2 text-cyan-300/90 bg-cyan-950/20 px-2 py-1 rounded border border-cyan-500/20 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-cyan-500/30 text-cyan-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/40 shrink-0">
                      {evt.io_stream?.type || 'IO_STREAM'}
                    </span>
                    <span className="text-slate-400 text-[10px] shrink-0">{evt.timestamp || '00:00'}</span>
                    <span className="truncate font-mono min-w-0">{evt.io_stream?.target || evt.target || 'Network Flow'}</span>
                  </div>
                ) : null}

                {/* 1. Pirsig Before Line */}
                {filterPirsigBefore && rawPrompt && !isDlpBlock && (
                  <div className="flex items-center space-x-2 text-amber-300/90 bg-amber-950/20 px-2 py-1 rounded border border-amber-500/20 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-amber-500/30 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0">
                      PIRSIG BEFORE
                    </span>
                    <span className="text-slate-400 text-[10px] shrink-0">{evt.timestamp || '00:00'}</span>
                    <span className="truncate font-mono min-w-0">{rawPrompt}</span>
                  </div>
                )}

                {/* 2. Pirsig After Line */}
                {filterPirsigAfter && piiSanitized && !isDlpBlock && (
                  <div className="flex items-center space-x-2 text-emerald-300/90 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/20 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-emerald-500/30 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/40 shrink-0">
                      PIRSIG AFTER
                    </span>
                    <span className="text-slate-400 text-[10px] shrink-0">{evt.timestamp || '00:00'}</span>
                    <span className="truncate font-mono min-w-0">{piiSanitized}</span>
                  </div>
                )}

                {/* 3. Ockham Before Line */}
                {filterOckhamBefore && evt.ockham && !isDlpBlock && (
                  <div className="flex items-center space-x-2 text-blue-300/90 bg-blue-950/20 px-2 py-1 rounded border border-blue-500/20 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-blue-500/30 text-blue-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-500/40 shrink-0">
                      OCKHAM BEFORE
                    </span>
                    <span className="text-slate-400 text-[10px] shrink-0">{evt.ockham.original_tokens || 0} tokens</span>
                    <span className="truncate font-mono min-w-0">{ockhamBefore}</span>
                  </div>
                )}

                {/* 4. Ockham After Line */}
                {filterOckhamAfter && evt.ockham && !isDlpBlock && (
                  <div className="flex items-center space-x-2 text-indigo-300/90 bg-indigo-950/20 px-2 py-1 rounded border border-indigo-500/20 min-w-0 max-w-full overflow-hidden">
                    <span className="bg-indigo-500/30 text-indigo-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-indigo-500/40 shrink-0">
                      OCKHAM AFTER
                    </span>
                    <span className="text-emerald-400 text-[10px] font-bold shrink-0">
                      {evt.ockham.compressed_tokens || 0} tokens ({evt.ockham.tokens_saved || 0} saved)
                    </span>
                    <span className="truncate font-mono min-w-0">{ockhamAfter}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
