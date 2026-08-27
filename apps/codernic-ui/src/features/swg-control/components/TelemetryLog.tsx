// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { setEventFilter, clearTelemetryEvents } from '../model/swg-slice';
import { Terminal, Trash2, Search, ChevronDown, ChevronRight, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';
import type { TelemetryEvent } from '../api/swg-api';

interface TelemetryLogProps {
  events?: TelemetryEvent[];
  eventFilter?: string;
  onFilterChange?: (filter: string) => void;
  onClearEvents?: () => void;
}

export function TelemetryLog(props: TelemetryLogProps): React.ReactElement {
  const dispatch = useDispatch();
  const swgState = useSelector((state: RootState) => state.swg);

  const events = props.events || swgState?.telemetryEvents || [];
  const eventFilter = props.eventFilter || swgState?.eventFilter || 'all';
  const onFilterChange = props.onFilterChange || ((filter: string) => dispatch(setEventFilter(filter)));
  const onClearEvents = props.onClearEvents || (() => dispatch(clearTelemetryEvents()));
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  const filteredEvents = events.filter((evt) => {
    const type = (evt.event_type || '').toLowerCase();
    if (eventFilter === 'io_stream' && !type.includes('io_stream') && !type.includes('sse_rehydrated')) {
      return false;
    }
    if (eventFilter === 'security' && !type.includes('pirsig') && !type.includes('panic') && !type.includes('intercepted')) {
      return false;
    }
    if (eventFilter === 'control' && !type.includes('control') && !type.includes('panic')) {
      return false;
    }
    if (eventFilter === 'connections' && !type.includes('connection')) {
      return false;
    }

    if (searchTerm) {
      const jsonStr = JSON.stringify(evt).toLowerCase();
      return jsonStr.includes(searchTerm.toLowerCase());
    }

    return true;
  });

  const getEventBadge = (evt: TelemetryEvent) => {
    const eventType = evt.event_type || 'event';
    const action = evt.pirsig?.action || '';

    if (eventType === 'request_intercepted') {
      if (action === 'ANONYMIZED' || action === 'ANONYMIZED_FALLBACK') {
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
      }
      if (action === 'BLOCKED') {
        return 'bg-rose-500/30 text-rose-300 border-rose-500/50 font-bold';
      }
      return 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold';
    }

    switch (eventType) {
      case 'io_stream':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'sse_rehydrated_chunk':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'dlp_block':
        return 'bg-rose-500/30 text-rose-300 border-rose-500/50 font-bold';
      case 'tls_handshake_error':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
      case 'control_toggle':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'ciso_panic_toggle':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-bold';
      case 'connections_reset':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card h-full min-h-0 flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 pb-3 border-b border-border/60 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-500" />
          <h2 className="font-heading text-base font-bold text-slate-200">
            REAL-TIME TELEMETRY CONSOLE
          </h2>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search event data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 rounded bg-surface border border-border focus:border-amber-500/50 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-all w-36 sm:w-48"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-surface p-0.5 rounded border border-border text-xs font-mono">
            {['all', 'io_stream', 'security', 'control', 'connections'].map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-2.5 py-1 rounded uppercase tracking-wider transition-all ${
                  eventFilter === f
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Clear Log Button */}
          <button
            onClick={onClearEvents}
            className="p-1.5 rounded bg-surface hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-border hover:border-rose-500/30 transition-all"
            title="Clear Console Output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Feed Display */}
      <div className="bg-surface border border-border/80 rounded-lg p-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden font-mono text-xs space-y-2 custom-scrollbar min-w-0 max-w-full">
        {filteredEvents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
            <Terminal className="w-8 h-8 stroke-1 text-slate-600" />
            <p>No telemetry events in buffer.</p>
            <p className="text-[11px] text-slate-600">Events stream in real-time via WebSocket Hub.</p>
          </div>
        ) : (
          filteredEvents.map((evt, idx) => {
            const eventId = evt.id || `evt-${idx}`;
            const isExpanded = expandedEventId === eventId;
            const action = evt.pirsig?.action || '';
            const isScrubbed = action === 'ANONYMIZED' || action === 'ANONYMIZED_FALLBACK';
            const tokensSaved = evt.ockham?.tokens_saved || 0;

            return (
              <div
                key={eventId}
                className="p-2 rounded bg-panel/60 border border-border/40 hover:border-amber-500/30 transition-all flex flex-col space-y-2 cursor-pointer min-w-0 max-w-full overflow-hidden"
                onClick={() => toggleExpand(eventId)}
              >
                <div className="flex items-center justify-between min-w-0 max-w-full overflow-hidden">
                  <div className="flex flex-wrap items-center gap-2 min-w-0 max-w-full">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}

                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      [{evt.timestamp || 'NOW'}]
                    </span>

                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border shrink-0 ${getEventBadge(evt)}`}>
                      {evt.event_type || 'EVENT'}
                    </span>

                    {isScrubbed && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        PII SCRUBBED
                      </span>
                    )}

                    {tokensSaved > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-blue-500/30 text-blue-300 border border-blue-500/40 flex items-center gap-1 shrink-0">
                        <Zap className="w-3 h-3" />
                        -{tokensSaved} TOKENS
                      </span>
                    )}

                    {evt.target && (
                      <span className="text-slate-300 font-semibold truncate max-w-xs min-w-0">
                        {evt.target}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary Line */}
                <div className="text-slate-400 text-[11px] break-all break-words min-w-0 max-w-full overflow-hidden pl-5">
                  {evt.event_type === 'io_stream'
                    ? `${evt.io_stream?.direction === 'ASCENDANT' ? '[OUTBOUND]' : '[INBOUND]'} ${evt.io_stream?.method || evt.io_stream?.status || evt.io_stream?.type || ''} ➔ ${evt.io_stream?.target || evt.target || '—'} (${evt.io_stream?.payload_bytes || evt.payload_bytes || 0} bytes)`
                    : evt.event_type === 'dlp_block'
                    ? `[PIRSIG DLP BLOCK] Target: ${evt.dlp_block?.target || evt.target} ➔ ${evt.dlp_block?.reason || 'Security Violation'}`
                    : evt.event_type === 'request_intercepted'
                    ? `[PIRSIG DLP] ${action || 'PASS'} | [OCKHAM] ${tokensSaved > 0 ? `Saved ${tokensSaved} Tokens (-${evt.ockham?.savings_percent || 0}%)` : 'No Compression'}`
                    : evt.event_type === 'sse_rehydrated_chunk'
                    ? `[REHYDRATED STREAM] Session: ${evt.session_id} (${evt.bytes || 0} B) ➔ "${evt.chunk}"`
                    : JSON.stringify(evt)}
                </div>

                {/* Expanded Detailed Diffs & Details */}
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-slate-800 space-y-2 text-[11px] pl-5 min-w-0 max-w-full overflow-hidden">
                    {/* Pirsig Scrubbing Diff */}
                    {evt.pirsig && (
                      <div className="space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800 min-w-0 max-w-full overflow-hidden">
                        <div className="text-amber-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>PIRSIG DLP SCRUBBER DETAILS (Action: {evt.pirsig.action || 'PASS'})</span>
                        </div>
                        {evt.pirsig.raw_payload && (
                          <div className="min-w-0 max-w-full overflow-hidden">
                            <span className="text-slate-500 font-semibold">Raw Original Payload:</span>
                            <pre className="bg-slate-900 p-1.5 rounded text-amber-300 font-mono max-w-full overflow-x-auto whitespace-pre-wrap break-all mt-0.5">
                              {evt.pirsig.raw_payload}
                            </pre>
                          </div>
                        )}
                        {evt.pirsig.sanitized_payload && (
                          <div className="min-w-0 max-w-full overflow-hidden">
                            <span className="text-slate-500 font-semibold">Sanitized Payload:</span>
                            <pre className="bg-slate-900 p-1.5 rounded text-emerald-300 font-mono max-w-full overflow-x-auto whitespace-pre-wrap break-all mt-0.5">
                              {evt.pirsig.sanitized_payload}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ockham Token Compression Details */}
                    {evt.ockham && (
                      <div className="space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800 min-w-0 max-w-full overflow-hidden">
                        <div className="text-blue-400 font-bold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span>OCKHAM TOKEN OPTIMIZER ({evt.ockham.original_tokens || 0} ➔ {evt.ockham.compressed_tokens || 0} tokens, {tokensSaved} saved)</span>
                        </div>
                        {evt.ockham.raw_prompt && (
                          <div className="min-w-0 max-w-full overflow-hidden">
                            <span className="text-slate-500 font-semibold">Original Prompt:</span>
                            <pre className="bg-slate-900 p-1.5 rounded text-blue-300 font-mono max-w-full overflow-x-auto whitespace-pre-wrap break-all mt-0.5">
                              {evt.ockham.raw_prompt}
                            </pre>
                          </div>
                        )}
                        {evt.ockham.compressed_prompt && (
                          <div className="min-w-0 max-w-full overflow-hidden">
                            <span className="text-slate-500 font-semibold">Compressed Prompt:</span>
                            <pre className="bg-slate-900 p-1.5 rounded text-indigo-300 font-mono max-w-full overflow-x-auto whitespace-pre-wrap break-all mt-0.5">
                              {evt.ockham.compressed_prompt}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Raw JSON Payload */}
                    <div className="bg-slate-950 p-2 rounded border border-slate-800 min-w-0 max-w-full overflow-hidden">
                      <span className="text-slate-500 font-semibold">Full Event Payload JSON:</span>
                      <pre className="bg-slate-900 p-1.5 rounded text-slate-300 font-mono max-w-full overflow-x-auto whitespace-pre-wrap break-all text-[10px] mt-0.5">
                        {JSON.stringify(evt, null, 2)}
                      </pre>
                    </div>
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
