// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { togglePanicRequest, resetConnectionsRequest, fetchAuditLogRequest, toggleAuditLogRequest } from '../model/swg-slice';
import { RefreshCw, FileText } from 'lucide-react';

interface LockdownWidgetProps {
  panicMode?: boolean;
  loading?: {
    panic: boolean;
    reset: boolean;
    auditLog?: boolean;
  };
  onTogglePanic?: (enabled: boolean) => void;
  onResetConnections?: () => void;
}

export function LockdownWidget(props: LockdownWidgetProps): React.ReactElement {
  const dispatch = useDispatch();
  const swgState = useSelector((state: RootState) => state.swg);

  const panicMode = props.panicMode ?? swgState?.panicMode ?? false;
  const auditDumpMode = swgState?.auditDumpMode ?? false;
  const loading = props.loading || swgState?.loading || { panic: false, reset: false, auditLog: false };

  useEffect(() => {
    dispatch(fetchAuditLogRequest());
  }, [dispatch]);

  const onTogglePanic = props.onTogglePanic || ((enabled: boolean) => dispatch(togglePanicRequest(enabled)));
  const onResetConnections = props.onResetConnections || (() => dispatch(resetConnectionsRequest()));

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card h-full max-h-full min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col font-sans min-w-0 max-w-full">
      <div className="space-y-3">
        {/* Lockdown Mode Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <div className="font-mono text-xs font-bold text-slate-200">LOCKDOWN MODE</div>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">Drop incoming TCP/UDP gateway packets.</p>
          </div>

          <button
            type="button"
            disabled={loading.panic}
            onClick={() => onTogglePanic(!panicMode)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              panicMode ? 'bg-rose-600' : 'bg-slate-700'
            } ${loading.panic ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                panicMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Outbound Audit Log Toggle via Redux-Saga */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <div className="font-mono text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>OUTBOUND AUDIT DUMP</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">Log raw socket payload dumps for audit.</p>
          </div>

          <button
            type="button"
            disabled={loading.auditLog}
            onClick={() => dispatch(toggleAuditLogRequest(!auditDumpMode))}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              auditDumpMode ? 'bg-cyan-500' : 'bg-slate-700'
            } ${loading.auditLog ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                auditDumpMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Flush Socket Pool Action */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
          <div>
            <div className="font-mono text-xs font-bold text-slate-200">FLUSH SOCKET POOL</div>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">Reset active connection pool.</p>
          </div>

          <button
            type="button"
            disabled={loading.reset}
            onClick={onResetConnections}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] font-mono tracking-wider uppercase transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-3 h-3 ${loading.reset ? 'animate-spin' : ''}`} />
            <span>{loading.reset ? 'FLUSHING...' : 'FLUSH'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
