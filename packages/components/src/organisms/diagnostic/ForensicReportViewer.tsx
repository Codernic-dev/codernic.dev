// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useEffect, useState } from 'react';

export interface ForensicReportViewerProps {
  reportHtmlContent: string;
  reportTimestampIso?: string;
  onRefreshRequested?: () => void;
}

export function ForensicReportViewer({
  reportHtmlContent,
  reportTimestampIso,
  onRefreshRequested,
}: ForensicReportViewerProps) {
  const [isStale, setIsStale] = useState<boolean>(false);
  const [ageSeconds, setAgeSeconds] = useState<number>(0);

  useEffect(() => {
    if (!reportTimestampIso) return;

    const checkAge = () => {
      const reportDate = new Date(reportTimestampIso).getTime();
      const now = new Date().getTime();
      const diffSec = Math.floor((now - reportDate) / 1000);
      setAgeSeconds(diffSec);
      setIsStale(diffSec > 60);
    };

    checkAge();
    const interval = setInterval(checkAge, 1000);
    return () => clearInterval(interval);
  }, [reportTimestampIso]);

  return (
    <div className="flex flex-col w-full h-full bg-zinc-950 text-zinc-100 p-4 border border-zinc-800 rounded-lg shadow-xl font-mono">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
        <div className="flex items-center space-x-3">
          <span className="text-sky-400 font-bold text-lg">[+] Codebase Forensic Report</span>
          {reportTimestampIso && (
            <span className="text-xs text-zinc-400">
              Audit Date: {new Date(reportTimestampIso).toLocaleString()} ({ageSeconds}s ago)
            </span>
          )}
        </div>
        {onRefreshRequested && (
          <button
            onClick={onRefreshRequested}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded transition-colors"
          >
            Refresh Audit
          </button>
        )}
      </div>

      {/* Outdated Alert */}
      {isStale && (
        <div className="mb-4 p-3 bg-amber-950/80 border border-amber-500/50 text-amber-200 text-sm rounded flex items-center justify-between">
          <span className="font-semibold">
            [!] Warning: Forensic Diagnostic Report is stale (&gt; 60 seconds old). Re-run audit to verify latest state.
          </span>
          {onRefreshRequested && (
            <button
              onClick={onRefreshRequested}
              className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded"
            >
              Re-Audit Now
            </button>
          )}
        </div>
      )}

      {/* Untouched Raw HTML Frame Container */}
      <div className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded p-4 overflow-auto">
        <div
          className="prose prose-invert max-w-none text-sm text-zinc-200"
          dangerouslySetInnerHTML={{ __html: reportHtmlContent }}
        />
      </div>
    </div>
  );
}
