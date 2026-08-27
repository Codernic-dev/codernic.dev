// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useState } from 'react';
import type { CodernicMode } from '../../../../../../codernic-ext/src/features/codernic/model/codernic-mode.types';
import type { JourneyPhase } from '../../../../../../codernic-ext/src/features/codernic/model/journey-state';
import type { InferenceMetrics, SelectOption } from '../../../../entities/kernel/model/types';
import { ChatInputGlowWrapper, useTestId } from '@codernic/components';
import { ChatInputHeader } from '../molecules/ChatInputHeader';
import { ChatInputTextarea } from '../molecules/ChatInputTextarea';
import { ChatInputToolbar } from '../molecules/ChatInputToolbar';

export interface ChatInputProps {
  sessionName?: string;
  mode: CodernicMode;
  onSend: (text: string) => void;
  onAbort: () => void;
  sending: boolean;
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
  metrics: InferenceMetrics | null;
  isPlanFrozen?: boolean;
  dataTestId?: string;
  'data-demo-desc'?: string;
}

export function ChatInput({
  dataTestId,
  'data-demo-desc': dataDemoDesc,
  sessionName,
  mode,
  onSend,
  onAbort,
  sending,
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
}: ChatInputProps): JSX.Element {
  const { getTestId } = useTestId('chat-input', dataTestId);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || sending) return;
    onSend(input);
    setInput('');
  };

  return (
    <div
      className="flex-shrink-0 p-4 border-t border-[var(--border)] bg-[#131316]"
      data-testid={dataTestId || 'chat-input'}
      data-demo-desc={dataDemoDesc}
    >
      <ChatInputGlowWrapper data-testid={getTestId('chat-input-glow-wrapper')} sending={sending}>
        <ChatInputHeader data-testid={getTestId('chat-input-header')} sessionName={sessionName} />

        <ChatInputTextarea
          input={input}
          setInput={setInput}
          onSend={handleSend}
          sending={sending}
          mode={mode}
          builderSubMode={builderSubMode}
          dataTestId={getTestId('textarea')}
        />

        <ChatInputToolbar
          mode={mode}
          onModeChange={onModeChange}
          builderSubMode={builderSubMode}
          onTransitionToDag={onTransitionToDag}
          journeyPhase={journeyPhase}
          llmLoading={llmLoading}
          llmOptions={llmOptions}
          sessionLlm={sessionLlm}
          onLlmChange={onLlmChange}
          routeProfiles={routeProfiles}
          routeProfile={routeProfile}
          onRouteProfileChange={onRouteProfileChange}
          isAutoPilot={isAutoPilot}
          onAutopilotToggle={onAutopilotToggle}
          useRag={useRag}
          onUseRagToggle={onUseRagToggle}
          isPlanFrozen={isPlanFrozen}
          sending={sending}
          hasInput={Boolean(input.trim())}
          onSend={handleSend}
          onAbort={onAbort}
          dataTestId={getTestId('toolbar')}
        />
      </ChatInputGlowWrapper>
    </div>
  );
}
