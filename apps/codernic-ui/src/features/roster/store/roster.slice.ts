// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AgentState {
  id: string;
  role: string;
  status: 'Ready' | 'Training' | 'Uninitialized';
  lastTrained: number | null;
}

export interface RosterState {
  agents: AgentState[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RosterState = {
  agents: [],
  isLoading: false,
  error: null,
};

export const rosterSlice = createSlice({
  name: 'roster',
  initialState,
  reducers: {
    setRosterData: (state, action: PayloadAction<AgentState[]>) => {
      state.agents = action.payload;
    },
    setRosterLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRosterError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRosterData, setRosterLoading, setRosterError } = rosterSlice.actions;

export default rosterSlice.reducer;
