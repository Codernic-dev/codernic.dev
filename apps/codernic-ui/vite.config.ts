// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';
import { FrontendConfigManager } from './src/shared/config/config-paths';

const engineConfig = FrontendConfigManager.getEngineConfig();
const wsPort = engineConfig.network.daemon_ws_port || 47321;
const uiPort = engineConfig.network.ui_dev_port || 5173;
const mcpPort = 9743;
const ollamaUrl = 'http://127.0.0.1:11434';

// Helper to resolve atomos monorepo packages safely across directory layout variations
const resolveAtomosPackage = (pkgSubpath: string) => {
  const candidates = [
    path.resolve(__dirname, '../../../atomos/packages', pkgSubpath),
    path.resolve(__dirname, '../../../atomos-monorepo/packages', pkgSubpath),
    path.resolve(__dirname, '../../node_modules/@atomos-web', pkgSubpath),
    path.resolve(__dirname, 'node_modules/@atomos-web', pkgSubpath),
  ];
  for (const cand of candidates) {
    if (fs.existsSync(cand)) {
      return cand;
    }
  }
  return candidates[0];
};

// Ensure Vite exposes these to the client via import.meta.env
process.env.VITE_CODERNIC_WS_URL = process.env.VITE_CODERNIC_WS_URL || `ws://127.0.0.1:${wsPort}`;
process.env.VITE_DAEMON_HTTP_URL = process.env.VITE_DAEMON_HTTP_URL || `http://127.0.0.1:${wsPort}`;
process.env.VITE_ERATHOS_MCP_URL = process.env.VITE_ERATHOS_MCP_URL || `http://127.0.0.1:${mcpPort}`;
process.env.VITE_OLLAMA_URL = process.env.VITE_OLLAMA_URL || ollamaUrl;

export default defineConfig({
  define: {
    __CODERNIC_WS_PORT__: wsPort,
  },
  server: {
    port: uiPort,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@atomos-web/structura/webview': resolveAtomosPackage('atomos-structura/dist/webview/index.js'),
      '@atomos-web/structura': resolveAtomosPackage('atomos-structura/dist/index.js'),
      '@atomos-web/structura-core': resolveAtomosPackage('atomos-structura-core/dist/index.js'),
      '@atomos-web/prime': resolveAtomosPackage('atomos-prime/dist/index.js'),
      '@atomos-web/prime-style': resolveAtomosPackage('atomos-prime-style'),
      '@atomos-web/structura-mcp': resolveAtomosPackage('atomos-structura-mcp/dist/index.js'),
      '@binaryjack/formular.dev': resolveAtomosPackage('formular-dev/dist/formular-dev.mjs'),
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: 'Codernic Mission Control',
        short_name: 'Codernic',
        theme_color: '#1e1e1e',
        background_color: '#1e1e1e',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
  },
});
