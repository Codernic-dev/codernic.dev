// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useEffect } from 'react';
import { WidgetHub, WidgetEvent } from '../lib/WidgetHub';

/**
 * Hook to subscribe to a WidgetHub event type cleanly within a React component.
 * Automatically unsubscribes on unmount.
 */
export function useHubEvent(type: string, callback: (event: WidgetEvent) => void | Promise<void>) {
  useEffect(() => {
    const unsubscribe = WidgetHub.subscribe(type, callback);
    return () => unsubscribe();
  }, [type, callback]);
}
