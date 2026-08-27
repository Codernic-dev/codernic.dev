// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import type { CodernicMode } from '../../../../../../codernic-ext/src/features/codernic/model/codernic-mode.types';
import type { JourneyPhase } from '../../../../../../codernic-ext/src/features/codernic/model/journey-state';
import type { SelectOption } from '../../../../entities/kernel/model/types';
import { AutopilotToggle, ModeDropdown } from '../../../mode-selector';
import { ModelDropdown } from '../../../models/components/molecules/model-dropdown';
import { Button, useTestId } from '@codernic/components';
import { WorkflowEngine } from '../../store/WorkflowEngine';

export interface ChatInputToolbarProps {
  mode: CodernicMode;
  onModeChange: (mode: CodernicMode) => void;
  builderSubMode?: 'manuel' | 'automatic' | 'dag';
  onTransitionToDag?: () => void;
  journeyPhase: JourneyPhase;
  llmLoading: boolean;
  llmOptions: SelectOption[];
  sessionLlm: string;
  onLlmChange: (llm: string) => void;
  routeProfiles: SelectOption[];
  routeProfile: string;
  onRouteProfileChange: (p: string) => void;
  isAutoPilot: boolean;
  onAutopilotToggle: () => void;
  useRag: boolean;
  onUseRagToggle: () => void;
  isPlanFrozen?: boolean;
  sending: boolean;
  hasInput: boolean;
  onSend: () => void;
  onAbort: () => void;
  dataTestId?: string;
}

export function ChatInputToolbar({
  mode,
  onModeChange,
  builderSubMode,
  onTransitionToDag,
  journeyPhase,
  llmLoading,
  llmOptions,
  sessionLlm,
  onLlmChange,
  routeProfiles,
  routeProfile,
  onRouteProfileChange,
  isAutoPilot,
  onAutopilotToggle,
  useRag,
  onUseRagToggle,
  isPlanFrozen = false,
  sending,
  hasInput,
  onSend,
  onAbort,
  dataTestId,
}: ChatInputToolbarProps): JSX.Element {
  const { rootId, getTestId } = useTestId('chat-input-toolbar', dataTestId);

  return (
    <div className="flex items-center justify-between mt-3" data-testid={rootId}>
      <div className="flex items-center gap-2">
        <ModeDropdown
          dataTestId="chat-mode-selector"
          data-demo-desc="[CODER] Switch seamlessly between different cognitive modes (Brainstorm, Plan, Builder, etc.)."
          mode={mode}
          onChange={onModeChange}
        />

        {mode === 'journey' && (
          <span className="text-[10px] font-mono font-bold bg-[#818cf826] text-[#818cf8] py-0.5 px-1.5 rounded">
            Phase {journeyPhase}
          </span>
        )}

        {mode === 'plan' &&
          onTransitionToDag &&
          WorkflowEngine.isElementVisible('implement-now-button', mode, isPlanFrozen) && (
            <Button
              data-testid="implement-now-button"
              size="sm"
              variant="outline"
              className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
              onClick={onTransitionToDag}
            >
              Implement Now
            </Button>
          )}

        {mode === 'builder' && builderSubMode === 'dag' && (
          <span className="text-[10px] font-mono font-bold bg-red-500/20 text-red-400 py-0.5 px-1.5 rounded">
            DAG
          </span>
        )}

        <ModelDropdown
          data-testid={getTestId('model-dropdown')}
          data-demo-desc-provider="[CODER] Select LLM providers on the fly."
          data-demo-desc-model="[CODER] Swap between available model options for the selected provider."
          llmOptions={llmOptions}
          sessionLlm={sessionLlm}
          onChange={onLlmChange}
          loading={llmLoading}
          routeProfiles={routeProfiles}
          routeProfile={routeProfile}
          onRouteProfileChange={onRouteProfileChange}
        />

        {!(mode === 'builder' && builderSubMode === 'dag') && (
          <AutopilotToggle
            data-testid={getTestId('autopilot-toggle')}
            data-demo-desc="[CODER] Toggle full autonomous execution mode."
            isAutoPilot={isAutoPilot}
            onToggle={onAutopilotToggle}
          />
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onUseRagToggle}
          title={
            useRag
              ? 'Disable RAG (Retrieval-Augmented Generation context)'
              : 'Enable RAG (Retrieval-Augmented Generation context)'
          }
          className={`transition-all ${useRag ? 'opacity-100' : 'opacity-40 grayscale'}`}
          data-testid={getTestId('rag-toggle')}
          data-demo-desc="[CODER] Toggle Retrieval-Augmented Generation (RAG) for codebase semantic context."
        >
          <div
            className={`flex items-center justify-center w-[18px] h-[18px] rounded font-mono text-[10px] font-bold ${
              useRag
                ? 'bg-[var(--amber-glow)] text-[var(--amber-400)] border border-amber-500/30'
                : 'bg-transparent text-[var(--text-muted)] border border-[var(--border)]'
            }`}
          >
            R
          </div>
        </Button>
      </div>

      {sending ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onAbort}
          title="Stop Generation"
          className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
          data-testid={getTestId('abort-button')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="send-btn"
          onClick={onSend}
          disabled={!hasInput}
          title="Send Message"
          data-testid="chat-send-button"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="send-btn-circle absolute w-5 h-5 rounded-full border-2 border-[var(--amber-500)]" />
            <div
              className="send-btn-circle absolute w-2 h-2 rounded-full bg-[var(--amber-500)]"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        </Button>
      )}
    </div>
  );
}
