// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateSsrmRequest } from '../../../features/system/store/tauri.saga';

export interface SsrmWidgetProps {
  modelId: string;
}

export function SsrmWidget({ modelId }: SsrmWidgetProps): JSX.Element {
  const dispatch = useDispatch();
  const [owner, setOwner] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!owner.trim()) {
      setError('Owner identity is required');
      return;
    }
    
    setIsGenerating(true);
    setError(null);

    dispatch(generateSsrmRequest({
      modelId,
      owner: owner.trim(),
      expiresInDays: 30
    }));

    setOwner('');
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="mt-4 p-3 bg-slate-900 border border-slate-700 rounded-lg">
      <h4 className="text-sm font-bold text-slate-300 mb-2">Generate SSRM (Pass-Droit)</h4>
      <div className="flex flex-col space-y-2">
        <input 
          type="text" 
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner Identity (e.g. j.doe@company.com)" 
          className="px-3 py-1.5 bg-slate-800 text-sm text-slate-200 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate SSRM"}
        </button>
        {error && <div className="text-xs text-rose-400 mt-1">{error}</div>}
        {status && <div className="text-xs text-emerald-400 mt-1 break-all">{status}</div>}
      </div>
    </div>
  );
}
