// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { describe, it, expect } from 'vitest';
import * as features from '../src/features/index.js';
import * as entities from '../src/entities/index.js';
import * as structura from '../src/structura/index.js';
import { settingsSchema as appSettingsSchema, dagExchangeSchema, universalSchema } from '@atomos-web/structura-core';

describe('State Factories - Validation Interne', () => {
  const slices = [
    { name: 'chat', schema: (features as any).ChatStateSchema, factory: (features as any).createChatState },
    { name: 'models', schema: (features as any).ModelsStateSchema, factory: (features as any).createModelsState },
    { name: 'sessions', schema: (features as any).SessionsStateSchema, factory: (features as any).createSessionsState },
    { name: 'dag', schema: (features as any).DagStateSchema, factory: (features as any).createDagState },
    { name: 'system', schema: (features as any).SystemStateSchema, factory: (features as any).createSystemState },
    { name: 'ui-commands', schema: (features as any).UICommandsRootStateSchema, factory: (features as any).createUICommandsRootState },
    { name: 'modal', schema: (features as any).ModalStateSchema, factory: (features as any).createModalState },
    { name: 'enterprise-chatbot', schema: (features as any).EnterpriseChatbotStateSchema, factory: (features as any).createEnterpriseChatbotState },
    { name: 'telemetry', schema: (entities as any).TelemetryStateSchema, factory: (entities as any).createTelemetryState },
    { name: 'assets', schema: (entities as any).AssetsStateSchema, factory: (entities as any).createAssetsState },
    { name: 'app', schema: (entities as any).AppStateSchema, factory: (entities as any).createAppState },
    { name: 'introspection', schema: (entities as any).IntrospectionStateSchema, factory: (entities as any).createIntrospectionState },
    { name: 'artifacts', schema: (entities as any).ArtifactsStateSchema, factory: (entities as any).createArtifactsState },
    { name: 'notifications', schema: (entities as any).NotificationsStateSchema, factory: (entities as any).createNotificationsState },
  ];

  for (const { name, schema, factory } of slices) {
    it(`should successfully parse and validate a default generated ${name} state`, () => {
      const generated = factory();
      const result = schema.safeParse(generated);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(generated);
      }
    });

    it(`should successfully apply partials to ${name} state`, () => {
      // Pass empty object just to test partial applying
      const generated = factory({});
      const result = schema.safeParse(generated);
      expect(result.success).toBe(true);
    });
  }
});

describe('Structura Factories - Validation End-to-End', () => {
  it('should successfully create appSettings compliant with @atomos-web/structura-core', () => {
    const generated = structura.createAppSettings({ general: { enableSnapping: false } });
    const result = appSettingsSchema.safeParse(generated);
    expect(result.success).toBe(true);
    expect((result as any).data.snapToGrid ?? (result as any).data.general?.enableSnapping).toBeDefined();
  });

  it('should successfully create dagExchange compliant with @atomos-web/structura-core', () => {
    const generated = structura.createDagExchange();
    const result = dagExchangeSchema.safeParse(generated);
    expect(result.success).toBe(true);
    expect((result as any).data.nodes).toEqual([]);
    expect((result as any).data.edges).toEqual([]);
  });

  it('should successfully create universalSchema model compliant with @atomos-web/structura-core', () => {
    const generated = structura.createUniversalSchema();
    const result = universalSchema.safeParse(generated);
    expect(result.success).toBe(true);
    expect((result as any).data.config).toBeUndefined();
  });
});
