// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import { createAppState } from '@binaryjack/state-factories';
import { isTauri } from '../../../shared/utils/env';

export type ProfileType = 'developer' | 'architect' | 'security' | 'swg_sentinel' | 'knowledge' | 'admin';

export const PROFILE_PAGES_MAP: Record<ProfileType, { name: string; pages: { id: string; label: string; layoutName: string }[] }> = {
  developer: {
    name: 'Développeur',
    pages: [
      { id: 'dev-workbench', label: 'Code Workbench', layoutName: 'Coder' },
      { id: 'dev-git', label: 'Git & Versioning', layoutName: 'Coder' },
    ],
  },
  architect: {
    name: 'Architecte',
    pages: [
      { id: 'arch-dag', label: 'DAG Topology', layoutName: 'Architect' },
      { id: 'arch-daw', label: 'Execution DAW & Roster', layoutName: 'Integrator' },
    ],
  },
  security: {
    name: 'Sécurité & Conformité',
    pages: [
      { id: 'sec-dlp', label: 'Pirsig DLP & Token Savings', layoutName: 'pirsig_shield' },
      { id: 'sec-audit', label: 'Audit Immutable WORM', layoutName: 'Diagnostics' },
    ],
  },
  swg_sentinel: {
    name: 'SWG Sentinel Gateway',
    pages: [
      { id: 'swg-cockpit', label: 'SWG Cockpit & Telemetry', layoutName: 'swg_layout' },
      { id: 'swg-accreditation', label: 'Accreditation & Interception', layoutName: 'swg_accreditation' },
    ],
  },
  knowledge: {
    name: 'Knowledge Engineer',
    pages: [
      { id: 'rag-ingest', label: 'Document Ingestion Pipeline', layoutName: 'ragtime_node' },
      { id: 'rag-search', label: 'Vector Search Studio', layoutName: 'EnterpriseChatbot' },
    ],
  },
  admin: {
    name: 'Plateforme Admin',
    pages: [
      { id: 'admin-compute', label: 'Hardware & Compute Hub', layoutName: 'Admin' },
      { id: 'admin-routes', label: 'LLM Routes & Model Hub', layoutName: 'Ockham' },
    ],
  },
};

export interface AppState {
  loaders: Record<string, boolean>;
  workspaceName: string | null;
  workspaceId: string | null;
  sandboxMode: boolean;
  daemonIsLoaded: boolean;
  activeProfile: ProfileType;
  showHelpIcons: boolean;
}

const initialState: AppState = {
  loaders: {},
  workspaceName: null,
  workspaceId: null,
  sandboxMode: false,
  daemonIsLoaded: false,
  activeProfile: 'developer',
  showHelpIcons: true,
  ...(createAppState() as any),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ key: string; status: boolean }>) {
      if (action.payload.status) {
        state.loaders[action.payload.key] = true;
      } else {
        delete state.loaders[action.payload.key];
      }
    },
    clearAllLoaders(state) {
      state.loaders = {};
    },
    setWorkspaceName(state, action: PayloadAction<string>) {
      state.workspaceName = action.payload;
    },
    setWorkspaceId(state, action: PayloadAction<string>) {
      state.workspaceId = action.payload;
    },
    setSandboxMode(state, action: PayloadAction<boolean>) {
      state.sandboxMode = action.payload;
    },
    setDaemonIsLoaded(state, action: PayloadAction<boolean>) {
      state.daemonIsLoaded = action.payload;
    },
    setActiveProfile(state, action: PayloadAction<ProfileType>) {
      state.activeProfile = action.payload;
    },
    setShowHelpIcons(state, action: PayloadAction<boolean>) {
      state.showHelpIcons = action.payload;
    },
    toggleShowHelpIcons(state) {
      state.showHelpIcons = !state.showHelpIcons;
    },
  },
});

export const { setLoading, clearAllLoaders, setWorkspaceName, setWorkspaceId, setSandboxMode, setDaemonIsLoaded, setActiveProfile, setShowHelpIcons, toggleShowHelpIcons } = appSlice.actions;

export const selectLoaders = (state: RootState) => state.app.loaders;
export const selectIsAppLoading = (state: RootState) => Object.keys(state.app.loaders).length > 0;
export const selectWorkspaceName = (state: RootState) => state.app.workspaceName;
export const selectWorkspaceId = (state: RootState) => state.app.workspaceId;
export const selectSandboxMode = (state: RootState) => state.app.sandboxMode;
export const selectWaitingForDaemonOverlay = (state: RootState) => !state.app.sandboxMode && !state.app.daemonIsLoaded && !isTauri();
export const selectActiveProfile = (state: RootState) => state.app.activeProfile || 'developer';
export const selectShowHelpIcons = (state: RootState) => state.app.showHelpIcons ?? true;

export default appSlice.reducer;

