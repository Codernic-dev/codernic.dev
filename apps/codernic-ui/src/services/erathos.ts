// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export interface ErathosCompletion {
  suggestions: string[];
}

import { getErathosMcpUrl } from '../shared/config';

export class ErathosService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? getErathosMcpUrl();
  }

  async getCompletions(prefix: string, suffix: string = ''): Promise<ErathosCompletion> {
    try {
      const response = await fetch(`${this.baseUrl}/api/erathos/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefix, suffix }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (e) {
      console.warn('Erathos completion failed', e);
      return { suggestions: [] };
    }
  }
}

export const erathos = new ErathosService();
