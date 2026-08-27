// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { eventChannel, type EventChannel } from 'redux-saga';

export interface LicenseStatusPayload {
  tier: string;
  issued_at: number;
  expires_at: number;
  is_active: boolean;
  modules: string[];
}

export interface TelemetryStatsPayload {
  pii_interceptions: number;
  tokens_saved_percent: number;
  blocked_requests: number;
}

export interface DaemonStatusPayload {
  isRunning: boolean;
}

export interface OauthCallbackPayload {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface NetworkConfigPayload {
  daemon_ws_port: number;
  inference_port: number;
  mcp_bridge_port: number;
  ui_dev_port: number;
  b2b_ragtime_port?: number;
  b2b_deming_port?: number;
  swg_port?: number;
  bind_host?: string;
}

export interface EngineConfigPayload {
  network: NetworkConfigPayload;
  systemPaths: Record<string, string>;
  projectPaths: Record<string, string>;
  [key: string]: unknown;
}

export const isTauriAvailable = (): boolean => {
  return typeof window !== 'undefined' && Boolean((window as unknown as { __TAURI__?: unknown }).__TAURI__);
};

export const tauriIpc = {
  getDaemonStatus: async (): Promise<DaemonStatusPayload> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<DaemonStatusPayload>('get_daemon_status');
  },

  startDaemon: async (): Promise<void> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<void>('start_daemon');
  },

  stopDaemon: async (): Promise<void> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<void>('stop_daemon');
  },

  getLicenseStatus: async (): Promise<LicenseStatusPayload | null> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<LicenseStatusPayload | null>('get_license_status');
  },

  setLicense: async (key: string): Promise<void> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<void>('set_license', { key });
  },

  generateSsrm: async (modelId: string, owner: string, expiresInDays: number): Promise<string> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<string>('generate_ssrm', { modelId, owner, expiresInDays });
  },

  getTelemetryStats: async (): Promise<TelemetryStatsPayload> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<TelemetryStatsPayload>('get_telemetry_stats');
  },

  getGlobalConfig: async (): Promise<string> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<string>('get_global_config');
  },

  getResolvedEngineConfig: async (): Promise<EngineConfigPayload> => {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<EngineConfigPayload>('get_resolved_engine_config');
  },
};

/**
 * Creates a Redux-Saga EventChannel for streaming high-frequency 'daemon-log' IPC events from Rust.
 */
export const createDaemonLogChannel = (): EventChannel<string> => {
  return eventChannel<string>((emitter) => {
    let unlistenFn: (() => void) | undefined;

    if (isTauriAvailable()) {
      import('@tauri-apps/api/event').then(({ listen }) => {
        listen<string>('daemon-log', (event) => {
          emitter(event.payload);
        }).then((unlisten) => {
          unlistenFn = unlisten;
        }).catch((err: unknown) => {
          console.error('Failed to subscribe to daemon-log IPC:', err);
        });
      });
    }

    return () => {
      if (unlistenFn) unlistenFn();
    };
  });
};

/**
 * Creates a Redux-Saga EventChannel for 'oauth-callback' IPC events.
 */
export const createOauthCallbackChannel = (): EventChannel<OauthCallbackPayload> => {
  return eventChannel<OauthCallbackPayload>((emitter) => {
    let unlistenFn: (() => void) | undefined;

    if (isTauriAvailable()) {
      import('@tauri-apps/api/event').then(({ listen }) => {
        listen<OauthCallbackPayload>('oauth-callback', (event) => {
          emitter(event.payload);
        }).then((unlisten) => {
          unlistenFn = unlisten;
        }).catch((err: unknown) => {
          console.error('Failed to subscribe to oauth-callback IPC:', err);
        });
      });
    }

    return () => {
      if (unlistenFn) unlistenFn();
    };
  });
};
