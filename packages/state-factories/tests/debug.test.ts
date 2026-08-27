// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { describe, it } from 'vitest';
import { SchemaFactory } from '../../packages/components/src/sequencer/factories/widgets/SchemaFactory';

describe('Debug SchemaFactory', () => {
  it('should validate mock schema', () => {
    SchemaFactory.createArchitectSchemaMock();
  });
});
