// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendIntent } from '../../../shared/store/intent';
import { AboutModal } from './AboutModal';
import { IconCodernic } from '@codernic/components';
import { NotificationBell } from './NotificationBell';

import { useSelector } from 'react-redux';
import { selectWorkspaceName, selectSandboxMode } from '../../../entities/app/model/app-slice';
import { selectLicenseModules } from '../../../features/system/store/system.slice';
import { ModuleLogo } from '../../../features/system/components/ModuleLogo';
import { useTestId } from '@codernic/components';

export interface IMenuBarProps {
  title?: string;
  onToggleLeft?: () => void;
  onRecentSessions?: () => void;
  onToggleRight?: () => void;
  onNewSession?: () => void;
  layouts?: string[];
  onSelectLayout?: (layout: string) => void;
  children?: React.ReactNode;
  dataTestId?: string;
}

import { selectActiveProfile, PROFILE_PAGES_MAP, selectShowHelpIcons, toggleShowHelpIcons } from '../../../entities/app/model/app-slice';
import { ProfileSelector } from './ProfileSelector';

export function MenuBar({ dataTestId, title = "CODERNIC STUDIO", onToggleLeft, onRecentSessions, onToggleRight, onNewSession, layouts = [], onSelectLayout, children }: IMenuBarProps) {
  const { rootId, getTestId } = useTestId('menu-bar', dataTestId);
  const dispatch = useDispatch();
  const workspaceName = useSelector(selectWorkspaceName);
  const sandboxMode = useSelector(selectSandboxMode);
  const activeProfileKey = useSelector(selectActiveProfile);
  const showHelpIcons = useSelector(selectShowHelpIcons);
  const licenseModules = useSelector(selectLicenseModules) || [];
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const executeAction = (action: () => void) => {
    setActiveMenu(null);
    action();
  };

  type MenuItem = { label?: string; action?: () => void; disabled?: boolean; isSeparator?: boolean; icon?: React.ReactNode };

  const currentProfilePages = (PROFILE_PAGES_MAP[activeProfileKey] || PROFILE_PAGES_MAP.developer).pages;
  const profileLayoutMenuItems = currentProfilePages.map(page => ({
    label: page.label,
    action: () => onSelectLayout && onSelectLayout(page.layoutName)
  }));

  const Menus: Record<string, MenuItem[]> = {
    ...(sandboxMode ? {} : {
      File: [
        { label: 'New Session',     action: () => onNewSession && onNewSession() },
        { label: 'Recent Sessions', action: () => onRecentSessions && onRecentSessions() },
        { label: 'Export Session',  action: () => dispatch(sendIntent({ type: 'codernic:export-session' })) },
        { label: 'Refresh',         action: () => window.location.reload() },
      ]
    }),
    ...(sandboxMode ? {
      Simulation: [
        { label: 'Play / Resume', action: () => console.log('Play simulator') },
        { label: 'Pause',         action: () => console.log('Pause simulator') },
        { label: 'Stop',          action: () => console.log('Stop simulator') },
        { isSeparator: true },
        { label: 'Exit Sandbox',  action: () => {
            localStorage.removeItem('FORCE_SANDBOX_MODE');
            window.location.reload();
        } },
      ],
      Onboarding: [
        { label: 'Start Architectural Tour', action: () => console.log('Start tour') },
        { label: 'Exhaustive Debug Demo',    action: () => console.log('Start exhaustive debug') },
      ]
    } : {}),
    View: [
      ...profileLayoutMenuItems,
      { isSeparator: true },
      { label: 'Reset Layout', action: () => {
          const layout = new URLSearchParams(window.location.search).get('layout');
          if (layout && localStorage.getItem(`codernic_layout_${layout}`)) {
            if (window.confirm('Reset this layout to its default state? This will discard all your widget sizing/position changes.')) {
              localStorage.removeItem(`codernic_layout_${layout}`);
              window.location.reload();
            }
          }
        } },
    ],
    ...(sandboxMode ? {} : {
      Agent: [
        { label: 'Start Engine Daemon',   action: () => dispatch(sendIntent({ type: 'codernic:daemon-action', payload: { action: 'start' } })) },
        { label: 'Stop Engine Daemon',    action: () => dispatch(sendIntent({ type: 'codernic:daemon-action', payload: { action: 'stop' } })) },
        { label: 'Restart Engine Daemon', action: () => dispatch(sendIntent({ type: 'codernic:daemon-action', payload: { action: 'restart' } })) },
        { label: 'Stop current Run',      action: () => dispatch(sendIntent({ type: 'codernic:stop-run' })) },
        { label: 'Clear Introspection',   action: () => dispatch(sendIntent({ type: 'codernic:clear-introspection' })) },
        { isSeparator: true },
        { label: 'Rebuild RAG Index',     action: () => dispatch(sendIntent({ type: 'codernic:rebuild-index' })) },
      ]
    }),
    Help: [
      { label: showHelpIcons ? 'Masquer l\'aide ? sur les widgets' : 'Afficher l\'aide ? sur les widgets', action: () => dispatch(toggleShowHelpIcons()) },
      { isSeparator: true },
      { label: 'Documentation Wiki', action: () => window.open('https://docs.codernic.dev', '_blank') },
      { label: 'About',         action: () => setIsAboutOpen(true) },
    ],
  };




  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          height: '30px',
          background: 'var(--bg-panel)',
          borderBottom: '1px solid var(--border)',
          userSelect: 'none',
          position: 'relative',
          zIndex: 50,
          flexShrink: 0,
        }}
      >
        {/* Logo / Brand */}
        <a 
          href="https://codernic.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Codernic"
          style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
        >
          <IconCodernic data-testid={getTestId('icon-codernic')} size={16} />
        </a>

        {/* Menu Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} ref={menuRef}>
          {Object.entries(Menus).map(([key, items]) => (
            <div key={key} style={{ position: 'relative' }}>
              <div
                onClick={() => handleMenuClick(key)}
                style={{
                  padding: '3px 8px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  fontWeight: activeMenu === key ? 600 : 400,
                  color: activeMenu === key ? 'var(--amber-400)' : 'var(--text-body)',
                  background: activeMenu === key ? 'var(--amber-glow)' : 'transparent',
                  border: `1px solid ${activeMenu === key ? 'rgba(245,158,11,0.2)' : 'transparent'}`,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (activeMenu !== key) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== key) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-body)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {key}
              </div>

              {/* Dropdown */}
              {activeMenu === key && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: 0,
                    minWidth: '175px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    zIndex: 100,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, var(--amber-glow-md), transparent)',
                      marginBottom: '3px',
                    }}
                  />
                  {items.map((item, idx) => (
                    item.isSeparator ? (
                      <div
                        key={idx}
                        style={{
                          height: '1px',
                          background: 'var(--border)',
                          margin: '4px 0',
                        }}
                      />
                    ) : (
                      <div
                        key={idx}
                        onClick={() => !item.disabled && item.action && executeAction(item.action)}
                        style={{
                          padding: '6px 10px',
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11px',
                          display: 'flex',
                          alignItems: 'center',
                          color: item.disabled ? 'var(--text-muted)' : 'var(--text-body)',
                          opacity: item.disabled ? 0.5 : 1,
                          transition: 'all 0.12s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!item.disabled) {
                            (e.currentTarget as HTMLElement).style.background = 'var(--amber-glow)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--amber-400)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!item.disabled) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'var(--text-body)';
                          }
                        }}
                      >
                        {item.icon && item.icon}
                        {item.label}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* App title in center */}
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 700,
            pointerEvents: 'none',
          }}
        >
          {workspaceName || title}
        </span>
        
        {/* Children on the right (e.g. Settings button & ProfileSelector) */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ProfileSelector onSelectLayout={onSelectLayout} />
          <NotificationBell data-testid={getTestId('notification-bell')} />
          {children && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {children}
            </div>
          )}
        </div>

      </div>

      <AboutModal data-testid={getTestId('about-modal')} isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}
