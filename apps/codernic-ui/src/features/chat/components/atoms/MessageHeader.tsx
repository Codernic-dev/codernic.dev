// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { WidgetHub } from '@codernic/components';

export interface MessageHeaderProps {
  messageId: string;
  role: string;
}

export function MessageHeader({ messageId, role }: MessageHeaderProps): JSX.Element {
  const getRoleHeader = () => {
    switch (role) {
      case 'system':
        return 'SYSTEM';
      case 'user':
        return 'YOU';
      default:
        return 'CODERNIC';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'system':
        return 'rgba(129, 140, 248, 0.7)'; // Muted indigo
      case 'user':
        return 'rgba(59, 130, 246, 0.7)'; // Muted blue
      default:
        return 'rgba(16, 185, 129, 0.7)'; // Muted emerald
    }
  };

  const handleFocusIntrospection = () => {
    WidgetHub.publish({
      type: 'codernic:focus-introspection-message',
      payload: { id: messageId },
      dedupKey: `focus-intro-msg-${messageId}`,
    });
  };

  return (
    <div
      title="Click to locate in Introspection Panel"
      onClick={handleFocusIntrospection}
      className="cursor-pointer hover:opacity-80 transition-opacity font-mono text-[9px] font-bold tracking-[0.08em] inline-block"
      style={{ color: getRoleColor() }}
    >
      {getRoleHeader()}
    </div>
  );
}
