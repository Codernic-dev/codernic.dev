// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { put, delay, fork, join } from 'redux-saga/effects';

export interface DagNodeMock {
  id: string;
  role: string;
  dependencies: string[];
  durationMs: number;
}

export class SandboxSimulationEngine {
  /**
   * DAG Runner: Simulates resolving a dependency graph with parallel execution
   */
  static *runDag(nodes: DagNodeMock[]): Generator<any, void, any> {
    const state = new Map<string, 'pending' | 'running' | 'completed'>();
    
    // Initialize state
    nodes.forEach(n => state.set(n.id, 'pending'));
    
    // Emit initialization
    yield put({
      type: 'WS/codernic:agent-event',
      payload: { 
        type: 'dag_initialized', 
        payload: { nodes: nodes.map(n => ({ id: n.id, role: n.role, dependencies: n.dependencies })) },
        timestamp: Date.now()
      }
    });

    const runNodeTask = function* (node: DagNodeMock): Generator<any, void, any> {
      // step_start
      yield put({
        type: 'WS/codernic:agent-event',
        payload: {
          type: 'step_start',
          step_id: node.id,
          payload: { role: node.role },
          timestamp: Date.now()
        }
      });

      // Simulate work
      yield delay(node.durationMs);

      // step_success
      yield put({
        type: 'WS/codernic:agent-event',
        payload: {
          type: 'step_success',
          step_id: node.id,
          timestamp: Date.now()
        }
      });
      
      state.set(node.id, 'completed');
    };

    while (Array.from(state.values()).some(s => s !== 'completed')) {
      const readyNodes = nodes.filter(n => 
        state.get(n.id) === 'pending' && 
        n.dependencies.every(dep => state.get(dep) === 'completed')
      );

      if (readyNodes.length > 0) {
        const tasks = [];
        for (const node of readyNodes) {
          state.set(node.id, 'running');
          tasks.push(yield fork(runNodeTask, node));
        }
        yield join(tasks);
      } else {
        // Safety delay to prevent infinite loop if graph is stuck
        yield delay(50);
      }
    }
  }
}
