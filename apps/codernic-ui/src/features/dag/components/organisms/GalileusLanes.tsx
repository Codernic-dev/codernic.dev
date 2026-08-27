// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIntrospectionEvents } from '../../store/dag.slice';
import type { AgentIntrospectionEvent } from '../../../../entities/kernel/model/types';
import { LaneCard } from '@codernic/components';

export interface GalileusLanesProps {
  widgetId?: string;
  dataTestId?: string;
}

export function GalileusLanes({ dataTestId }: GalileusLanesProps): JSX.Element {
  const events = useSelector(selectIntrospectionEvents);

  // Parse and group introspection events by agent
  const { agents, arbitration } = useMemo(() => {
    const agentsMap: Record<string, AgentIntrospectionEvent[]> = {};
    const arbitrationEvents: AgentIntrospectionEvent[] = [];

    events.forEach((evt) => {
      if (evt.type.includes('route') || evt.type.includes('galileus') || evt.type === 'dag_mutation') {
        arbitrationEvents.push(evt);
      } else {
        const agentName = (evt.payload as { tool_name?: string })?.tool_name || evt.step_id || 'Worker Agent';
        const normalizedName = agentName.split('-')[0] || agentName;
        
        if (!agentsMap[normalizedName]) {
          agentsMap[normalizedName] = [];
        }
        agentsMap[normalizedName].push(evt);
      }
    });

    return { agents: agentsMap, arbitration: arbitrationEvents };
  }, [events]);

  return (
    <div
      data-testid={dataTestId || 'galileus-lanes'}
      className="flex-1 w-full flex overflow-x-auto overflow-y-hidden bg-[#0d0d0f] p-2 gap-3 scrollbar-hide"
    >
      {/* Agents Lanes */}
      {Object.entries(agents).map(([agentName, agentEvents], idx) => (
        <LaneCard
          key={agentName}
          title={agentName}
          badgeText={`LANE ${idx + 1}`}
          badgeVariant="cyan"
        >
          {agentEvents.length === 0 ? (
            <div className="text-xs text-zinc-500 italic">Awaiting instructions...</div>
          ) : (
            agentEvents.map((evt, i) => (
              <div key={i} className="flex flex-col p-3 bg-[#1a1a1c] border border-zinc-800/80 rounded-lg">
                <span className="text-[10px] text-zinc-500 font-mono mb-1">
                  {new Date(evt.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-xs text-zinc-300 font-semibold">{evt.type}</span>
                {evt.delta && (
                  <span className="text-[11px] text-zinc-400 mt-1 line-clamp-3">{evt.delta}</span>
                )}
              </div>
            ))
          )}
        </LaneCard>
      ))}

      {/* Galileus Arbitration Lane */}
      <LaneCard
        title="Galileus Arbitrator"
        badgeText="ARBITRATOR"
        badgeVariant="amber"
      >
        {arbitration.length === 0 ? (
          <div className="text-xs text-zinc-500 italic text-center mt-10">Monitoring swarm...</div>
        ) : (
          arbitration.map((evt, i) => (
            <div
              key={i}
              className="flex flex-col p-3 bg-amber-950/10 border border-amber-900/30 rounded-lg relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600/50" />
              <span className="text-[10px] text-zinc-500 font-mono mb-1">
                {new Date(evt.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-xs text-amber-400 font-semibold">{evt.type}</span>
              {evt.delta && <span className="text-[11px] text-zinc-300 mt-1">{evt.delta}</span>}
            </div>
          ))
        )}
      </LaneCard>
    </div>
  );
}
