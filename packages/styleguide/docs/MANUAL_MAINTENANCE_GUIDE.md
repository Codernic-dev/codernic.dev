# Codernic Styleguide — Human Developer Maintenance Guide

This document provides clear, step-by-step instructions for human engineers to maintain, update, and extend `@codernic/styleguide` without AI assistance.

## 1. How to Add or Modify Design Tokens

1. Open `packages/styleguide/src/css/tokens.css`.
2. Add your new custom CSS property under `:root`. Use standard CSS variable naming: `--category-name`.
3. If adding a new pillar or module color, define:
   - `--pillar-<name>`: Primary accent hex.
   - `--pillar-<name>-glow`: Semi-transparent rgba glow.
   - `--pillar-<name>-bg`: Tinted background surface.

## 2. How to Update Typography

1. Open `packages/styleguide/src/css/typography.css`.
2. If introducing a new font family, update the `@import url(...)` at the top of the file to load Google Fonts.
3. Update `--font-display`, `--font-body`, or `--font-mono` variables.

## 3. How to Test & Preview Visual Changes

Run the built-in visual demo server from the root of the monorepo:

```bash
pnpm --filter @codernic/styleguide dev
```

Or open `packages/styleguide/demo/index.html` directly in any web browser.

## 4. How to Update Consuming Applications

When modifying tokens, verify that all consuming applications (`@codernic/components`, `codernic.dev`, `codernic-hub`, `codernic-customer-portal`, `codernic-security-center`) compile cleanly by running:

```bash
pnpm -r build
```
