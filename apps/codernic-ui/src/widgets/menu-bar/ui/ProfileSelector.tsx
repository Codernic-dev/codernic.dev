// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useDispatch, useSelector } from 'react-redux';
import { selectActiveProfile, setActiveProfile, PROFILE_PAGES_MAP, type ProfileType } from '../../../entities/app/model/app-slice';
import { useState, useRef, useEffect } from 'react';

export function ProfileSelector({ onSelectLayout }: { onSelectLayout?: (layout: string) => void }) {
  const dispatch = useDispatch();
  const activeProfileKey = useSelector(selectActiveProfile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeProfileObj = PROFILE_PAGES_MAP[activeProfileKey] || PROFILE_PAGES_MAP.developer;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProfile = (key: ProfileType) => {
    dispatch(setActiveProfile(key));
    setIsOpen(false);
    
    // Switch to first page layout of selected profile
    const firstPage = PROFILE_PAGES_MAP[key]?.pages[0];
    if (firstPage && onSelectLayout) {
      onSelectLayout(firstPage.layoutName);
    }
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          color: '#e2e8f0',
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
      >
        <span style={{ color: '#94a3b8', fontWeight: 400 }}>Profil:</span>
        <span style={{ color: '#fbbf24' }}>{activeProfileObj.name}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            width: '180px',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '6px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            padding: '4px',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: '4px 8px', fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sélectionner un Profil
          </div>
          {(Object.keys(PROFILE_PAGES_MAP) as ProfileType[]).map((key) => {
            const profile = PROFILE_PAGES_MAP[key];
            const isSelected = key === activeProfileKey;
            return (
              <div
                key={key}
                onClick={() => handleSelectProfile(key)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#fbbf24' : '#cbd5e1',
                  background: isSelected ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{profile.name}</span>
                {isSelected && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
