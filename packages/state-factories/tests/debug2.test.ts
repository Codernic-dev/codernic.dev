// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { describe, it, expect } from 'vitest';
import { AnalystFactory } from '../../packages/components/src/sequencer/factories/widgets/AnalystFactory';

describe('Debug AnalystFactory', () => {
  it('should create mock search results action properly', () => {
    const action = AnalystFactory.createMockSearchResultsAction();
    expect(action.payload.models).toBeDefined();
    expect(action.payload.models.length).toBeGreaterThan(0);
  });
});
