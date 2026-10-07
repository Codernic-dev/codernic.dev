// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import '../index.css';
import { store } from '../store';
import { ErrorBoundary } from './ErrorBoundary.tsx';

// Introspection Engine (For TDD & Scripting Validation)
import '../../../../packages/components/src/introspection/core/IntrospectionRegistry';
import '../../../../packages/components/src/introspection/tests/validateIntrospection';

// Sovereign SSO Caller & Backoffice Route Interception (/idp, /customer, /hub, /sandbox)
if (typeof window !== 'undefined') {
  const path = window.location.pathname.toLowerCase();
  if (path === '/idp' || path.startsWith('/idp/')) {
    window.location.href = 'https://sso.codernic.dev/idp';
  } else if (path === '/customer' || path.startsWith('/customer/')) {
    window.location.href = 'https://sso.codernic.dev/customer';
  } else if (path === '/hub' || path.startsWith('/hub/')) {
    window.location.href = 'https://sso.codernic.dev/hub';
  } else if (path === '/sandbox' || path.startsWith('/sandbox/')) {
    window.location.href = 'https://sso.codernic.dev/sandbox';
  }
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
);
