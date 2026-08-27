// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { DemoEngine } from '../../factories/DemoEngine';
import { ChatInterfaceStrategy } from '../../factories/pages/ChatInterfaceStrategy';
import type { SequenceConfig } from '../../core/StateMachine';

const engine = new DemoEngine('chat-interface-demo', '02. Interactive Chat & Prompts Tour')
  .addPage(new ChatInterfaceStrategy());

export const chatInterfaceDemoSequence: SequenceConfig = engine.build();
