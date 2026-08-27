// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useMemo, useEffect } from 'react';
import { LayoutProvider, useLayoutEngine } from '../context';
import { VBlock } from '../components/VBlock';
import { WidgetHub } from '../components/WidgetHub';
import { LayoutToolbar } from '../components/LayoutToolbar';
import type { LayoutEngineStrategy } from '../strategy/types';
import type { BlockState } from '../types';

interface LayoutEngineTemplateProps {
  strategy: LayoutEngineStrategy;
  title?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

function LayoutStorageSync({ storageKey }: { storageKey: string }) {
  const { state } = useLayoutEngine();

  useEffect(() => {
    if (storageKey && state.blocks) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state.blocks));
      } catch (e) {
        console.warn(`[LayoutEngine] Failed to persist layout to localStorage (${storageKey}):`, e);
      }
    }
  }, [state.blocks, storageKey]);

  return null;
}

function InnerLayoutContent({
  strategy,
  headerContent,
  footerContent,
  storageKey,
}: {
  strategy: LayoutEngineStrategy;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  storageKey: string;
}) {
  const { dispatch } = useLayoutEngine();

  const handleResetLayout = React.useCallback(() => {
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.warn(`[LayoutEngine] Failed to clear storageKey (${storageKey})`, e);
      }
    }
    dispatch({ type: 'SET_LAYOUT', payload: { blocks: strategy.defaultLayout as any } });
  }, [dispatch, strategy, storageKey]);

  return (
    <>
      <LayoutStorageSync storageKey={storageKey} />
      <div className="flex flex-col w-full h-full min-h-screen bg-black overflow-hidden relative font-sans">
        {/* Optional Custom Header Bar */}
        {headerContent && <div className="relative z-20 flex-shrink-0">{headerContent}</div>}

        {/* Toolbar & Main VBlock Space */}
        <div className="flex flex-1 w-full min-h-0 relative">
          <WidgetHub widgetRegistry={strategy.widgetRegistry} />
          <div className="flex-1 p-2 h-full relative z-0 flex flex-col min-h-0">
            <LayoutToolbar activeLayoutName={strategy.name} onResetLayout={handleResetLayout} />
            <div className="flex-1 min-h-0 pt-2 relative overflow-hidden">
              <VBlock id="root" />
            </div>
          </div>
        </div>

        {/* Optional Custom Footer Bar */}
        {footerContent && <div className="relative z-20 flex-shrink-0">{footerContent}</div>}
      </div>
    </>
  );
}

export function LayoutEngineTemplate({
  strategy,
  title,
  headerContent,
  footerContent,
}: LayoutEngineTemplateProps): React.ReactElement {
  const storageKey = useMemo(
    () => strategy.storageKey || `codernic_layout_${strategy.name}`,
    [strategy]
  );

  const getRequiredActors = React.useCallback(
    (widgetType: string) => {
      const config = strategy.widgetRegistry[widgetType];
      return config ? config.requiredActors || [] : [];
    },
    [strategy]
  );

  const renderWidget = React.useCallback(
    (block: BlockState) => {
      if (strategy.renderWidget && block.widgetType) {
        return strategy.renderWidget(block.widgetType, block.widgetState);
      }
      const config = block.widgetType ? strategy.widgetRegistry[block.widgetType] : null;
      if (!config) {
        return (
          <div className="p-4 text-xs font-mono text-zinc-500">
            Unknown widget type: {block.widgetType || 'unspecified'}
          </div>
        );
      }
      const WidgetComponent = config.component;
      return <WidgetComponent {...(block.widgetState || {})} />;
    },
    [strategy]
  );

  const initialBlocks = useMemo(() => {
    if (typeof window !== 'undefined' && storageKey) {
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object' && parsed.root) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn(`[LayoutEngine] Failed to load cached layout for ${storageKey}:`, e);
      }
    }
    return strategy.defaultLayout;
  }, [strategy, storageKey]);

  const layoutState = useMemo(
    () => ({
      isEditMode: false,
      rootId: 'root',
      blocks: initialBlocks,
      getWidgetConfig: (widgetType: string) => strategy.widgetRegistry[widgetType],
    }),
    [strategy, initialBlocks]
  );

  return (
    <LayoutProvider
      renderWidget={renderWidget}
      initialState={layoutState}
      getRequiredActors={getRequiredActors}
    >
      <InnerLayoutContent
        strategy={strategy}
        headerContent={headerContent}
        footerContent={footerContent}
        storageKey={storageKey}
      />
    </LayoutProvider>
  );
}
