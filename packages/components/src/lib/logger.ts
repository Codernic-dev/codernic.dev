// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

const IS_DEV = (import.meta as any).env ? (import.meta as any).env.DEV : (globalThis as any).process?.env?.NODE_ENV !== 'production';

export const logger = {
  info: (...args: any[]) => {
    if (IS_DEV) console.info(...args);
  },
  warn: (...args: any[]) => {
    if (IS_DEV) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (IS_DEV) console.error(...args);
  },
  debug: (...args: any[]) => {
    if (IS_DEV) console.debug(...args);
  }
};
