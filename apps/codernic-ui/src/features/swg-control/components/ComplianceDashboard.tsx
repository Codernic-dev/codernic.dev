// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

export interface ComplianceDashboardProps {
  dlpViolationsCount: number;
  compressionSavingsRatio: number;
  complianceScore: number;
  enclaveAttested: boolean;
  enclaveTechnology: string;
}

export function ComplianceDashboard({
  dlpViolationsCount,
  compressionSavingsRatio,
  complianceScore,
  enclaveAttested,
  enclaveTechnology,
}: ComplianceDashboardProps) {
  return (
    <div className="bg-panel border border-border rounded-lg p-6 shadow-card text-slate-100 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">SOC 2 & Sovereignty Compliance Dashboard</h2>
          <p className="text-xs text-slate-400">Real-time AI Governance, DLP Telemetry & Enclave Attestation</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Attestation Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              enclaveAttested ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}
          >
            {enclaveAttested ? `Hardware Verified (${enclaveTechnology})` : 'Software Fallback'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Overall Compliance Score</p>
          <p className="text-3xl font-extrabold text-emerald-400">{complianceScore}%</p>
          <p className="text-xs text-emerald-500/80 mt-1">SOC 2 Type II Compliant</p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">DLP Intercepts</p>
          <p className="text-3xl font-extrabold text-rose-400">{dlpViolationsCount}</p>
          <p className="text-xs text-rose-500/80 mt-1">Blocked & Anonymized</p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Token Compression Savings</p>
          <p className="text-3xl font-extrabold text-cyan-400">{(compressionSavingsRatio * 100).toFixed(1)}%</p>
          <p className="text-xs text-cyan-500/80 mt-1">Ockham Surprisal Engine</p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Hardware Isolation</p>
          <p className="text-xl font-bold text-purple-400 mt-1">{enclaveTechnology}</p>
          <p className="text-xs text-purple-500/80 mt-1">Memory Encryption Active</p>
        </div>
      </div>
    </div>
  );
}
