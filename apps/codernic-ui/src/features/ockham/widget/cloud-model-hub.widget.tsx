// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloudProviderAccordion } from '../components/organisms/CloudProviderAccordion';
import {
  selectCloudDigest,
  selectCloudDigestLoading,
  selectCloudDigestError,
} from '../../models/store/models.slice';
import type { CloudModel } from '../../models/store/models.slice';
import { selectLlmProviders } from '../../../entities/assets/model/assets-slice';
import { IconLoader, IconAlertTriangle } from '@codernic/components';
import { sendIntent } from '../../../shared/store/intent';

// ─── Ockham search result listener ────────────────────────────────────────────

function useOckhamSearch(query: string, matchType: string) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<CloudModel[] | null>(null);
  const [searching, setSearching] = useState(false);

  const runSearch = useCallback(() => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    dispatch(sendIntent({ type: 'codernic:ockham-search-models', payload: { query, match_type: matchType } }));
  }, [query, matchType, dispatch]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'codernic:ockham-search-result') {
        setSearchResults(event.data.payload?.models ?? []);
        setSearching(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Debounce query to avoid hammering the SQLite backend
  useEffect(() => {
    const t = setTimeout(runSearch, 250);
    return () => clearTimeout(t);
  }, [runSearch]);

  return { searchResults, searching };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CloudModelHubWidget() {
  const dispatch = useDispatch();
  const digest = useSelector(selectCloudDigest);
  const loading = useSelector(selectCloudDigestLoading);
  const error = useSelector(selectCloudDigestError);
  const localProviders = useSelector(selectLlmProviders) || {};

  const [query, setQuery] = useState('');
  const [matchType, setMatchType] = useState('Contains');

  // Ockham SQLite-backed search (explicit MCP tool call via extension)
  const { searchResults, searching } = useOckhamSearch(query, matchType);

  useEffect(() => {
    if (!digest && !loading) {
      dispatch({ type: 'assets/fetchCloudModelsRequest' });
    }
  }, [digest, loading, dispatch]);

  const isModelConfigured = (modelId: string) => {
    return Object.values(localProviders).some(
      (provider: any) => provider?.models?.some((m: any) => m.id === modelId)
    );
  };

  const handleAddModel = (providerId: string, m: CloudModel) => {
    dispatch({
      type: 'assets/addCloudModelRequest',
      payload: {
        providerId,
        model: {
          id: m.id,
          name: m.name,
          contextWindow: m.context_length || 4096,
          pricing: m.pricing,
        },
      },
    });
  };

  const handleSaveProvider = (providerId: string, apiKey: string, baseUrl: string) => {
    dispatch(sendIntent({
      type: 'codernic:save-llm-provider',
      payload: {
        type: 'remote',
        providerId,
        apiKey,
        baseUrl,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <IconLoader size={28} className="animate-spin text-[var(--amber-400)]" />
        <span className="text-[11px] text-[var(--text-muted)] tracking-[0.02em]">Loading Cloud Providers…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="badge badge-red text-[11px] py-1.5 px-2.5 rounded-[var(--radius-sm)] flex gap-1.5 items-start">
        <IconAlertTriangle size={12} />
        {error}
      </div>
    );
  }

  if (!digest) return null;

  const providers = digest.providers || [];

  // When a query is active, use Ockham SQLite results; fallback to digest for empty query.
  const activeModels = query.trim()
    ? (searchResults ?? [])
    : (digest.models || []);

  return (
    <div className="flex flex-col h-full gap-4 p-2 overflow-y-auto scrollbar-thin">
      {/* Search bar */}
      <div className="flex gap-2 items-center mb-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models via Ockham…"
            className="w-full px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md text-[11px] text-[var(--text-main)] focus:outline-none focus:border-[var(--amber-400)] transition-colors"
          />
          {searching && (
            <IconLoader
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-[var(--amber-400)]"
            />
          )}
        </div>
        <select
          value={matchType}
          onChange={(e) => setMatchType(e.target.value)}
          className="px-2 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md text-[11px] text-[var(--text-main)] focus:outline-none focus:border-[var(--amber-400)] transition-colors"
        >
          <option value="Contains">Contains</option>
          <option value="StartsWith">Starts</option>
          <option value="EndsWith">Ends</option>
          <option value="Strict">Strict</option>
        </select>
      </div>

      {/* Grouped by provider */}
      <div className="flex flex-col gap-2">
        {providers.map((p) => {
          const pModels = activeModels.filter((m) => m.provider === p.id);
          if (pModels.length === 0 && query !== '') return null;

          return (
            <CloudProviderAccordion
              key={p.id}
              provider={p}
              localProvider={localProviders[p.id]}
              models={pModels}
              isModelConfigured={isModelConfigured}
              onAddModel={(m) => handleAddModel(p.id, m)}
              onSaveProvider={handleSaveProvider}
            />
          );
        })}
      </div>
    </div>
  );
}
