// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { fetchStatusRequest, clearTelemetryEvents } from '../model/swg-slice';
import { LogsConsoleTable, LogEntry } from '@codernic/components';
import { Shield, Zap, AlertTriangle, Radio, RefreshCw, ChevronUp, ChevronDown, Terminal } from 'lucide-react';

export function SwgStatusBarFooter(): React.ReactElement {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [logsHeight, setLogsHeight] = useState(280);
  const isDraggingRef = useRef(false);

  const {
    status,
    sseStatus,
    pirsigEnabled,
    ockhamEnabled,
    panicMode,
    telemetryEvents,
    loading,
    error,
  } = useSelector((state: RootState) => state.swg);

  // Convert raw telemetry events to standard LogEntry table format
  const logEntries: LogEntry[] = telemetryEvents.map((evt, idx) => {
    let level = 'info';
    if (evt.event_type === 'dlp_block' || (evt.pirsig && evt.pirsig.action === 'BLOCKED')) {
      level = 'error';
    } else if (evt.pirsig && evt.pirsig.action === 'ANONYMIZED_FALLBACK') {
      level = 'warn';
    }

    let messageStr = `${evt.event_type.toUpperCase()} - ${evt.target || evt.method || 'System Event'}`;
    if (evt.io_stream?.rehydrated_text) {
      messageStr += `: ${evt.io_stream.rehydrated_text}`;
    } else if (evt.pirsig?.raw_payload) {
      messageStr += `: ${evt.pirsig.raw_payload}`;
    }

    return {
      id: evt.id || String(idx),
      timestamp: evt.timestamp || new Date().toLocaleTimeString(),
      level,
      source: evt.domain || evt.target || evt.client_ip || 'swg-core',
      target: evt.session_id || evt.method || 'proxy',
      message: messageStr,
      details: evt.ockham ? `Tokens Saved: ${evt.ockham.tokens_saved || 0}` : undefined,
    };
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newHeight = window.innerHeight - moveEvent.clientY;
      if (newHeight >= 140 && newHeight <= 650) {
        setLogsHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex flex-col border-t border-border bg-panel flex-shrink-0 z-40 font-sans relative">
      {/* Resizable Drag Handle when expanded */}
      {isOpen && (
        <div
          onMouseDown={handleMouseDown}
          className="h-1.5 -mt-1 w-full cursor-ns-resize hover:bg-amber-500/50 z-50 absolute top-0 transition-colors"
        />
      )}

      {/* 28px Status Bar Row */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 flex items-center justify-between px-3 cursor-pointer transition-colors hover:bg-surface/80 border-b border-border/40 text-xs font-mono select-none"
      >
        {/* Left Indicator Voyants */}
        <div className="flex items-center gap-2">
          {/* Gateway Status Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border flex items-center gap-1 ${
              error || status === 'error'
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                : status === 'online'
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-950/60 border-amber-500/30 text-amber-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                error || status === 'error' ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            {error || status === 'error' ? 'GATEWAY ERROR' : `GATEWAY ${status.toUpperCase()}`}
          </span>

          {/* Pirsig DLP Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border flex items-center gap-1 ${
              pirsigEnabled
                ? 'bg-amber-950/60 border-amber-500/30 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>PIRSIG: {pirsigEnabled ? 'ON' : 'OFF'}</span>
          </span>

          {/* Ockham Optimizer Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border flex items-center gap-1 ${
              ockhamEnabled
                ? 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>OCKHAM: {ockhamEnabled ? 'ON' : 'OFF'}</span>
          </span>

          {/* Lockdown Active Warning */}
          {panicMode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-600 text-white border border-rose-400 animate-bounce flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> LOCKDOWN ACTIVE
            </span>
          )}
        </div>

        {/* Right Status Controls & Expand Console Toggle */}
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <Radio className="w-3 h-3 text-emerald-400" /> SSE: {sseStatus}
          </span>

          {/* Sync Button */}
          <button
            type="button"
            disabled={loading.status}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(fetchStatusRequest());
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface hover:bg-slate-800 border border-border text-slate-300 transition-all font-mono font-bold"
            title="Refresh SWG Status"
          >
            <RefreshCw className={`w-3 h-3 ${loading.status ? 'animate-spin' : ''}`} />
            <span>SYNC</span>
          </button>

          {/* Expand/Collapse Console Drawer Button */}
          <div className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300">
            <Terminal className="w-3.5 h-3.5" />
            <span>LOGS ({telemetryEvents.length})</span>
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>

      {/* Expandable Shared Table Logs Console */}
      {isOpen && (
        <LogsConsoleTable
          logs={logEntries}
          height={logsHeight}
          title="SWG Real-Time Telemetry & System Logs"
          onClear={() => dispatch(clearTelemetryEvents())}
        />
      )}
    </div>
  );
}
