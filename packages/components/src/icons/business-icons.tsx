import type { CSSProperties, ReactNode } from 'react';
import type { PillarName } from '../atoms/alphanumeric-badge';

export interface BusinessIconProps {
  size?: number;
  color?: string;
  pillar?: PillarName;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
  'data-testid'?: string;
}

const pillarColorMap: Record<PillarName, string> = {
  amber: 'var(--amber-400)',
  deming: 'var(--pillar-deming)',
  ragtime: 'var(--pillar-ragtime)',
  galileus: 'var(--pillar-galileus)',
  ockham: 'var(--pillar-ockham)',
  pirsig: 'var(--pillar-pirsig)',
};

const BaseIcon = function ({
  size = 24,
  color,
  pillar,
  strokeWidth = 1.5,
  children,
  style,
  className = '',
  'data-testid': testId,
}: BusinessIconProps & { children: ReactNode }): ReactNode {
  const iconColor = color || (pillar ? pillarColorMap[pillar] : 'currentColor');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      data-testid={testId}
    >
      {children}
    </svg>
  );
};

/** Deming Engine — Bare-metal GPU Host & Compute Icon */
export const DemingGPUHostIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="deming" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <path d="M8 1v2M16 1v2M8 21v2M16 21v2M1 8h2M1 16h2M21 8h2M21 16h2" />
    </BaseIcon>
  );
};

/** Ragtime Vault — Semantic Vector AST & Embedding Ray Icon */
export const VectorVaultIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="ragtime" {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5l7 0M7.5 8.5l3.5 7M16.5 8.5l-3.5 7" />
    </BaseIcon>
  );
};

/** Galileus Arbitrator — Multi-Agent DAG Pipeline Lock Icon */
export const DAGPipelineLockIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="galileus" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" />
    </BaseIcon>
  );
};

/** Ockham Compressor — Token Compression & Savings Icon */
export const LocalQuantizationIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="ockham" {...props}>
      <path d="M4 14l8-8 8 8" />
      <path d="M4 18l8-8 8 8" />
      <line x1="12" y1="2" x2="12" y2="10" />
    </BaseIcon>
  );
};

/** Pirsig DLP — Dual-Pass Secret Scrubber & Firewall Icon */
export const DLPScrubberIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="pirsig" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </BaseIcon>
  );
};

/** AirGap Status — Sovereign Isolated Perimeter Icon */
export const AirGapStatusIcon = function (props: BusinessIconProps): ReactNode {
  return (
    <BaseIcon pillar="amber" {...props}>
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </BaseIcon>
  );
};
