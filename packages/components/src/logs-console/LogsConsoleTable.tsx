// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useState, useRef, useEffect } from 'react';
import { IconTerminal } from '../atoms/icons';

export interface LogEntry {
  id?: string;
  timestamp?: string;
  level?: 'info' | 'warn' | 'error' | 'debug' | string;
  source?: string;
  target?: string;
  message: string;
  details?: Record<string, any> | string;
}

export interface LogsConsoleTableProps {
  logs: LogEntry[];
  height?: number;
  onClear?: () => void;
  title?: string;
}

export function LogsConsoleTable({
  logs,
  height = 260,
  onClear,
  title = 'System & Telemetry Logs',
}: LogsConsoleTableProps): React.ReactElement {
  const [filterText, setFilterText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const filteredLogs = logs.filter((log) => {
    if (selectedLevel !== 'all' && log.level?.toLowerCase() !== selectedLevel) {
      return false;
    }
    if (!filterText) return true;
    const query = filterText.toLowerCase();
    return (
      log.message.toLowerCase().includes(query) ||
      (log.source && log.source.toLowerCase().includes(query)) ||
      (log.target && log.target.toLowerCase().includes(query)) ||
      (log.timestamp && log.timestamp.toLowerCase().includes(query))
    );
  });

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs.length]);

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col bg-[#09090b] border-t border-[var(--border)] font-mono text-[11px] text-[var(--text-body)] overflow-hidden select-text w-full"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--bg-panel)] border-b border-[var(--border-subtle)] shrink-0">
        <div className="flex items-center gap-2">
          <IconTerminal size={14} className="text-amber-400" />
          <span className="font-bold uppercase tracking-wider text-slate-200">{title}</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400">
            {filteredLogs.length} / {logs.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter logs..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-2 py-0.5 rounded bg-[#111113] border border-zinc-800 text-[10px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-2 py-0.5 rounded bg-[#111113] border border-zinc-800 text-[10px] text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">ALL LEVELS</option>
            <option value="info">INFO</option>
            <option value="warn">WARN</option>
            <option value="error">ERROR</option>
          </select>

          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="px-2 py-0.5 rounded bg-surface hover:bg-slate-800 border border-border text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Log Table Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-[#111113] border-b border-zinc-800 text-slate-400 uppercase text-[10px] sticky top-0 z-10">
            <tr>
              <th className="py-1.5 px-3 w-24">Timestamp</th>
              <th className="py-1.5 px-2 w-20">Level</th>
              <th className="py-1.5 px-2 w-44">Source / Target</th>
              <th className="py-1.5 px-3">Log Message / Payload Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500 italic">
                  No log entries match the active filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((entry, idx) => {
                const isError = entry.level === 'error' || entry.message.includes('ERROR');
                const isWarn = entry.level === 'warn' || entry.message.includes('WARN');

                return (
                  <tr key={entry.id || idx} className="hover:bg-zinc-900/60 transition-colors">
                    <td className="py-1 px-3 text-slate-400 whitespace-nowrap font-mono text-[10px] truncate">
                      {entry.timestamp || '00:00:00'}
                    </td>
                    <td className="py-1 px-2 whitespace-nowrap font-bold text-[10px]">
                      <span
                        className={`px-1.5 py-0.2 rounded border text-[9px] uppercase ${
                          isError
                            ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                            : isWarn
                            ? 'bg-amber-950/60 border-amber-500/30 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {entry.level || 'INFO'}
                      </span>
                    </td>
                    <td className="py-1 px-2 text-cyan-400 font-mono text-[10px] truncate max-w-0">
                      {entry.source || entry.target || 'system'}
                    </td>
                    <td className="py-1 px-3 whitespace-pre-wrap font-mono text-[10px] break-all break-words max-w-0 leading-normal text-slate-200 overflow-hidden">
                      {entry.message}
                      {entry.details && (
                        <div className="mt-0.5 text-slate-400 text-[9px] bg-black/40 p-1 rounded border border-zinc-800/60 break-all break-words max-w-full overflow-hidden">
                          {typeof entry.details === 'string' ? entry.details : JSON.stringify(entry.details)}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
}
