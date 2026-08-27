import type { CSSProperties, ReactNode } from 'react';

export type PillarName = 'deming' | 'ragtime' | 'galileus' | 'ockham' | 'pirsig' | 'amber';

export interface AlphanumericBadgeProps {
  /** Single alphanumeric character or symbol (e.g. '1', 'A', '#') */
  char: string | number;
  /** Pillar theme key */
  pillar?: PillarName;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom inline style */
  style?: CSSProperties;
  /** Optional custom CSS class */
  className?: string;
  /** Optional test id */
  'data-testid'?: string;
}

const sizeMap = {
  sm: { box: 24, font: 11 },
  md: { box: 32, font: 14 },
  lg: { box: 40, font: 18 },
};

const pillarColors: Record<PillarName, { border: string; bg: string; text: string }> = {
  amber:    { border: 'rgba(251, 191, 36, 0.4)',  bg: 'rgba(251, 191, 36, 0.12)',  text: 'var(--amber-400)' },
  deming:   { border: 'rgba(248, 113, 113, 0.4)', bg: 'rgba(248, 113, 113, 0.12)', text: 'var(--pillar-deming)' },
  ragtime:  { border: 'rgba(96, 165, 250, 0.4)',  bg: 'rgba(96, 165, 250, 0.12)',  text: 'var(--pillar-ragtime)' },
  galileus: { border: 'rgba(74, 222, 128, 0.4)', bg: 'rgba(74, 222, 128, 0.12)', text: 'var(--pillar-galileus)' },
  ockham:   { border: 'rgba(45, 212, 191, 0.4)',  bg: 'rgba(45, 212, 191, 0.12)',  text: 'var(--pillar-ockham)' },
  pirsig:   { border: 'rgba(167, 139, 250, 0.4)', bg: 'rgba(167, 139, 250, 0.12)', text: 'var(--pillar-pirsig)' },
};

export const AlphanumericBadge = function ({
  char,
  pillar = 'amber',
  size = 'md',
  style,
  className = '',
  'data-testid': testId,
}: AlphanumericBadgeProps): ReactNode {
  const { box, font } = sizeMap[size] || sizeMap.md;
  const colors = pillarColors[pillar] || pillarColors.amber;

  return (
    <div
      style={{
        width: box,
        height: box,
        fontSize: font,
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        color: colors.text,
        lineHeight: 1,
        flexShrink: 0,
        ...style,
      }}
      className={`codernic-glyph-badge ${className}`}
      data-testid={testId}
    >
      {String(char).toUpperCase()}
    </div>
  );
};
