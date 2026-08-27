import type { CSSProperties, ReactNode } from 'react';

export type IsisStatus = 'ok' | 'warning' | 'critical' | 'unknown' | 'online' | 'degraded' | 'offline';

export interface IsisHealthBadgeProps {
  status: IsisStatus;
  label?: string;
  style?: CSSProperties;
  className?: string;
  'data-testid'?: string;
}

const statusConfig: Record<IsisStatus, { bg: string; border: string; text: string; dot: string }> = {
  ok:       { bg: 'rgba(34, 197, 94, 0.12)',  border: 'rgba(34, 197, 94, 0.3)',  text: '#4ade80', dot: '#22c55e' },
  online:   { bg: 'rgba(34, 197, 94, 0.12)',  border: 'rgba(34, 197, 94, 0.3)',  text: '#4ade80', dot: '#22c55e' },
  warning:  { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#fbbf24', dot: '#f59e0b' },
  degraded: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#fbbf24', dot: '#f59e0b' },
  critical: { bg: 'rgba(239, 68, 68, 0.12)',  border: 'rgba(239, 68, 68, 0.3)',  text: '#f87171', dot: '#ef4444' },
  offline:  { bg: 'rgba(239, 68, 68, 0.12)',  border: 'rgba(239, 68, 68, 0.3)',  text: '#f87171', dot: '#ef4444' },
  unknown:  { bg: 'rgba(115, 115, 115, 0.12)', border: 'rgba(115, 115, 115, 0.3)', text: '#a3a3a3', dot: '#737373' },
};

export const IsisHealthBadge = function ({
  status,
  label,
  style,
  className = '',
  'data-testid': testId,
}: IsisHealthBadgeProps): ReactNode {
  const cfg = statusConfig[status] || statusConfig.unknown;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: '9999px',
        border: `1px solid ${cfg.border}`,
        backgroundColor: cfg.bg,
        color: cfg.text,
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'var(--mono, monospace)',
        ...style,
      }}
      className={`isis-health-badge ${className}`}
      data-testid={testId}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: cfg.dot,
          display: 'inline-block',
        }}
      />
      <span>{label || status.toUpperCase()}</span>
    </div>
  );
};

export interface IsisMetricBarProps {
  label: string;
  current: number;
  max: number;
  unit?: string;
  className?: string;
}

export const IsisMetricBar = function ({
  label,
  current,
  max,
  unit = '',
  className = '',
}: IsisMetricBarProps): ReactNode {
  const percentage = Math.min(100, Math.max(0, Math.round((current / max) * 100)));

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between text-xs font-mono text-zinc-400">
        <span>{label}</span>
        <span className="text-[#fbbf24] font-bold">
          {current} {unit} / {max} {unit} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface IsisDiagnosticCardProps {
  probeId: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  latencyMs: number;
  memoryRssMb: number;
  className?: string;
}

export const IsisDiagnosticCard = function ({
  probeId,
  status,
  latencyMs,
  memoryRssMb,
  className = '',
}: IsisDiagnosticCardProps): ReactNode {
  const isPass = status === 'PASS';
  const statusColor = isPass ? '#4ade80' : status === 'WARN' ? '#fbbf24' : '#f87171';

  return (
    <div className={`p-4 rounded-xl border border-zinc-800 bg-[#0d1117] ${className}`}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor }} />
          <h4 className="text-xs font-bold text-zinc-200 font-mono">{probeId}</h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
          STATUS: {status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <span className="text-zinc-500">Latency: </span>
          <span className="text-zinc-200 font-semibold">{latencyMs}ms</span>
        </div>
        <div>
          <span className="text-zinc-500">Memory RSS: </span>
          <span className="text-zinc-200 font-semibold">{memoryRssMb}MB</span>
        </div>
      </div>
    </div>
  );
};
