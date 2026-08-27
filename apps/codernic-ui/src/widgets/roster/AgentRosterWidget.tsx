// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import type { AgentState } from '../../features/roster/store/roster.slice';
import { Card } from '@codernic/components/molecules/card';
import { Badge } from '@codernic/components/atoms/badge';
import { Heading } from '@codernic/components/atoms/heading';
import { Text } from '@codernic/components/atoms/text';

export interface AgentRosterWidgetProps {
  className?: string;
}

export const AgentRosterWidget = ({ className = '' }: AgentRosterWidgetProps): JSX.Element => {
  const dispatch = useDispatch();
  const { agents, isLoading, error } = useSelector((state: RootState) => state.roster);

  useEffect(() => {
    // Dispatch an initial fetch if needed
    dispatch({ type: 'roster/fetchInitialData' });
  }, [dispatch]);

  return (
    <Card className="flex flex-col w-full h-full p-4 overflow-y-auto">
      <Heading level={3} className="mb-4">Agent Roster</Heading>
      
      {isLoading && (
        <div className="flex justify-center items-center h-16">
          <Text>Loading roster...</Text>
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4">
          <Text>Error: {error}</Text>
        </div>
      )}

      <div className="space-y-3">
        {agents.map((agent: AgentState) => (
          <div key={agent.id} className="flex justify-between items-center p-3 border rounded border-border bg-background">
            <div className="flex flex-col">
              <Text className="font-semibold">{agent.id}</Text>
              <Text className="text-sm text-muted-foreground">{agent.role}</Text>
            </div>
            <div>
              <Badge 
                variant={
                  agent.status === 'Ready' ? 'success' : 
                  agent.status === 'Training' ? 'warning' : 'default'
                }
              >
                {agent.status}
              </Badge>
            </div>
          </div>
        ))}
        {!isLoading && agents.length === 0 && (
          <Text className="text-muted-foreground italic">No agents active.</Text>
        )}
      </div>
    </Card>
  );
};
