// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { CodernicMode } from '../../../../../codernic-ext/src/features/codernic/model/codernic-mode.types';
import { IconThought, IconFileText, IconZap, IconLayers, IconActivity } from '@codernic/components';
import { Dropdown } from '@codernic/components';
import { useTestId } from '@codernic/components';

type IconComponent = (props: { size?: number; className?: string; 'data-testid'?: string }) => JSX.Element;

const MODE_ICONS: Record<CodernicMode, IconComponent> = {
  brainstorm: IconThought as unknown as IconComponent,
  plan: IconFileText as unknown as IconComponent,
  builder: IconZap as unknown as IconComponent,
  journey: IconLayers as unknown as IconComponent,
  analyse: IconActivity as unknown as IconComponent,
  agent: IconThought as unknown as IconComponent,
};

interface ModeDropdownProps {
  mode: CodernicMode;
  onChange: (mode: CodernicMode) => void;
  dataTestId?: string;
  'data-demo-desc'?: string;
}

export function ModeDropdown({ dataTestId, 'data-demo-desc': dataDemoDesc, mode, onChange }: ModeDropdownProps) {
  
  const { rootId, getTestId } = useTestId('mode-dropdown', dataTestId);
const CurrentIcon = MODE_ICONS[mode];

  const trigger = (
    <div 
      title={`Current mode: ${mode}`}
      className="p-1 flex items-center justify-center text-amber-500 hover:bg-zinc-800/50 rounded transition-colors"
      data-testid={`mode-trigger-${mode}`}
    >
      <CurrentIcon size={16} />
    </div>
  );

  return (
    <div data-testid={dataTestId || "mode-dropdown"} data-demo-desc={dataDemoDesc} className="inline-block">
      <Dropdown 
        trigger={trigger} 
        width="w-auto" 
        contentClassName="p-1 flex flex-col gap-1 min-w-0"
        data-testid={getTestId('dropdown')}
        forceDirection="up"
      >
      {(Object.keys(MODE_ICONS) as CodernicMode[])
        .filter((m) => m !== 'plan')
        .map((m) => {
          const Icon = MODE_ICONS[m];
          const isActive = mode === m;
        return (
          <div
            key={m}
            onClick={() => onChange(m)}
            title={m}
            className={`p-1.5 rounded cursor-pointer flex items-center justify-center transition-colors ${
              isActive 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'bg-transparent text-amber-500 hover:bg-zinc-800'
            }`}
            data-testid={`mode-option-${m}`}
          >
            <Icon data-testid={getTestId('icon')} size={16} />
          </div>
        );
      })}
    </Dropdown>
    </div>
  );
}

