# `@codernic/styleguide`

The centralized design system tokens, typography, mobile responsive rules, micro-animations, and brand assets for the **Codernic Sovereign AI Ecosystem**.

## 1. Structure

- `src/css/tokens.css`: Core design tokens (Amber primary + 5 Sovereignty Pillar colors: Deming Red `#F87171`, Ragtime Blue `#60A5FA`, Galileus Green `#4ADE80`, Ockham Teal `#2DD4BF`, Pirsig Purple `#A78BFA`).
- `src/css/typography.css`: Signature typography imports (**Outfit**, **Inter**, **JetBrains Mono**).
- `src/css/responsive.css`: Mobile-first compact responsive rules (`< 768px`).
- `src/css/animations.css`: Keyframe animations and pillar dynamic glow utilities.
- `src/tailwind.preset.cjs`: Shared Tailwind CSS theme preset.
- `demo/index.html`: Standalone browser HTML showcase.
- `docs/MANUAL_MAINTENANCE_GUIDE.md`: Step-by-step developer maintenance guide.

## 2. Usage in Consuming Applications

```css
/* In your application global CSS (e.g., globals.css or index.css) */
@import "@codernic/styleguide";
```

Or import specific modules:

```css
@import "@codernic/styleguide/tokens";
@import "@codernic/styleguide/typography";
@import "@codernic/styleguide/responsive";
```
