// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createChatState } from '@binaryjack/state-factories';

export class ChatFactory {
  static createExhaustiveChatMock() {
    const schemaJson = `{
  "workspace": {
    "name": "Mock Workspace",
    "version": "1",
    "last_modified": "2023-01-01T00:00:00.000Z",
    "active_canvas_id": "canvas-default",
    "canvases": {
      "canvas-default": {
        "id": "canvas-default",
        "name": "Canvas 1",
        "active_schema_id": "schema-default",
        "viewport": { "pan": { "x": 0, "y": 0 }, "zoom": 1 },
        "schemas": {
          "schema-default": {
            "id": "schema-default",
            "name": "MVVM Architecture",
            "type": "freeform",
            "entities": [
              { "id": "node_alpha", "name": "Frontend React", "shape": "box", "color": "var(--vbs-bg-panel, #111111)", "properties": [], "position": { "x": 50, "y": 50 }, "dimensions": { "width": 150, "height": 80 }, "code": "", "edges": [] },
              { "id": "node_beta", "name": "Node.js Backend", "shape": "box", "color": "var(--vbs-bg-panel, #111111)", "properties": [], "position": { "x": 300, "y": 50 }, "dimensions": { "width": 150, "height": 80 }, "code": "", "edges": [] },
              { "id": "node_gamma", "name": "PostgreSQL DB", "shape": "box", "color": "var(--vbs-bg-panel, #111111)", "properties": [], "position": { "x": 550, "y": 50 }, "dimensions": { "width": 150, "height": 80 }, "code": "", "edges": [] }
            ],
            "links": [
              { "id": "link_1", "leftAnchorId": "center", "rightAnchorId": "center", "leftEntityId": "node_alpha", "rightEntityId": "node_beta", "leftCardinality": "1", "rightCardinality": "1", "direction": "default", "renderType": "bezier" },
              { "id": "link_2", "leftAnchorId": "center", "rightAnchorId": "center", "leftEntityId": "node_beta", "rightEntityId": "node_gamma", "leftCardinality": "1", "rightCardinality": "n", "direction": "default", "renderType": "bezier" }
            ]
          }
        }
      }
    }
  }
}`;

    const state = createChatState({
      messages: [
        { id: 'msg-sys', role: 'system', text: 'You are an AI orchestrator.' },
        { id: '1', role: 'user', text: 'We need a new scalable architecture for the e-commerce microservices.' },
        {
          id: 'demo-msg-1',
          role: 'assistant',
          text: "<think>Analyzing user request. Scalability is key. I'll propose a monolithic architecture first as a baseline, but Pirsig will likely catch this.</think>\n\nI suggest we start with a robust monolithic approach using Node.js. It simplifies deployment and initial scaling.",
          diagnostic: {
            title: 'Architecture Conflict',
            message: 'Monolith proposed but user explicitly requested microservices.',
            code: 'ARCH_001',
            fix_suggestion: 'Pirsig Flagged: Revise to microservices.',
            documentation_url: 'https://docs.codernic.ai'
          }
        },
        {
          id: 'demo-msg-2',
          role: 'assistant',
          text: "<think>[PIRSIG ALIGNMENT] The Reviewer agent (Pirsig) has flagged a contradiction. The user explicitly requested microservices. Realigning architectural proposal.</think>\n\nWait, correcting my previous statement: Since you explicitly require high scalability and microservices, a monolithic approach contradicts your needs. We will align with a robust microservices topology using Kubernetes, Docker, and gRPC for inter-service communication.",
          toolCalls: [
            { id: 't1', name: 'search_docs', args: { query: 'kubernetes microservices best practices' }, status: 'success', result: 'Found architectural patterns.' },
            { id: 't2', name: 'calculate_cost', args: { nodes: '10' }, status: 'failed', result: 'Timeout error.' }
          ]
        },
        { id: '2', role: 'user', text: 'Yes, exactly! Please generate the structural schema snapshot for that and run the diagnostic tools.' },
        {
          id: 'demo-msg-3',
          role: 'assistant',
          text: "<think>I need to generate a structural schema snapshot for the user to review. I will also run the requested tool to fetch additional diagnostics.</think>\n\nHere is the schema snapshot:\n\n```erathos-snapshot\n" + schemaJson + "\n```\n\nAnd I executed the diagnostic tools.",
          toolCalls: [
            { id: 't3', name: 'run_diagnostics', args: { scope: 'services' }, status: 'running' }
          ]
        },
        {
          id: 'demo-msg-pirsig-report',
          role: 'assistant',
          text: "Here is the B2B Sovereign Gate Keeper data scrubbing verification report:\n\n```pirsig-report\n{\n  \"sessionId\": \"demo-session\",\n  \"overallStatus\": \"processed\",\n  \"entries\": [\n    { \"originalData\": \"Alice\", \"replacedBy\": \"[SCRUBBED_HASH_73f91]\", \"status\": \"processed\" },\n    { \"originalData\": \"Bob\", \"replacedBy\": \"[SCRUBBED_HASH_a8c23]\", \"status\": \"processed\" }\n  ]\n}\n```",
          metrics: {
            ttft_ms: 120,
            tokens_per_second: 55,
            vram_allocated_bytes: 8500000000,
            context_tokens_count: 4500
          }
        },
        {
          id: 'demo-msg-plan-cta',
          role: 'plan-cta',
          text: 'This is the implementation plan schema to align internal configurations, deploy the Kubernetes configurations, and implement the gateway logic.',
          cost: '$0.0042',
          duration: '1m 15s',
          task: 'Define deployment yaml templates and register the Kubernetes microservice endpoints.'
        }
      ] as any
    });
    return state.messages;
  }

  static createDispatchAction() {
    return {
      type: 'chat/setMessages',
      payload: this.createExhaustiveChatMock()
    };
  }

  static createSetSendingDispatch() {
    return {
      type: 'chat/setSending',
      payload: true
    };
  }

  static createSetThinkingDispatch() {
    return {
      type: 'chat/setThinking',
      payload: true
    };
  }

  static createSetContextFilesDispatch() {
    return {
      type: 'chat/setContextFiles',
      payload: [
        { path: 'auth.ts', size: '10:25', status: 'error' },
        { path: 'cart.ts', size: '1:50', status: 'error' }
      ]
    };
  }
}
