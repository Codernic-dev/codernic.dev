// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { loginSuccess, type UserIdentity } from '../store/auth.slice';
import { Button, Heading, Text, Card } from '@codernic/components';

declare global {
  interface Window {
    __TAURI__?: unknown;
  }
}

export interface LoginOverlayProps {
  children: React.ReactNode;
}

export const LoginOverlay = ({ children }: LoginOverlayProps): JSX.Element => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for custom window message for OAuth callback in web mode
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'codernic:auth-success') {
        dispatch(loginSuccess({
          user: event.data.payload.user,
          token: event.data.payload.token,
        }));
        setLoading(false);
      } else if (event.data?.type === 'codernic:auth-error') {
        setError(event.data.payload.message);
        setLoading(false);
      }
    };

    window.addEventListener('message', handleAuthMessage);

    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, [dispatch]);

  const handleLogin = async (providerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { getCodernicHttpUrl } = await import('../../../shared/config');
      const baseUrl = getCodernicHttpUrl();
      const url = `${baseUrl}/api/auth/login/${providerId}`;

      if (typeof window !== 'undefined' && window.__TAURI__) {
        // Open the in-app WebviewWindow for OAuth flow
        const oauthWindow = new WebviewWindow('oauth-login', {
          url: url,
          title: 'Enterprise Access',
          width: 600,
          height: 700,
          center: true,
          focus: true
        });

        oauthWindow.once('tauri://error', () => {
          setError('Failed to open login window');
          setLoading(false);
        });
      } else {
        // Fallback for web mode
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(
          url,
          'OAuth',
          `width=${width},height=${height},left=${left},top=${top}`
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to start login flow');
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <Card className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/30">
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <Heading level={2} className="text-white mb-2">
          Enterprise Access
        </Heading>
        
        <Text className="text-zinc-400 mb-8">
          Please sign in with your corporate identity provider to access this workspace.
        </Text>

        {error && (
          <div className="w-full p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="w-full space-y-3">
          <Button 
            className="w-full justify-center bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
            onClick={() => handleLogin('github')}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect with GitHub'}
          </Button>
          <Button 
            className="w-full justify-center bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
            onClick={() => handleLogin('entraid')}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect with Microsoft Entra ID'}
          </Button>

          {import.meta.env.DEV && (
            <div className="w-full mt-4 pt-4 border-t border-zinc-800">
              <Button
                className="w-full justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-amber-400/40"
                onClick={() => {
                  dispatch(loginSuccess({
                    user: { id: 'qa-bot', name: 'QA Agent', email: 'qa@codernic.ai', role: 'admin' },
                    token: 'qa-bypass-token'
                  }));
                }}
              >
                🛠 QA Debug Bypass
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
