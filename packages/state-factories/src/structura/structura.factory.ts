// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import { f, type IInfer } from '@binaryjack/formular.dev';
import {
  settingsSchema as appSettingsSchema,
  dagExchangeSchema,
  universalSchema,
} from '@atomos-web/structura-core';

export function createAppSettings(
  partial: Partial<IInfer<any>> = {}
): IInfer<any> {
  const defaultSettings = {
    theme: 'dark',
    gridSize: 20,
    snapToGrid: true,
    showGrid: true,
    autoSave: true,
    autoSaveInterval: 30,
    defaultEntityWidth: 200,
    defaultEntityHeight: 120,
    defaultLinkType: 'bezier',
    general: {
      gridSize: 20,
      enableSnapping: true,
      defaultLinkStyle: 'solid',
      gridPrimaryColor: '#e0e0e0',
      gridSecondaryColor: '#f5f5f5',
      canvasBackgroundColor: '#ffffff'
    },
    appearance: {
      entity: {
        nameFontFamily: 'sans-serif' as const,
        nameFontSize: 14,
        nameFontWeight: 'bold' as const,
        nameColor: '#333333',
        propsFontFamily: 'sans-serif' as const,
        propsFontSize: 12,
        propsFontWeight: 'normal' as const,
        propsColor: '#666666',
        borderRadius: 4,
        borderWidth: 1,
        namePaddingY: 8,
        propsPaddingY: 8
      },
      link: {
        color: '#999999',
        selectedColor: '#3366ff',
        thickness: 2,
        selectedThickness: 3
      }
    },
    shapes: []
  };

  return {
    ...defaultSettings,
    ...partial,
    general: {
      ...defaultSettings.general,
      ...(partial.general || {})
    },
    appearance: {
      ...defaultSettings.appearance,
      ...(partial.appearance || {})
    }
  };
}

export function createDagExchange(
  partial: Partial<IInfer<any>> = {}
): IInfer<any> {
  const defaultDag = {
    version: '1.0.0',
    applyAfterLoad: undefined,
    nodes: [],
    edges: []
  };

  return { ...defaultDag, ...partial };
}

export function createUniversalSchema(
  partial: Partial<IInfer<any>> = {}
): IInfer<any> {
  const defaultUniversal = {
    config: undefined
  };

  return { ...defaultUniversal, ...partial };
}
