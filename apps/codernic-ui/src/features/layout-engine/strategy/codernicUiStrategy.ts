// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import type { LayoutEngineStrategy, WidgetDefinition } from '@codernic/components/layout-engine';
import { WIDGET_REGISTRY } from '../model/widget-registry';
import { DEFAULT_INITIAL_BLOCKS } from '../model/default-layout';

export const codernicUiStrategy: LayoutEngineStrategy = {
  name: 'Codernic UI Standard',
  storageKey: 'codernic_ui_layout_v1',
  widgetRegistry: WIDGET_REGISTRY as Record<string, WidgetDefinition>,
  defaultLayout: DEFAULT_INITIAL_BLOCKS,
};
