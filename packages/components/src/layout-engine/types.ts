// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export type Orientation = 'horizontal' | 'vertical';
export type VBlockBehavior = 'none' | 'accordion-top' | 'accordion-bottom' | 'panel-left' | 'panel-right' | 'full-screen';

export interface BlockState {
  id: string;
  type: 'vblock' | 'widget';
  // VBlock props
  orientation?: Orientation;
  childrenIds?: string[];
  ratios?: number[]; // Should sum to 1
  locked?: boolean;
  behavior?: VBlockBehavior;
  allowFullScreen?: boolean;
  hideFrame?: boolean;
  // Widget props
  widgetType?: string; // Generic string to be agnostic
  requiredActors?: string[]; // Generic string array for actor dependencies
  widgetState?: Record<string, any>;
  // Parent reference for easy swapping
  parentId?: string;
}

export interface LayoutState {
  isEditMode: boolean;
  rootId: string;
  blocks: Record<string, BlockState>;
}
