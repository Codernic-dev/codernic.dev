// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useState } from 'react';
import type { AssistantMsg, ChatMsg, PlanCtaMsg } from '../../../../entities/kernel/model/types';
import { DiagnosticCard } from '../molecules/diagnostic-card';
import { ToolBlock } from '../molecules/tool-block';
import { ThoughtBlock } from '../molecules/thought-block';
import { PlanCtaCard } from './plan-cta-card';
import { MessageHeader } from '../atoms/MessageHeader';
import { MessageMetricsFooter } from '../atoms/MessageMetricsFooter';
import { MarkdownRenderer } from '../molecules/MarkdownRenderer';
import { parseTextWithThoughts } from '../../../../shared/utils/markdown-parser';
import { useTestId, useHubEvent } from '@codernic/components';

export interface MessageCardProps {
  msg: ChatMsg;
  dataTestId?: string;
  'data-demo-desc'?: string;
}

export function MessageCard({
  dataTestId,
  'data-demo-desc': overrideDesc,
  msg,
}: MessageCardProps): JSX.Element {
  const { rootId, getTestId } = useTestId('message-card', dataTestId);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useHubEvent('codernic:focus-message', (event) => {
    if (event.payload.id === msg.id) {
      const el = document.getElementById(msg.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }
    }
  });

  // Plan CTA card — rendered inline in chat feed after the streamed plan
  if (msg.role === 'plan-cta') {
    const cta = msg as PlanCtaMsg;
    return <PlanCtaCard data-testid={getTestId('plan-cta-card')} cta={cta} />;
  }

  const msgAssistant = msg as AssistantMsg;
  const toolsCalls = msgAssistant?.toolCalls || [];

  return (
    <div
      id={msg.id}
      data-testid={dataTestId || 'message-card'}
      data-demo-desc={overrideDesc}
      className={`flex flex-col gap-1 py-2 mb-2 relative transition-all duration-300 ${
        isHighlighted ? 'bg-white/5 ring-1 ring-[var(--accent,#f59e0b)] rounded-md' : ''
      }`}
    >
      <MessageHeader messageId={msg.id} role={msg.role} />

      <div className="markdown-content flex flex-col gap-2 text-xs text-zinc-200 break-words">
        {parseTextWithThoughts(msg.text).map((block, idx, arr) => {
          if (block.type === 'thought') {
            const isStreaming = !block.isClosed && Boolean(msgAssistant?.streaming) && idx === arr.length - 1;
            return (
              <ThoughtBlock
                data-testid={getTestId('thought-block')}
                key={idx}
                id={`${msg.id}-thought-${block.thoughtIndex}`}
                content={block.content}
                streaming={isStreaming}
              />
            );
          }

          const textToRender = block.content + (msgAssistant?.streaming && idx === arr.length - 1 ? ' ▊' : '');
          if (!textToRender.trim() && !msgAssistant?.streaming) return null;

          return (
            <MarkdownRenderer
              key={idx}
              dataTestId={getTestId('react-markdown')}
              content={textToRender}
            />
          );
        })}
      </div>

      {toolsCalls.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1.5">
          {toolsCalls.map((tool) => (
            <ToolBlock
              data-testid={`${rootId}-tool-block`}
              key={tool.id}
              tool={tool}
            />
          ))}
        </div>
      )}

      {msg.diagnostic && (
        <DiagnosticCard data-testid={getTestId('diagnostic-card')} diagnostic={msg.diagnostic} />
      )}

      {msgAssistant?.metrics && <MessageMetricsFooter metrics={msgAssistant.metrics} />}
    </div>
  );
}
