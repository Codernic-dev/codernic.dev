// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { SequenceConfig } from '../core/StateMachine';
import { DemoEngine } from '../factories/DemoEngine';
import { SessionsTourStrategy } from '../factories/pages/SessionsTourStrategy';
import { ChatTourStrategy } from '../factories/pages/ChatTourStrategy';
import { ArchitectTourStrategy } from '../factories/pages/ArchitectTourStrategy';
import { GalileusTourStrategy } from '../factories/pages/GalileusTourStrategy';
import { AnalystTourStrategy } from '../factories/pages/AnalystTourStrategy';
import { SettingsTourStrategy } from '../factories/pages/SettingsTourStrategy';
import { EnterpriseChatbotTourStrategy } from '../factories/pages/EnterpriseChatbotTourStrategy';

const demoEngine = new DemoEngine('99_exhaustiveDebugDemo', 'Global Exhaustive UI Debug Tour');

demoEngine
  .addPage(new SessionsTourStrategy())
  .addPage(new ChatTourStrategy())
  .addPage(new ArchitectTourStrategy())
  .addPage(new GalileusTourStrategy())
  .addPage(new AnalystTourStrategy())
  .addPage(new SettingsTourStrategy())
  .addPage(new EnterpriseChatbotTourStrategy());

export const exhaustiveDebugDemoSequence: SequenceConfig = demoEngine.build();

