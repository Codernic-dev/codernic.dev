// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useRef, useState, useEffect } from 'react';
import type { CodernicMode } from '../../../../../../codernic-ext/src/features/codernic/model/codernic-mode.types';
import { erathos } from '../../../../services/erathos';
import { AutocompleteMenu } from './autocomplete-menu';
import { useTestId } from '@codernic/components';

const MODE_UI_CONFIG: Record<CodernicMode, { borderColor: string; placeholder: string }> = {
  brainstorm: {
    borderColor: 'var(--accent-ask, #3b82f6)',
    placeholder: 'Ask about your codebase… (safe Q&A mode, no command execution)',
  },
  plan: {
    borderColor: 'var(--accent-plan, #f59e0b)',
    placeholder: 'Describe what to build… (design mode, commands previewed but not executed)',
  },
  builder: {
    borderColor: 'var(--accent-builder, #ef4444)',
    placeholder: 'Create builder / run workflow… (full execution mode, use /help for commands)',
  },
  journey: {
    borderColor: 'var(--accent-journey, #818cf8)',
    placeholder: 'Talk to your BA… (/journey to start, /journey reset to clear)',
  },
  analyse: {
    borderColor: 'var(--accent-analyse, #06b6d4)',
    placeholder: '/analyse — extract codebase intelligence  ·  /analyse --force to re-run',
  },
  agent: {
    borderColor: 'var(--accent-ask, #3b82f6)',
    placeholder: 'Ask the Agent corporate knowledge… · Enter to send',
  },
};

export interface ChatInputTextareaProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  sending: boolean;
  mode: CodernicMode;
  builderSubMode?: 'manuel' | 'automatic' | 'dag';
  dataTestId?: string;
}

export function ChatInputTextarea({
  input,
  setInput,
  onSend,
  sending,
  mode,
  builderSubMode,
  dataTestId,
}: ChatInputTextareaProps): JSX.Element {
  const { rootId, getTestId } = useTestId('chat-input-textarea', dataTestId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIdx, setSuggestionIdx] = useState<number>(-1);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [savedDraft, setSavedDraft] = useState('');

  useEffect(() => {
    if (!input || input.trim() === '') {
      setSuggestions([]);
      setSuggestionIdx(-1);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const words = input.split(' ');
        const lastWord = words[words.length - 1];
        if (lastWord.length > 2) {
          const res = await erathos.getCompletions(input);
          setSuggestions(res.suggestions || []);
          setSuggestionIdx(-1);
        }
      } catch (e) {
        console.debug('Autocomplete ignored', e);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  const applySuggestion = (idx: number) => {
    if (idx >= 0 && idx < suggestions.length) {
      setInput(input + suggestions[idx]);
      setSuggestions([]);
      setSuggestionIdx(-1);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSuggestionIdx((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        return;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSuggestionIdx((prev) => (prev >= suggestions.length - 1 ? 0 : prev + 1));
        return;
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        applySuggestion(suggestionIdx === -1 ? 0 : suggestionIdx);
        return;
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSuggestions([]);
        return;
      }
    }

    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!input.trim() || sending) return;
      setPromptHistory((prev) => [...prev, input.trim()]);
      setHistoryIdx(-1);
      setSavedDraft('');
      onSend();
    } else if (e.key === 'ArrowUp' && (input.trim() === '' || historyIdx !== -1)) {
      if (promptHistory.length === 0) return;
      e.preventDefault();
      const newIdx = historyIdx === -1 ? promptHistory.length - 1 : Math.max(0, historyIdx - 1);
      if (historyIdx === -1) setSavedDraft(input);
      setHistoryIdx(newIdx);
      setInput(promptHistory[newIdx]);
    } else if (e.key === 'ArrowDown' && historyIdx !== -1) {
      e.preventDefault();
      const newIdx = historyIdx + 1;
      if (newIdx >= promptHistory.length) {
        setHistoryIdx(-1);
        setInput(savedDraft);
      } else {
        setHistoryIdx(newIdx);
        setInput(promptHistory[newIdx]);
      }
    }
  };

  const isDagActive = mode === 'builder' && builderSubMode === 'dag';

  return (
    <>
      <AutocompleteMenu
        data-testid={getTestId('autocomplete-menu')}
        suggestions={suggestions}
        suggestionIdx={suggestionIdx}
        onApply={applySuggestion}
        onHover={setSuggestionIdx}
      />
      <textarea
        data-testid="chat-textarea"
        ref={textareaRef}
        placeholder={
          isDagActive
            ? 'DAG execution in progress (Read-only)'
            : `${MODE_UI_CONFIG[mode]?.placeholder || 'Ask…'} · Ctrl+Enter to send`
        }
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        disabled={sending || isDagActive}
        className="w-full box-border min-h-[56px] max-h-[200px] p-0 text-[13px] leading-relaxed font-inherit bg-transparent text-[var(--vscode-input-foreground)] border-none resize-y outline-none disabled:opacity-50"
      />
    </>
  );
}
