import type { EngineConfigPayload } from './api/tauri-ipc';

declare global {
  interface Window {
    __CODERNIC_ENV__?: {
      VITE_CODERNIC_WS_URL?: string;
      VITE_DAEMON_HTTP_URL?: string;
      VITE_ERATHOS_MCP_URL?: string;
      VITE_OLLAMA_URL?: string;
    };
  }
}

interface ImportMetaEnv {
  VITE_CODERNIC_WS_URL?: string;
  VITE_DAEMON_HTTP_URL?: string;
  VITE_ERATHOS_MCP_URL?: string;
  VITE_OLLAMA_URL?: string;
}

let activeEngineConfig: EngineConfigPayload | null = null;

export const setRuntimeEngineConfig = (config: EngineConfigPayload): void => {
  activeEngineConfig = config;
};

export const getRuntimeEngineConfig = (): EngineConfigPayload | null => {
  return activeEngineConfig;
};

export const getCodernicWsUrl = (): string => {
  if (activeEngineConfig?.network?.daemon_ws_port) {
    const host = activeEngineConfig.network.bind_host || '127.0.0.1';
    return `ws://${host}:${activeEngineConfig.network.daemon_ws_port}/ws`;
  }
  const winEnv = typeof window !== 'undefined' ? window.__CODERNIC_ENV__ : undefined;
  const metaEnv = (import.meta as unknown as { env?: ImportMetaEnv })?.env;
  return winEnv?.VITE_CODERNIC_WS_URL || metaEnv?.VITE_CODERNIC_WS_URL || 'ws://127.0.0.1:47321/ws';
};

export const getCodernicHttpUrl = (): string => {
  if (activeEngineConfig?.network?.daemon_ws_port) {
    const host = activeEngineConfig.network.bind_host || '127.0.0.1';
    return `http://${host}:${activeEngineConfig.network.daemon_ws_port}`;
  }
  const winEnv = typeof window !== 'undefined' ? window.__CODERNIC_ENV__ : undefined;
  const metaEnv = (import.meta as unknown as { env?: ImportMetaEnv })?.env;
  return winEnv?.VITE_DAEMON_HTTP_URL || metaEnv?.VITE_DAEMON_HTTP_URL || 'http://127.0.0.1:47321';
};

export const getErathosMcpUrl = (): string => {
  if (activeEngineConfig?.network?.mcp_bridge_port) {
    const host = activeEngineConfig.network.bind_host || '127.0.0.1';
    return `http://${host}:${activeEngineConfig.network.mcp_bridge_port}`;
  }
  const winEnv = typeof window !== 'undefined' ? window.__CODERNIC_ENV__ : undefined;
  const metaEnv = (import.meta as unknown as { env?: ImportMetaEnv })?.env;
  return winEnv?.VITE_ERATHOS_MCP_URL || metaEnv?.VITE_ERATHOS_MCP_URL || 'http://127.0.0.1:47322';
};

export const getSwgUrl = (): string => {
  if (activeEngineConfig?.network?.swg_port) {
    const host = activeEngineConfig.network.bind_host || '127.0.0.1';
    return `http://${host}:${activeEngineConfig.network.swg_port}`;
  }
  return 'http://127.0.0.1:9090';
};

export const getOllamaUrl = (): string => {
  const winEnv = typeof window !== 'undefined' ? window.__CODERNIC_ENV__ : undefined;
  const metaEnv = (import.meta as unknown as { env?: ImportMetaEnv })?.env;
  return winEnv?.VITE_OLLAMA_URL || metaEnv?.VITE_OLLAMA_URL || 'http://127.0.0.1:11434';
};
