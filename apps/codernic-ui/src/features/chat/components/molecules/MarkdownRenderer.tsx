// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDispatch } from 'react-redux';
import { sendIntent } from '../../../../shared/store/intent';
import { CodeBlock } from '@codernic/components';
import { ErathosCanvas } from '../../../../widgets/dag-pipeline/ui/ErathosCanvas';
import { PirsigReportWidget } from '../../../diagnostic-dashboard/widget/pirsig-report.widget';

export interface MarkdownRendererProps {
  content: string;
  dataTestId?: string;
}

export function MarkdownRenderer({ content, dataTestId }: MarkdownRendererProps): JSX.Element {
  const dispatch = useDispatch();

  const markdownComponents = {
    code(props: { children?: React.ReactNode; className?: string }) {
      const { children, className } = props;
      const match = /language-([\w-]+)/.exec(className || '');
      if (match && (match[1] === 'erathos-snapshot' || match[1] === 'json' || match[1] === 'structura')) {
        let parsedSchema: Record<string, unknown> | undefined = undefined;
        let isErathosSchema = false;
        try {
          const rawJson = String(children).replace(/\n$/, '');
          if (rawJson.trim()) {
            parsedSchema = JSON.parse(rawJson);
            if (
              parsedSchema &&
              typeof parsedSchema === 'object' &&
              ('nodes' in parsedSchema || 'version' in parsedSchema || 'workspace' in parsedSchema)
            ) {
              isErathosSchema = true;
            }
          }
        } catch {
          // Fallback silently
        }

        if (isErathosSchema || match[1] === 'erathos-snapshot') {
          return (
            <div
              data-testid="chat-message-schema"
              data-demo-desc="[CODER] Interactive schema canvas showing class diagrams and structural components."
              className="my-2 border border-zinc-800 rounded-xl overflow-hidden h-[300px] bg-black shadow-inner"
            >
              <ErathosCanvas
                data-testid="message-erathos-canvas"
                readOnly={true}
                hideHeader={true}
                appearance="black"
                enableScrollZoom={false}
                allowMultipleSchemas={false}
                disableLocalStorage={true}
                fitToScreen={true}
                initialState={parsedSchema}
              />
            </div>
          );
        }
      }
      if (match && match[1] === 'svg') {
        return (
          <div
            className="my-2 bg-white rounded-md overflow-hidden flex items-center justify-center p-4"
            dangerouslySetInnerHTML={{ __html: String(children).replace(/\n$/, '') }}
          />
        );
      }
      if (match && match[1] === 'pirsig-report') {
        return <PirsigReportWidget payloadStr={String(children).replace(/\n$/, '')} />;
      }
      return match ? (
        <CodeBlock code={String(children).replace(/\n$/, '')} language={match[1]} />
      ) : (
        <code className="font-mono text-[11px] bg-zinc-900 px-1 py-0.5 rounded text-zinc-300">
          {children}
        </code>
      );
    },
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (href && href.startsWith('file://')) {
        const cleanPath = href.replace('file://', '');
        return (
          <a
            {...props}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                sendIntent({
                  type: 'codernic:open-file',
                  payload: { filePath: cleanPath },
                })
              );
            }}
            className="text-blue-400 underline font-mono text-[11px]"
          >
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <ReactMarkdown
      data-testid={dataTestId}
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
