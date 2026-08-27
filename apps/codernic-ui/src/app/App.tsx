// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vscode } from '../shared';
import { Button } from '@codernic/components';
import { useIntrospection } from '../../../../packages/components/src/introspection/hooks/useIntrospection';
import { addContextFile } from '../features/chat/store/chat.slice';
import { sendIntent } from '../shared/store/intent';
import { setWorkspaceName, setWorkspaceId, selectSandboxMode, selectWaitingForDaemonOverlay, setDaemonIsLoaded, setActiveProfile } from '../entities/app/model/app-slice';
import { isTauri } from '../shared/utils/env';
import { setJsonEditorSchemas } from '../entities/assets/model/assets-slice';
import { setAppVersion, selectWsStatus, selectLicenseModules, appendSystemLogsBatch } from '../features/system/store/system.slice';
import { useFileDrop } from '../features/context-files';
import { openModal, closeModal } from '../features/modal/store/modal.slice';
import { LayoutValidator } from '../features/layout-engine/util/LayoutValidator';
import { fetchNotificationsRequest } from '../entities/notifications/model/notifications-slice';
import { GlobalSequencerHost } from './ui/GlobalSequencerHost';
import { AppShell } from './ui/AppShell';
import { AgnosticModalProvider } from '../features/modal/ui/AgnosticModalProvider';

export function App(): JSX.Element {
  const dispatch = useDispatch();

  const [helpModalInfo, setHelpModalInfo] = useState<{ isOpen: boolean; widgetName?: string; docUrl?: string }>({ isOpen: false });
  const [missingEnvPkgs, setMissingEnvPkgs] = useState<string[] | null>(null);
  const [isSplashMinTimeMet, setIsSplashMinTimeMet] = useState(false);

  const sandboxMode = useSelector(selectSandboxMode);
  const wsStatus = useSelector(selectWsStatus);
  const licenseModules = useSelector(selectLicenseModules);
  const waitingForDaemon = useSelector(selectWaitingForDaemonOverlay);

  // Hook file drop
  useFileDrop();

  // Initial boot profile check (?profile=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const profileParam = params.get('profile');
      if (profileParam && ['developer', 'architect', 'security', 'swg_sentinel', 'knowledge', 'admin'].includes(profileParam)) {
        dispatch(setActiveProfile(profileParam as any));
      }
    }
  }, [dispatch]);

  // Initial bootstrap request to Tauri / extension host
  useEffect(() => {
    dispatch(
      openModal(
        { type: 'splash', title: 'Starting Engine...', cancelText: 'Close Splash' },
        { resolve: () => dispatch(closeModal()), reject: () => {} }
      )
    );

    const timer = setTimeout(() => setIsSplashMinTimeMet(true), 3500);

    try {
      if (isTauri()) {
        dispatch({ type: 'tauri/initRequest' });
      } else {
        dispatch(appendSystemLogsBatch({ message: '[APP] Non-Tauri environment detected.' }));
      }
    } catch (e) {
      console.warn('Tauri init note', e);
    }

    return () => clearTimeout(timer);
  }, [dispatch, sandboxMode]);

  // Close Splash Screen when conditions are met
  useEffect(() => {
    if (isSplashMinTimeMet) {
      if (wsStatus === 'connected' || isTauri() || (licenseModules && licenseModules.length > 0)) {
        dispatch(closeModal());
      }
    }
  }, [isSplashMinTimeMet, wsStatus, licenseModules, dispatch]);

  // Data fetching - only once daemon is connected
  useEffect(() => {
    if (wsStatus === 'connected') {
      dispatch(fetchNotificationsRequest());
      if (!sandboxMode) {
        dispatch({ type: 'assets/fetchSchemasRequest' });
      }
      vscode.postMessage({ type: 'codernic:ready' });
      vscode.postMessage({ type: 'codernic:get-last-mode' });
      vscode.postMessage({ type: 'codernic:get-env-check' });
      vscode.postMessage({ type: 'codernic:request-llms' });
      vscode.postMessage({ type: 'codernic:load-layouts' });
      dispatch(sendIntent({ type: 'codernic:get-sessions' }));
    }
  }, [wsStatus, dispatch, sandboxMode]);

  // Expose system-level Introspection API
  useIntrospection({
    id: 'system-root',
    type: 'system',
    methods: {
      dispatchRedux: (action: any) => {
        dispatch(action);
      },
      dispatchReduxBatch: (actions: any[]) => {
        actions.forEach((action) => dispatch(action));
      },
    },
  });

  // Listen to platform bridge messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const msg = e.data;
      if (msg.type === 'codernic:workspace-info' && msg.payload?.name) {
        dispatch(setWorkspaceName(msg.payload.name));
        if (msg.payload.id) {
          dispatch(setWorkspaceId(msg.payload.id));
        }
      }
      if (msg.type === 'codernic:env-check') {
        setMissingEnvPkgs(msg.payload?.missing || []);
        if (msg.payload?.version) {
          dispatch(setAppVersion(msg.payload.version));
        }
      } else if (msg.type === 'CODERNIC_CONTEXT_ADD_FILE') {
        const fileName = msg.filePath.split(/[/\\]/).pop() || msg.filePath;
        dispatch(
          addContextFile({
            id: String(Date.now()),
            filePath: msg.filePath,
            fileName,
            lines: msg.lines,
          })
        );
      } else if (msg.type === 'codernic:json-schemas') {
        dispatch(setJsonEditorSchemas(msg.payload || {}));
      } else if (msg.type === 'codernic:load-layouts') {
        const layoutPayload = msg.payload;
        if (
          !LayoutValidator.validateSchema(layoutPayload) ||
          !LayoutValidator.validateGraphConsistency(layoutPayload)
        ) {
          console.error('[LayoutValidator] SECURITY FAULT: Layout validation failed.');
        }
      }
    };
    window.addEventListener('message', handleMessage);

    const handleActivateIntrospection = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      dispatch({ type: 'introspection/setActiveIntrospection', payload: customEvent.detail });
      dispatch({ type: 'app/setActiveRightPanelTab', payload: 'introspection' });
    };
    window.addEventListener('codernic:activate-introspection', handleActivateIntrospection);

    const handleOpenHelpModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ widgetName?: string; docUrl?: string }>;
      setHelpModalInfo({
        isOpen: true,
        widgetName: customEvent.detail?.widgetName || 'Widget',
        docUrl: customEvent.detail?.docUrl,
      });
    };
    window.addEventListener('codernic:open-help-modal', handleOpenHelpModal);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('codernic:activate-introspection', handleActivateIntrospection);
      window.removeEventListener('codernic:open-help-modal', handleOpenHelpModal);
    };
  }, [dispatch]);

  // Daemon synchronization
  useEffect(() => {
    if (wsStatus === 'connected' || isTauri()) {
      dispatch(setDaemonIsLoaded(true));
    } else if (wsStatus === 'disconnected' && !isTauri()) {
      dispatch(setDaemonIsLoaded(false));
    }
  }, [wsStatus, dispatch]);

  if (missingEnvPkgs && missingEnvPkgs.length > 0) {
    return (
      <>
        <AgnosticModalProvider />
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 mb-6 text-yellow-500 font-bold text-4xl flex items-center justify-center">!</div>
          <h1 className="text-2xl font-bold mb-4 text-zinc-100">Missing Dependencies</h1>
          <p className="text-zinc-400 max-w-md mb-8">
            To use the local environment, please install these missing packages:
          </p>
          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 mb-8 w-full max-w-lg shadow-xl">
            <code className="text-sm text-yellow-400/90 font-mono break-all text-left block">
              npm install {missingEnvPkgs.join(' ')} -D
            </code>
          </div>
          <Button onClick={() => window.location.reload()} variant="primary" className="shadow-lg shadow-blue-500/20">
            Check Again
          </Button>
        </div>
      </>
    );
  }

  if (waitingForDaemon) {
    return (
      <>
        <AgnosticModalProvider />
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-950 animate-in fade-in duration-700">
          <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white tracking-tight">Warming up Engine...</h1>
          <p className="text-zinc-400 max-w-md mb-10 text-lg">
            Codernic is waiting for the backend daemon to accept connections.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            className="px-8 py-3 text-sm font-medium hover:scale-105 transition-transform text-zinc-400 hover:text-white"
          >
            Force Reload
          </Button>
        </div>
      </>
    );
  }

  return (
    <GlobalSequencerHost>
      <AppShell
        helpModalInfo={helpModalInfo}
        onCloseHelpModal={() => setHelpModalInfo({ isOpen: false })}
      />
    </GlobalSequencerHost>
  );
}
