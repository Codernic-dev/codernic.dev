// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntrospectionEvents } from '../../store/dag.slice';
import { DawLanesSequencer } from './DawLanesSequencer';
import type { DawNodeState } from './DawLanesSequencer';
import { useTestId } from '@codernic/components';
import { useDispatch } from 'react-redux';

export function GalileusDawWidget({ dataTestId }: { dataTestId?: string }) {
  const { rootId, getTestId } = useTestId('galileus-daw-widget', dataTestId);
  const events = useSelector(selectIntrospectionEvents);
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  const { nodes, minTime } = useMemo(() => {
    let currentNodes: Record<string, DawNodeState> = {};
    let minT = Infinity;

    events.forEach(evt => {
      const innerPayload = (evt.payload as any) || {};
      const type = evt.type;

      if (type === 'dag_initialized') {
        currentNodes = {};
        const initNodes = Array.isArray(innerPayload.nodes) ? innerPayload.nodes : [];
        initNodes.forEach((n: any) => {
          currentNodes[n.id] = {
            id: n.id,
            role: n.role,
            status: 'pending',
            dependencies: n.dependencies || []
          };
        });
      } else if (type === 'step_start') {
        const nodeId = innerPayload.node_id || evt.step_id;
        if (nodeId && currentNodes[nodeId]) {
          currentNodes[nodeId].status = 'running';
          currentNodes[nodeId].startTime = evt.timestamp;
        }
      } else if (type === 'step_success') {
        const nodeId = innerPayload.node_id || evt.step_id;
        if (nodeId && currentNodes[nodeId]) {
          currentNodes[nodeId].status = 'completed';
          currentNodes[nodeId].endTime = evt.timestamp;
        }
      } else if (type === 'dag_mutation') {
        if (innerPayload.type === 'node_added' && innerPayload.node) {
          const n = innerPayload.node;
          currentNodes[n.id] = {
            id: n.id,
            role: n.role,
            status: 'pending',
            dependencies: n.dependencies || []
          };
        }
      }

      if (evt.timestamp < minT) minT = evt.timestamp;
    });

    return { nodes: currentNodes, minTime: minT === Infinity ? Date.now() : minT };
  }, [events]);

  React.useEffect(() => {
    let frameId: number;
    const isRunning = Object.values(nodes).some(n => n.status === 'running');
    if (isRunning) {
      const update = () => {
        setCurrentTime(Date.now());
        frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
    } else {
      setCurrentTime(Date.now()); // Final update
    }
    return () => cancelAnimationFrame(frameId);
  }, [nodes]);

  return (
    <div data-testid={getTestId('root')} className="w-full h-full bg-[#0d0d0f] relative overflow-hidden">
      <DawLanesSequencer 
        data-testid={getTestId('sequencer')} 
        nodes={Object.values(nodes)} 
        currentTime={currentTime}
        minTime={minTime}
      />
    </div>
  );
}
