// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { Button } from '@codernic/components';
import { IconSave, IconLoader } from '@codernic/components';
import { JsonObjectEditor } from './JsonObjectEditor';
import type { JsonEditorSchema } from './types';
import { useTestId } from '@codernic/components';

export interface JsonAccordionEditorProps {
  value: object;
  onChange: (newValue: object) => void;
  onSave?: () => void;
  isSaving?: boolean;
  schema?: JsonEditorSchema;
  dataTestId?: string;
}

export function JsonAccordionEditor({ dataTestId, value, onChange, onSave, isSaving, schema = {} }: JsonAccordionEditorProps) {
  
  const { rootId, getTestId } = useTestId('json-accordion-editor', dataTestId);
return (
    <div className="flex flex-col h-full w-full bg-[#111111] border border-[#27272a] rounded overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <JsonObjectEditor data-testid={getTestId('json-object-editor')} value={value} onChange={onChange} schema={schema} />
      </div>
      {onSave && (
        <div className="p-3 bg-[#09090b] border-t border-[#27272a] flex justify-end">
          <Button data-testid={getTestId('button')} 
            onClick={onSave} 
            disabled={isSaving} 
            variant="ghost" 
            size="sm"
            style={{ color: 'var(--amber-400)', border: '1px solid var(--border)', padding: '6px' }}
            title="Save Configuration"
          >
            {isSaving ? <IconLoader data-testid={getTestId('icon-loader')} size={14} className="animate-spin" /> : <IconSave data-testid={getTestId('icon-save')} size={14} />}
          </Button>
        </div>
      )}
    </div>
  );
}
