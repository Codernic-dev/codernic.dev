// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { IDagSequenceStrategy } from '../i-dag-sequence';
import type { DagNode } from '../../types';

export class StepFailedStrategy implements IDagSequenceStrategy<{
  node_id: string;
  error: string;
}> {
  execute(currentNodes: DagNode[], payload: { node_id: string; error: string }): DagNode[] {
    return currentNodes.map((n) =>
      n.id === payload.node_id ? { ...n, status: 'failed', errorLog: payload.error } : n,
    );
  }
}
