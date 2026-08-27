// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

/* eslint-disable @typescript-eslint/no-explicit-any */
export type NodeStatus = 'pending' | 'running' | 'success' | 'failed';

export interface DagNode {
  id: string;
  role: string;
  status: NodeStatus;
  dependencies: string[];
  description?: string;
  errorLog?: string;
}

export interface RawDagNode {
  id: string;
  role: string;
  status: unknown;
  dependencies?: string[];
  description?: string;
}

export interface IDagSequenceStrategy<T = unknown> {
  execute: (currentNodes: DagNode[], payload: T) => DagNode[];
}

export const normalizeStatus = (rustStatus: unknown): { status: NodeStatus; error?: string } => {
  if (typeof rustStatus === 'string') {
    const s = rustStatus.toLowerCase();
    if (s === 'pending' || s === 'running' || s === 'completed' || s === 'success') {
      return { status: s === 'success' ? 'success' : (s as NodeStatus) };
    }
  } else if (typeof rustStatus === 'object' && rustStatus !== null) {
    if ('Failed' in rustStatus) {
      return { status: 'failed', error: (rustStatus as any).Failed };
    }
  }
  return { status: 'pending' };
};
