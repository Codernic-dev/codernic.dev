// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import { HelpTooltipProps } from './help-tooltip.types';
import { IconHelpCircle } from './icons.js';

export function HelpTooltip({
  wikiUrl,
  tooltipText = 'Click to open documentation',
  dataTestId = 'help-tooltip',
}: HelpTooltipProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <a
      href={wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={tooltipText}
      data-testid={dataTestId}
      onClick={handleClick}
      className="inline-flex items-center justify-center p-0.5 text-[var(--text-muted)] hover:text-[var(--amber-400)] transition-colors rounded cursor-pointer"
    >
      <IconHelpCircle size={14} />
    </a>
  );
}
