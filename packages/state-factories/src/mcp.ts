// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import * as features from './features/index.js';
import * as entities from './entities/index.js';
import * as structura from './structura/index.js';
import { settingsSchema as appSettingsSchema, dagExchangeSchema, universalSchema } from '@atomos-web/structura-core';

const server = new Server(
  {
    name: "state-factories-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// We define a generic way to extract the schemas and build the tools list.
const factories: Record<string, { schema: any, factory: Function }> = {
  chat: { schema: (features as any).ChatStateSchema, factory: (features as any).createChatState },
  models: { schema: (features as any).ModelsStateSchema, factory: (features as any).createModelsState },
  sessions: { schema: (features as any).SessionsStateSchema, factory: (features as any).createSessionsState },
  dag: { schema: (features as any).DagStateSchema, factory: (features as any).createDagState },
  system: { schema: (features as any).SystemStateSchema, factory: (features as any).createSystemState },
  "ui-commands": { schema: (features as any).UICommandsRootStateSchema, factory: (features as any).createUICommandsRootState },
  modal: { schema: (features as any).ModalStateSchema, factory: (features as any).createModalState },
  "enterprise-chatbot": { schema: (features as any).EnterpriseChatbotStateSchema, factory: (features as any).createEnterpriseChatbotState },
  telemetry: { schema: (entities as any).TelemetryStateSchema, factory: (entities as any).createTelemetryState },
  assets: { schema: (entities as any).AssetsStateSchema, factory: (entities as any).createAssetsState },
  app: { schema: (entities as any).AppStateSchema, factory: (entities as any).createAppState },
  introspection: { schema: (entities as any).IntrospectionStateSchema, factory: (entities as any).createIntrospectionState },
  artifacts: { schema: (entities as any).ArtifactsStateSchema, factory: (entities as any).createArtifactsState },
  notifications: { schema: (entities as any).NotificationsStateSchema, factory: (entities as any).createNotificationsState },
};

const structuraFactories: Record<string, { schema: any, factory: Function }> = {
  app_settings: { schema: appSettingsSchema, factory: structura.createAppSettings },
  dag_exchange: { schema: dagExchangeSchema, factory: structura.createDagExchange },
  universal_schema: { schema: universalSchema, factory: structura.createUniversalSchema },
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools = Object.entries(factories).map(([name, { schema }]) => {
    // Generate the JSON schema for the tool input directly via formular.dev
    const jsonSchema = schema.toJSONSchema();
    return {
      name: `generate_${name.replace(/-/g, '_')}_state`,
      description: `Generates a perfectly valid and strictly-typed Redux slice state for ${name}. Pass a partial state to override defaults.`,
      inputSchema: jsonSchema as any,
    };
  });

  const structuraTools = Object.entries(structuraFactories).map(([name, { schema }]) => {
    const jsonSchema = schema.toJSONSchema();
    return {
      name: `generate_structura_${name}`,
      description: `Generates a perfectly valid and strictly-typed Structura structure for ${name}. Pass a partial structure to override defaults.`,
      inputSchema: jsonSchema as any,
    };
  });

  return { tools: [...tools, ...structuraTools] };


});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let factoryEntry: { schema: any, factory: Function } | undefined;

  const sliceNameMatch = name.match(/^generate_(.+)_state$/);
  const structuraNameMatch = name.match(/^generate_structura_(.+)$/);

  if (sliceNameMatch) {
    const sliceName = sliceNameMatch[1].replace(/_/g, '-');
    factoryEntry = factories[sliceName];
  } else if (structuraNameMatch) {
    const structuraName = structuraNameMatch[1];
    factoryEntry = structuraFactories[structuraName];
  }

  if (!factoryEntry) {
    throw new Error(`Unknown tool or factory not found for: ${name}`);
  }

  try {
    // We pass the args as the partial state. The factory applies defaults and runs Zod validation.
    const generatedState = factoryEntry.factory(args || {});
    return {
      content: [{ type: "text", text: JSON.stringify(generatedState, null, 2) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error generating state: ${error}` }],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("State Factories MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
