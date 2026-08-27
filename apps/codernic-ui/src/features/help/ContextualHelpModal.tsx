// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';

export interface ContextualHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName?: string;
  docUrl?: string;
}

export function ContextualHelpModal({ isOpen, onClose, widgetName = 'Widget', docUrl }: ContextualHelpModalProps) {
  if (!isOpen) return null;

  const targetUrl = docUrl || 'https://docs.codernic.dev';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1e293b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ?
            </span>
            <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
              Aide Contextuelle — {widgetName}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 16px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
          <p style={{ marginTop: 0 }}>
            {docUrl
              ? `Documentation officielle et tutoriels pour l'utilisation du widget ${widgetName}.`
              : `Consultez la documentation globale de Codernic Studio sur notre portail souverain.`}
          </p>
          <div
            style={{
              padding: '10px 12px',
              backgroundColor: '#1e293b',
              borderRadius: '4px',
              border: '1px solid #334155',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#93c5fd',
              wordBreak: 'break-all',
              marginTop: '12px',
            }}
          >
            {targetUrl}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            backgroundColor: '#0f172a',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #334155',
              borderRadius: '4px',
              color: '#94a3b8',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Fermer
          </button>
          <button
            onClick={() => window.open(targetUrl, '_blank')}
            style={{
              padding: '6px 12px',
              backgroundColor: '#fbbf24',
              border: 'none',
              borderRadius: '4px',
              color: '#0f172a',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ouvrir la Documentation ↗
          </button>
        </div>
      </div>
    </div>
  );
}
