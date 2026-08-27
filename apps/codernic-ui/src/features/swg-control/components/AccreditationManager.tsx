// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { addAccreditationRequest, deleteAccreditationRequest } from '../model/swg-slice';
import { FileCode, Plus, Trash2 } from 'lucide-react';

export function AccreditationManager(): React.ReactElement {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.swg.accreditations);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [status, setStatus] = useState('pass');

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
    <div className="bg-panel border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
        <FileCode className="w-4 h-4 text-cyan-400" />
        <h2 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider">
          Application Accreditations (`swg-accreditations.json`)
        </h2>
      </div>

      {/* Add New Rule Form */}
      <form onSubmit={handleAdd} className="space-y-2 mb-4 p-2.5 rounded-lg bg-surface border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="App Name (e.g. antigravity)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-base border border-border text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <input
            type="text"
            placeholder="Path (e.g. ~/.local/bin/antigravity)"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-base border border-border text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-2.5 py-1 rounded bg-base border border-border text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="pass">PASS (Raw Tunnel / Bypass)</option>
            <option value="forbidden">FORBIDDEN (TCP Reset / Block)</option>
            <option value="inspect">INSPECT (SWG DLP + Pirsig)</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </div>
      </form>

      {/* Rule List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border/60 text-slate-400 uppercase text-[10px]">
              <th className="pb-1.5">Application</th>
              <th className="pb-1.5">Executable Path</th>
              <th className="pb-1.5">Stance</th>
              <th className="pb-1.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-3 text-center text-slate-500 text-[11px]">
                  No accreditation rules defined. All processes will be inspected.
                </td>
              </tr>
            ) : (
              entries.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface/50">
                  <td className="py-2 font-bold text-slate-200">{String(item.name)}</td>
                  <td className="py-2 text-slate-400 truncate max-w-[120px]">{String(item.path)}</td>
                  <td className="py-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${
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
                  <td className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
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
