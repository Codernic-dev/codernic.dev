// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createUniversalSchema, createDagExchange, createAppSettings } from '@binaryjack/state-factories';

export class SchemaFactory {
  static createArchitectSchemaMock() {
    return createUniversalSchema({
      config: {
        workspace: {
          name: "Mock Architect Workspace",
          version: "1",
          last_modified: new Date().toISOString(),
          active_canvas_id: "canvas-architect",
          canvases: {
            "canvas-architect": {
              id: "canvas-architect",
              name: "Canvas Architect",
              active_schema_id: "schema-default",
              viewport: { pan: { x: 0, y: 0 }, zoom: 1 },
              schemas: {
                'schema-default': {
                  id: 'schema-default',
                  name: 'MVVM Architecture',
                  type: 'freeform',
                  entities: [
                    { id: 'node_alpha', name: 'Frontend React', shape: 'box', color: 'var(--vbs-bg-panel, #111111)', properties: [], position: { x: 50, y: 50 }, dimensions: { width: 150, height: 80 }, code: '', edges: [] },
                    { id: 'node_beta', name: 'Node.js Backend', shape: 'box', color: 'var(--vbs-bg-panel, #111111)', properties: [], position: { x: 300, y: 50 }, dimensions: { width: 150, height: 80 }, code: '', edges: [] },
                    { id: 'node_gamma', name: 'PostgreSQL DB', shape: 'box', color: 'var(--vbs-bg-panel, #111111)', properties: [], position: { x: 550, y: 50 }, dimensions: { width: 150, height: 80 }, code: '', edges: [] }
                  ],
                  links: [
                    { id: 'link_1', leftAnchorId: 'center', rightAnchorId: 'center', leftEntityId: 'node_alpha', rightEntityId: 'node_beta', leftCardinality: '1', rightCardinality: '1', direction: 'default', renderType: 'bezier' as any },
                    { id: 'link_2', leftAnchorId: 'center', rightAnchorId: 'center', leftEntityId: 'node_beta', rightEntityId: 'node_gamma', leftCardinality: '1', rightCardinality: 'n', direction: 'default', renderType: 'bezier' as any }
                  ]
                }
              }
            }
          }
        }
      } as any
    });
  }

  static createDispatchAction() {
    return {
      type: 'dag/syncSchemaToCodernicSilent',
      payload: { schema: this.createArchitectSchemaMock() }
    };
  }
}
