// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { DemoEngine } from '../../factories/DemoEngine';
import { ModelHubSetupStrategy } from '../../factories/pages/ModelHubSetupStrategy';
import type { SequenceConfig } from '../../core/StateMachine';

const engine = new DemoEngine('model-hub-setup-demo', '01. Model Hub & Provider Management Tour')
  .addPage(new ModelHubSetupStrategy());

export const modelHubSetupDemoSequence: SequenceConfig = engine.build();
