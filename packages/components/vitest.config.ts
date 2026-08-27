// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment:  'jsdom',
    globals:      false,
    setupFiles:   ['./vitest.setup.ts'],
  },
})
