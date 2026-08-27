// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import {
  fetchAccreditationsRequest,
  addAccreditationRequest,
  deleteAccreditationRequest,
} from '../model/swg-slice';
import { Plus, Trash2 } from 'lucide-react';

export function AppAccreditationWidget(): React.ReactElement {
  const dispatch = useDispatch();
  const swgState = useSelector((state: RootState) => state.swg);
  const entries = swgState?.accreditations || [];

  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [status, setStatus] = useState('pass');

  useEffect(() => {
    dispatch(fetchAccreditationsRequest());
  }, [dispatch]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !path) return;
    dispatch(addAccreditationRequest({ name, path, status }));
    setName('');
    setPath('');
  };

  const handleDelete = (index: number) => {
    dispatch(deleteAccreditationRequest(index));
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card h-full max-h-full min-h-0 overflow-y-auto custom-scrollbar flex flex-col font-sans">
      {/* Add Rule Form */}
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4 p-3 rounded-lg bg-surface border border-border min-w-0 max-w-full overflow-hidden">
        <input
          type="text"
          placeholder="App Name (e.g. antigravity)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full min-w-0 max-w-full truncate px-3 py-1.5 rounded bg-base border border-border text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Executable Path (e.g. ~/.local/bin/antigravity)"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="w-full min-w-0 max-w-full truncate px-3 py-1.5 rounded bg-base border border-border text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        <div className="flex items-center gap-2 w-full min-w-0 max-w-full">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 min-w-0 px-3 py-1.5 rounded bg-base border border-border text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500 truncate"
          >
            <option value="pass">PASS (Bypass / Tunnel)</option>
            <option value="forbidden">FORBIDDEN (TCP Reset)</option>
            <option value="inspect">INSPECT (DLP + Pirsig)</option>
          </select>
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </div>
      </form>

      {/* Spacious Rule Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border/60 text-slate-400 uppercase text-[10px]">
              <th className="pb-2 pl-2">Application</th>
              <th className="pb-2">Executable Path</th>
              <th className="pb-2">Stance</th>
              <th className="pb-2 pr-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-slate-500 text-xs">
                  No accreditation rules defined. All processes will be inspected.
                </td>
              </tr>
            ) : (
              entries.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-all">
                  <td className="py-2.5 pl-2 font-bold text-slate-200 max-w-0 truncate" title={String(item.name)}>{String(item.name)}</td>
                  <td className="py-2.5 text-slate-400 max-w-0 truncate" title={String(item.path)}>{String(item.path)}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        item.status === 'pass'
                          ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                          : item.status === 'forbidden'
                          ? 'bg-rose-950/60 border-rose-500/30 text-rose-400'
                          : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
                      }`}
                    >
                      {String(item.status)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
                      title="Delete Rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
