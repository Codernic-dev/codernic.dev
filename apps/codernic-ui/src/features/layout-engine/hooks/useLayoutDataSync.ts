// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useState, useEffect, useCallback } from 'react';
import type { BlockState } from '@codernic/components/layout-engine';
import { DEFAULT_LAYOUTS } from '../model/default-layouts';
import { useDispatch, useSelector } from 'react-redux';
import { selectSandboxMode } from '../../../entities/app/model/app-slice';

export function useLayoutDataSync() {
  const getInitialLayout = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('layout') || 'Coder';
  };

  const [savedLayouts, setSavedLayouts] = useState<Record<string, Record<string, BlockState>>>(DEFAULT_LAYOUTS);
  const [activeLayoutName, setActiveLayoutName] = useState<string | null>(getInitialLayout);
  const [isLoaded, setIsLoaded] = useState(true);

  // Sync URL when active layout changes
  useEffect(() => {
    if (activeLayoutName) {
      const url = new URL(window.location.href);
      url.searchParams.set('layout', activeLayoutName);
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeLayoutName]);

  // Listen to browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const layout = params.get('layout');
      if (layout) setActiveLayoutName(layout);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const sandboxMode = useSelector(selectSandboxMode);

  const reduxDispatch = useDispatch();

  // Fetch layouts from API
  useEffect(() => {
    if (sandboxMode) {
      setIsLoaded(true);
      return;
    }
    reduxDispatch({ 
      type: 'layout/fetchLayoutsRequest',
      payload: {
        onSuccess: (layouts: any) => {
          setSavedLayouts((prev) => ({ ...prev, ...layouts }));
          setIsLoaded(true);
        },
        onError: () => setIsLoaded(true)
      }
    });
  }, [sandboxMode, reduxDispatch]);

  const handleSelectLayout = useCallback((layoutName: string, forceDefault: boolean = false) => {
    const url = new URL(window.location.href);
    url.searchParams.set('layout', layoutName);
    if (forceDefault) {
      url.searchParams.set('forceDefault', 'true');
    } else {
      url.searchParams.delete('forceDefault');
    }
    window.history.replaceState({}, '', url.toString());
    setActiveLayoutName(layoutName);
  }, []);

  return {
    savedLayouts,
    setSavedLayouts,
    activeLayoutName,
    setActiveLayoutName,
    isLoaded,
    handleSelectLayout
  };
}
