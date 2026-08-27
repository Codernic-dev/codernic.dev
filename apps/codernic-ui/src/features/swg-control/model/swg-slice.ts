// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SwgStatusResponse, TelemetryEvent, AccreditationItem } from '../api/swg-api';

export interface SwgState {
  status: 'online' | 'offline' | 'error';
  pirsigEnabled: boolean;
  ockhamEnabled: boolean;
  panicMode: boolean;
  auditDumpMode: boolean;
  interceptionMode: string;
  accreditations: AccreditationItem[];
  totalRequests: number;
  pirsigBlocked: number;
  tokensSavedTotal: number;
  telemetryEvents: TelemetryEvent[];
  sseStatus: 'connected' | 'connecting' | 'disconnected';
  loading: {
    status: boolean;
    pirsig: boolean;
    ockham: boolean;
    panic: boolean;
    reset: boolean;
    auditLog: boolean;
    interceptionMode: boolean;
    accreditations: boolean;
  };
  error: string | null;
  lastUpdated: string | null;
  eventFilter: string;
  apiBaseUrl: string;
  wsUrl: string;
}

const initialState: SwgState = {
  status: 'offline',
  pirsigEnabled: true,
  ockhamEnabled: true,
  panicMode: false,
  auditDumpMode: false,
  interceptionMode: 'manual',
  accreditations: [],
  totalRequests: 0,
  pirsigBlocked: 0,
  tokensSavedTotal: 0,
  telemetryEvents: [],
  sseStatus: 'disconnected',
  loading: {
    status: false,
    pirsig: false,
    ockham: false,
    panic: false,
    reset: false,
    auditLog: false,
    interceptionMode: false,
    accreditations: false,
  },
  error: null,
  lastUpdated: null,
  eventFilter: 'all',
  apiBaseUrl: '',
  wsUrl: '',
};

export const swgSlice = createSlice({
  name: 'swg',
  initialState,
  reducers: {
    // Init & Config
    initSwgConfigRequest: (state) => {
      state.loading.status = true;
    },
    setApiUrls: (state, action: PayloadAction<{ apiBaseUrl: string; wsUrl: string }>) => {
      state.apiBaseUrl = action.payload.apiBaseUrl;
      state.wsUrl = action.payload.wsUrl;
    },

    // Status
    fetchStatusRequest: (state) => {
      state.loading.status = true;
      state.error = null;
    },
    fetchStatusSuccess: (state, action: PayloadAction<SwgStatusResponse>) => {
      state.loading.status = false;
      state.status = action.payload.status === 'online' ? 'online' : 'offline';
      state.pirsigEnabled = action.payload.pirsig_enabled;
      state.ockhamEnabled = action.payload.ockham_enabled;
      state.panicMode = action.payload.panic_mode;
      state.totalRequests = action.payload.total_requests;
      state.pirsigBlocked = action.payload.pirsig_blocked;
      state.tokensSavedTotal = action.payload.tokens_saved_total;
      state.lastUpdated = new Date().toLocaleTimeString();
    },
    fetchStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading.status = false;
      state.status = 'error';
      state.error = action.payload;
    },

    // Pirsig DLP
    togglePirsigRequest: (state, _action: PayloadAction<boolean>) => {
      state.loading.pirsig = true;
    },
    togglePirsigSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading.pirsig = false;
      state.pirsigEnabled = action.payload;
    },
    togglePirsigFailure: (state, action: PayloadAction<string>) => {
      state.loading.pirsig = false;
      state.error = action.payload;
    },

    // Ockham
    toggleOckhamRequest: (state, _action: PayloadAction<boolean>) => {
      state.loading.ockham = true;
    },
    toggleOckhamSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading.ockham = false;
      state.ockhamEnabled = action.payload;
    },
    toggleOckhamFailure: (state, action: PayloadAction<string>) => {
      state.loading.ockham = false;
      state.error = action.payload;
    },

    // Panic Lockdown
    togglePanicRequest: (state, _action: PayloadAction<boolean>) => {
      state.loading.panic = true;
    },
    togglePanicSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading.panic = false;
      state.panicMode = action.payload;
    },
    togglePanicFailure: (state, action: PayloadAction<string>) => {
      state.loading.panic = false;
      state.error = action.payload;
    },

    // Socket Reset
    resetConnectionsRequest: (state) => {
      state.loading.reset = true;
    },
    resetConnectionsSuccess: (state) => {
      state.loading.reset = false;
    },
    resetConnectionsFailure: (state, action: PayloadAction<string>) => {
      state.loading.reset = false;
      state.error = action.payload;
    },

    // Audit Log
    fetchAuditLogRequest: (state) => {
      state.loading.auditLog = true;
    },
    fetchAuditLogSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading.auditLog = false;
      state.auditDumpMode = action.payload;
    },
    toggleAuditLogRequest: (state, _action: PayloadAction<boolean>) => {
      state.loading.auditLog = true;
    },
    toggleAuditLogSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading.auditLog = false;
      state.auditDumpMode = action.payload;
    },

    // Interception Mode
    fetchInterceptionModeRequest: (state) => {
      state.loading.interceptionMode = true;
    },
    fetchInterceptionModeSuccess: (state, action: PayloadAction<string>) => {
      state.loading.interceptionMode = false;
      state.interceptionMode = action.payload;
    },
    setInterceptionModeRequest: (state, _action: PayloadAction<string>) => {
      state.loading.interceptionMode = true;
    },

    // Accreditations
    fetchAccreditationsRequest: (state) => {
      state.loading.accreditations = true;
    },
    fetchAccreditationsSuccess: (state, action: PayloadAction<AccreditationItem[]>) => {
      state.loading.accreditations = false;
      state.accreditations = action.payload;
    },
    addAccreditationRequest: (state, _action: PayloadAction<AccreditationItem>) => {
      state.loading.accreditations = true;
    },
    deleteAccreditationRequest: (state, _action: PayloadAction<number>) => {
      state.loading.accreditations = true;
    },

    // SSE Actions
    setSseStatus: (state, action: PayloadAction<'connected' | 'connecting' | 'disconnected'>) => {
      state.sseStatus = action.payload;
    },
    receiveTelemetryEvent: (state, action: PayloadAction<TelemetryEvent>) => {
      const payload = action.payload;

      // Inline real-time counter updates if present in telemetry event
      if (typeof payload.total_requests === 'number') {
        state.totalRequests = payload.total_requests;
      }
      if (typeof payload.pirsig_blocked === 'number') {
        state.pirsigBlocked = payload.pirsig_blocked;
      }
      if (typeof payload.tokens_saved_total === 'number') {
        state.tokensSavedTotal = payload.tokens_saved_total;
      }

      const event = {
        ...payload,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
      };

      const isLlmSecurityEvent =
        payload.event_type === 'request_intercepted' ||
        payload.event_type === 'dlp_block' ||
        payload.event_type === 'sse_rehydrated_chunk' ||
        payload.pirsig !== undefined ||
        payload.ockham !== undefined;

      if (isLlmSecurityEvent) {
        // Place LLM / Pirsig / Ockham events at top
        state.telemetryEvents = [event, ...state.telemetryEvents].slice(0, 500);
      } else {
        // Keep raw io_stream network events bounded
        state.telemetryEvents = [event, ...state.telemetryEvents].slice(0, 500);
      }
    },
    receiveTelemetryBatch: (state, action: PayloadAction<TelemetryEvent[]>) => {
      const formatted = action.payload.map(evt => ({
        ...evt,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
      }));

      state.telemetryEvents = [...formatted.reverse(), ...state.telemetryEvents].slice(0, 500);
    },
    clearTelemetryEvents: (state) => {
      state.telemetryEvents = [];
    },
    setEventFilter: (state, action: PayloadAction<string>) => {
      state.eventFilter = action.payload;
    },
  },
});

export const {
  initSwgConfigRequest,
  setApiUrls,
  fetchStatusRequest,
  fetchStatusSuccess,
  fetchStatusFailure,
  togglePirsigRequest,
  togglePirsigSuccess,
  togglePirsigFailure,
  toggleOckhamRequest,
  toggleOckhamSuccess,
  toggleOckhamFailure,
  togglePanicRequest,
  togglePanicSuccess,
  togglePanicFailure,
  resetConnectionsRequest,
  resetConnectionsSuccess,
  resetConnectionsFailure,
  fetchAuditLogRequest,
  fetchAuditLogSuccess,
  toggleAuditLogRequest,
  toggleAuditLogSuccess,
  fetchInterceptionModeRequest,
  fetchInterceptionModeSuccess,
  setInterceptionModeRequest,
  fetchAccreditationsRequest,
  fetchAccreditationsSuccess,
  addAccreditationRequest,
  deleteAccreditationRequest,
  setSseStatus,
  receiveTelemetryEvent,
  receiveTelemetryBatch,
  clearTelemetryEvents,
  setEventFilter,
} = swgSlice.actions;

export default swgSlice.reducer;
