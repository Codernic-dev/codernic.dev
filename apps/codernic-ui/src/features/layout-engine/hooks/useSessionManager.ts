// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { sendIntent } from '../../../shared/store/intent';

export function useSessionManager() {
  const dispatch = useDispatch();
  const [isRecentSessionsOpen, setIsRecentSessionsOpen] = useState(false);

  const sessionsMap = useSelector((state: RootState) => state.sessions.sessions);
  const sessions = Object.values(sessionsMap || {});
  const currentSessionId = useSelector((state: RootState) => state.sessions.currentSessionId);

  const handleNewSession = useCallback(() => {
    const newSessionId = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}`;
    dispatch({ 
      type: 'sessions/addSession', 
      payload: { id: newSessionId, name: 'New Session', status: 'idle', last_updated: Date.now() } 
    });
    dispatch({ type: 'sessions/setCurrentSessionId', payload: newSessionId });
    dispatch({
      type: 'sessions/updateSessionStatus',
      payload: { id: newSessionId, status: 'idle' },
    });
    dispatch({ type: 'chat/setMessages', payload: [] });
    setIsRecentSessionsOpen(false);
  }, [dispatch]);

  const handleRecentSessions = useCallback(() => {
    setIsRecentSessionsOpen(true);
  }, []);

  const handleLoadSession = useCallback((id: string) => {
    dispatch(sendIntent({ type: 'codernic:load-session', payload: { id } }));
    setIsRecentSessionsOpen(false);
  }, [dispatch]);

  const handleDeleteSession = useCallback((id: string) => {
    dispatch(sendIntent({ type: 'codernic:delete-session', payload: { id } }));
    dispatch({ type: 'sessions/removeSession', payload: id });
  }, [dispatch]);

  return {
    isRecentSessionsOpen,
    setIsRecentSessionsOpen,
    sessions,
    currentSessionId,
    handleNewSession,
    handleRecentSessions,
    handleLoadSession,
    handleDeleteSession
  };
}
