// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import type { BlockState } from '../types';

export interface WidgetDefinition {
  type: string;
  id?: string;
  name: string;
  description?: string;
  component: React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
  icon?: any;
  requiredActors?: string[];
  defaultSize?: { minWidth: number; minHeight: number };
  docUrl?: string;
}

export interface LayoutEngineStrategy {
  /** Unique strategy identifier for the application */
  name: string;
  
  /** Storage key for persisting layout in localStorage */
  storageKey?: string;
  
  /** Application Widget Registry dictionary */
  widgetRegistry: Record<string, WidgetDefinition>;
  
  /** Initial BlockState Layout Tree for root */
  defaultLayout: Record<string, BlockState>;
  
  /** Custom Widget Suspense / Error Boundary Renderer Strategy */
  renderWidget?: (type: string, props?: Record<string, any>) => React.ReactNode;
}
