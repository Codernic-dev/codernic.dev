// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { lazy } from 'react';
import { CloudModelHubWidget } from '../../ockham/widget/cloud-model-hub.widget';

export interface WidgetConfig {
  type: string;
  component: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType<any>;
  requiredActors?: string[];
  id?: string;
  name?: string;
  description?: string;
  defaultSize?: { minWidth: number, minHeight: number };
  icon?: string;
  docUrl?: string;
}

export const WIDGET_REGISTRY: Record<string, WidgetConfig> = {
  'cloud-model-hub': {
    type: 'cloud-model-hub',
    id: 'cloud-model-hub',
    name: 'Cloud Model Hub',
    description: 'Cloud provider models config',
    component: CloudModelHubWidget,
    defaultSize: { minWidth: 300, minHeight: 400 },
    icon: 'hub',
    docUrl: 'https://docs.codernic.dev/widgets/deming-model-routing'
  },
  'chat': {
    type: 'chat',
    component: lazy(() => import('../../chat/widget/chat.widget').then(m => ({ default: m.ChatWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/chat-assistant'
  },
  'introspection': {
    type: 'introspection',
    component: lazy(() => import('../../introspection/widget/introspection.widget').then(m => ({ default: m.IntrospectionWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/introspection'
  },
  'artifacts': {
    type: 'artifacts',
    component: lazy(() => import('../../artifacts/widget/artifacts.widget').then(m => ({ default: m.ArtifactsWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/artifacts'
  },
  'erathos': {
    type: 'erathos',
    component: lazy(() => import('../../erathos/widget/erathos.widget').then(m => ({ default: m.ErathosWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/erathos-schema'
  },
  'galileus-router': {
    type: 'galileus-router',
    component: lazy(() => import('../../galileus-router/widget/galileus-router.widget').then(m => ({ default: m.GalileusRouterWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/galileus-router'
  },
  'galileus-topology': {
    type: 'galileus-topology',
    component: lazy(() => import('../../dag/components/organisms/GalileusTopologyWidget').then(m => ({ default: m.GalileusTopologyWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/galileus-dag-topology'
  },
  'galileus-daw': {
    type: 'galileus-daw',
    component: lazy(() => import('../../dag/components/organisms/GalileusDawWidget').then(m => ({ default: m.GalileusDawWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/galileus-execution-daw'
  },
  'model-hub': {
    type: 'model-hub',
    component: lazy(() => import('../../model-hub/widget/model-hub.widget').then(m => ({ default: m.ModelHubWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/model-hub'
  },
  'analyse': {
    type: 'analyse',
    component: lazy(() => import('../../analyse/widget/analyse.widget').then(m => ({ default: m.AnalyseWidget }))),
    requiredActors: []
  },
  'sessions': {
    type: 'sessions',
    component: lazy(() => import('../../sessions/widget/session.widget').then(m => ({ default: m.SessionWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/workspace-sessions'
  },
  'models-settings': {
    type: 'models-settings',
    component: lazy(() => import('../../settings/widget/models.widget').then(m => ({ default: m.ModelsWidget }))),
    requiredActors: []
  },
  'rules-settings': {
    type: 'rules-settings',
    component: lazy(() => import('../../settings/widget/rules.widget').then(m => ({ default: m.RulesWidget }))),
    requiredActors: []
  },
  'prompts-settings': {
    type: 'prompts-settings',
    component: lazy(() => import('../../settings/widget/prompts.widget').then(m => ({ default: m.PromptsWidget }))),
    requiredActors: []
  },
  'routing-settings': {
    type: 'routing-settings',
    component: lazy(() => import('../../settings/widget/routing.widget').then(m => ({ default: m.RoutingWidget }))),
    requiredActors: []
  },
  'system-settings': {
    type: 'system-settings',
    component: lazy(() => import('../../settings/widget/system.widget').then(m => ({ default: m.SystemWidget }))),
    requiredActors: ['Daemon']
  },
  'pirsig-widget': {
    type: 'pirsig-widget',
    component: lazy(() => import('../../diagnostic-dashboard/widget/pirsig.widget').then(m => ({ default: m.PirsigWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/pirsig-dlp-shield'
  },
  'agent-events-widget': {
    type: 'agent-events-widget',
    component: lazy(() => import('../../diagnostic-dashboard/widget/agent-events.widget').then(m => ({ default: m.AgentEventsWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/worm-audit-compliance'
  },
  'agents': {
    type: 'agents',
    component: lazy(() => import('../../agents/widget/agents.widget').then(m => ({ default: m.AgentsWidget }))),
    requiredActors: ['Daemon']
  },
  'dags': {
    type: 'dags',
    component: lazy(() => import('../../dags/widget/dags.widget').then(m => ({ default: m.DagsWidget }))),
    requiredActors: ['Daemon']
  },
  'technologies': {
    type: 'technologies',
    component: lazy(() => import('../../techs/widget/techs.widget').then(m => ({ default: m.TechsWidget }))),
    requiredActors: []
  },
  'enterprise-chatbot': {
    type: 'enterprise-chatbot',
    component: lazy(() => import('../../enterprise-chatbot/widget/enterprise-chatbot.widget').then(m => ({ default: m.EnterpriseChatbotWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/ragtime-vector-search'
  },
  'sandbox': {
    type: 'sandbox',
    name: '5-Pillar Sandbox Showcase',
    description: 'Sovereign AI 5-Pillar Interactive Sandbox (Security, Execution, Memory, Governance, Optimization)',
    component: lazy(() => import('../../sandbox/widget/sandbox.widget').then(m => ({ default: m.SandboxWidget }))),
    requiredActors: []
  },
  'benchmark-widget': {
    type: 'benchmark-widget',
    component: lazy(() => import('../../chat/components/organisms/benchmark-widget').then(m => ({ default: m.BenchmarkWidget }))),
    requiredActors: []
  },
  'my-system-dashboard': {
    type: 'my-system-dashboard',
    component: lazy(() => import('../../../widgets/settings/ui/MySystemDashboard').then(m => ({ default: m.MySystemDashboard }))),
    requiredActors: []
  },
  'shield-proxy': {
    type: 'shield-proxy',
    component: lazy(() => import('../../../widgets/shield-proxy/ui/ShieldProxyWidget').then(m => ({ default: m.ShieldProxyWidget }))),
    requiredActors: [],
    docUrl: 'https://docs.codernic.dev/widgets/pirsig-dlp-shield'
  },
  'welcome-dashboard': {
    type: 'welcome-dashboard',
    component: lazy(() => import('../../../widgets/onboarding/ui/WelcomeDashboard').then(m => ({ default: m.WelcomeDashboard }))),
    requiredActors: []
  },
  'model-selection-card': {
    type: 'model-selection-card',
    component: lazy(() => import('../../../widgets/models-hub/ui/ModelSelectionWidget').then(m => ({ default: m.ModelSelectionWidget }))),
    requiredActors: []
  },
  'agent-roster': {
    type: 'agent-roster',
    name: 'Agent Roster',
    description: 'Monitor the status of specialized agents',
    component: lazy(() => import('../../../widgets/roster/AgentRosterWidget').then(m => ({ default: m.AgentRosterWidget }))),
    requiredActors: ['Daemon'],
    docUrl: 'https://docs.codernic.dev/widgets/agent-roster'
  },
  'swg-engine-controls': {
    type: 'swg-engine-controls',
    name: 'SWG Engine Controls',
    description: 'Pirsig DLP & Ockham Optimizer toggle switches',
    component: lazy(() => import('../../swg-control/widgets/EngineControlsWidget').then(m => ({ default: m.EngineControlsWidget }))),
    requiredActors: []
  },
  'swg-lockdown': {
    type: 'swg-lockdown',
    name: 'CISO Panic Lockdown',
    description: 'Kernel IPTable Reset & Emergency Shield',
    component: lazy(() => import('../../swg-control/widgets/LockdownWidget').then(m => ({ default: m.LockdownWidget }))),
    requiredActors: []
  },
  'swg-interception': {
    type: 'swg-interception',
    name: 'Pipeline Interception Mode',
    description: 'Transparent eBPF & Envoy Driver mode',
    component: lazy(() => import('../../swg-control/widgets/InterceptionModeWidget').then(m => ({ default: m.InterceptionModeWidget }))),
    requiredActors: []
  },
  'swg-accreditations': {
    type: 'swg-accreditations',
    name: 'DevTools Accreditations',
    description: '1-Click SSL Certificate Pinning Bypass',
    component: lazy(() => import('../../swg-control/widgets/AppAccreditationWidget').then(m => ({ default: m.AppAccreditationWidget }))),
    requiredActors: []
  },
  'swg-telemetry-log': {
    type: 'swg-telemetry-log',
    name: 'Real-time Telemetry Stream',
    description: 'Live HTTP/gRPC inspection log console',
    component: lazy(() => import('../../swg-control/components/TelemetryLog').then(m => ({ default: m.TelemetryLog }))),
    requiredActors: []
  },
  'swg-llm-stream': {
    type: 'swg-llm-stream',
    name: 'LLM Stream & DLP Inspector',
    description: 'Live prompt payload diff inspection',
    component: lazy(() => import('../../swg-control/components/LlmStreamViewer').then(m => ({ default: m.LlmStreamViewer }))),
    requiredActors: []
  },
  'swg-metrics': {
    type: 'swg-metrics',
    name: 'SWG Gateway Metrics',
    description: 'Total Requests, Tokens Saved, DLP Blocks',
    component: lazy(() => import('../../swg-control/components/MetricsOverview').then(m => ({ default: m.MetricsOverview }))),
    requiredActors: []
  }
};

