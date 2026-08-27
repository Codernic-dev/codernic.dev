// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useSelector } from 'react-redux';
import { selectIntrospectionEvents } from '../../store/dag.slice';
import { ErathosCanvas } from '../../../../widgets/dag-pipeline/ui/ErathosCanvas';
import { useVBlockContext } from '@codernic/components/layout-engine';
import { ErathosToolbar } from './ErathosToolbar';
import { createPortal } from 'react-dom';
import { useTestId } from '@codernic/components';

interface GalileusTopologyWidgetProps {
  dataTestId?: string;
}

export function GalileusTopologyWidget({ dataTestId }: GalileusTopologyWidgetProps) {
  const { getTestId } = useTestId('galileus-topology-widget', typeof dataTestId !== 'undefined' ? dataTestId : undefined);
  const introspectionEvents = useSelector(selectIntrospectionEvents);
  const vblockCtx = useVBlockContext();

  // Wait for at least a dag_initialized event before mounting the canvas.
  // Topology is managed entirely by Structura via MCP structura_inject_schema —
  // we no longer gate on erathosSchema (WorkspaceState) in Redux.
  const hasDag = introspectionEvents.some((e) => e.type === 'dag_initialized');

  if (!hasDag) {
    return (
      <div data-testid={dataTestId || 'default-galileus-topology-widget'} className="flex flex-col items-center justify-center h-full text-[#71717a] italic text-sm p-4">
        Waiting for Supervisor to generate DAG topology...
      </div>
    );
  }

  // Canvas mounts once — topology updates arrive via MCP SSE push (structura_inject_schema).
  // No initialState needed: Structura owns the rendering state.
  return (
    <div data-testid={dataTestId || 'default-galileus-topology-widget'} className="w-full h-full bg-[#0d0d0f] relative overflow-hidden">
      {vblockCtx?.headerPortalRef?.current && createPortal(
        <ErathosToolbar />,
        vblockCtx.headerPortalRef.current
      )}
      <ErathosCanvas data-testid={getTestId('erathos-canvas')} readOnly={true} hideHeader={true} appearance="black" enableScrollZoom={false} allowMultipleSchemas={false} disableLocalStorage={true} fitToScreen={true} />
    </div>
  );
}
