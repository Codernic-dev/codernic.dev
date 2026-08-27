// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

export interface SwgStatusResponse {
  status: string;
  pirsig_enabled: boolean;
  ockham_enabled: boolean;
  panic_mode: boolean;
  total_requests: number;
  pirsig_blocked: number;
  tokens_saved_total: number;
}

export interface ToggleRequest {
  enabled: boolean;
}

export interface ToggleResponse {
  status: string;
  pirsig_enabled?: boolean;
  ockham_enabled?: boolean;
  panic_mode?: boolean;
  audit_dump_mode?: boolean;
}

export interface ResetResponse {
  status: string;
  message: string;
}

export interface AccreditationItem {
  name: string;
  path: string;
  status: string;
}

export interface PirsigTelemetryData {
  raw_payload?: string;
  sanitized_payload?: string;
  action?: 'PASS' | 'BLOCKED' | string;
}

export interface OckhamTelemetryData {
  raw_prompt?: string;
  compressed_prompt?: string;
  original_tokens?: number;
  compressed_tokens?: number;
  tokens_saved?: number;
  savings_percent?: number;
}

export interface IoStreamTelemetryData {
  direction?: 'ASCENDANT' | 'DESCENDANT' | string;
  type?: string;
  method?: string;
  target?: string;
  status?: number;
  payload_bytes?: number;
  chunk_size_bytes?: number;
  rehydrated_text?: string;
}

export interface TelemetryEvent {
  id?: string;
  timestamp?: string;
  event_type: string;
  target?: string;
  method?: string;
  status?: number;
  payload_bytes?: number;
  enabled?: boolean;
  panic_mode?: boolean;
  client_ip?: string;
  domain?: string;
  action?: string;
  session_id?: string;
  chunk?: string;
  bytes?: number;
  pirsig?: PirsigTelemetryData;
  ockham?: OckhamTelemetryData;
  total_requests?: number;
  pirsig_blocked?: number;
  tokens_saved_total?: number;
  io_stream?: IoStreamTelemetryData;
  dlp_block?: { target?: string; reason?: string };
}

export const swgApi = {
  async fetchStatus(baseUrl: string): Promise<SwgStatusResponse> {
    const res = await fetch(`${baseUrl}/api/v1/control/status`);
    if (!res.ok) {
      throw new Error(`Failed to fetch SWG status: ${res.statusText}`);
    }
    return res.json();
  },

  async togglePirsig(baseUrl: string, enabled: boolean): Promise<ToggleResponse> {
    const res = await fetch(`${baseUrl}/api/v1/control/pirsig`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      throw new Error(`Failed to toggle Pirsig DLP: ${res.statusText}`);
    }
    return res.json();
  },

  async toggleOckham(baseUrl: string, enabled: boolean): Promise<ToggleResponse> {
    const res = await fetch(`${baseUrl}/api/v1/control/ockham`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      throw new Error(`Failed to toggle Ockham Optimizer: ${res.statusText}`);
    }
    return res.json();
  },

  async togglePanic(baseUrl: string, enabled: boolean): Promise<ToggleResponse> {
    const res = await fetch(`${baseUrl}/api/v1/control/panic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      throw new Error(`Failed to toggle Emergency Panic Mode: ${res.statusText}`);
    }
    return res.json();
  },

  async resetConnections(baseUrl: string): Promise<ResetResponse> {
    const res = await fetch(`${baseUrl}/api/v1/control/reset-connections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to reset connections: ${res.statusText}`);
    }
    return res.json();
  },

  async getAuditLog(baseUrl: string): Promise<{ status: string; audit_dump_mode: boolean }> {
    const res = await fetch(`${baseUrl}/api/v1/control/audit-log`);
    if (!res.ok) {
      throw new Error(`Failed to fetch audit log status: ${res.statusText}`);
    }
    return res.json();
  },

  async toggleAuditLog(baseUrl: string, enabled: boolean): Promise<{ status: string; audit_dump_mode: boolean }> {
    const res = await fetch(`${baseUrl}/api/v1/control/audit-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      throw new Error(`Failed to toggle audit log: ${res.statusText}`);
    }
    return res.json();
  },

  async getInterceptionMode(baseUrl: string): Promise<{ status: string; active_mode: string }> {
    const res = await fetch(`${baseUrl}/api/v1/control/mode`);
    if (!res.ok) {
      throw new Error(`Failed to fetch interception mode: ${res.statusText}`);
    }
    return res.json();
  },

  async setInterceptionMode(baseUrl: string, mode: string): Promise<{ status: string; active_mode?: string; report?: { message: string } }> {
    const res = await fetch(`${baseUrl}/api/v1/control/mode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode }),
    });
    if (!res.ok) {
      throw new Error(`Failed to set interception mode: ${res.statusText}`);
    }
    return res.json();
  },

  async getAccreditations(baseUrl: string): Promise<{ accreditations: { exceptions: AccreditationItem[] } }> {
    const res = await fetch(`${baseUrl}/api/v1/control/accreditations`);
    if (!res.ok) {
      throw new Error(`Failed to fetch accreditations: ${res.statusText}`);
    }
    return res.json();
  },

  async setAccreditations(baseUrl: string, exceptions: AccreditationItem[]): Promise<{ status: string }> {
    const res = await fetch(`${baseUrl}/api/v1/control/accreditations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exceptions }),
    });
    if (!res.ok) {
      throw new Error(`Failed to update accreditations: ${res.statusText}`);
    }
    return res.json();
  }
};
