# Icons & Logos Complete Reference Library

Complete catalog of all 60+ system icons, 6 sovereignty business icons, corporate brand emblem, and domain concept icons supported across the Codernic component system.

## Live System Icons & Logo Catalog

<ReactSpecimen componentName="icons-and-logos" />

## Sovereignty Business Icons

<ReactSpecimen componentName="business-icons" />

## Codernic Official Brand Emblem (60°/120° Isometric Mark)

<ReactSpecimen componentName="icon-codernic" />

## Icon Usage Guide

### 1. System SVG Icons
Import individual stroke-based icons directly from `@codernic/components`:

```tsx
import { IconCpu, IconTerminal, IconShield, IconZap, IconDag } from '@codernic/components';

export function StatusToolbar() {
  return (
    <div className="flex items-center gap-3">
      <IconCpu size={20} color="#fbbf24" />
      <IconTerminal size={20} color="#4ade80" />
      <IconShield size={20} color="#60a5fa" />
    </div>
  );
}
```

### 2. Sovereignty Business Icons
Import engine-accented business icons with built-in pillar theme support:

```tsx
import {
  DemingGPUHostIcon,
  VectorVaultIcon,
  DAGPipelineLockIcon,
  LocalQuantizationIcon,
  DLPScrubberIcon,
  AirGapStatusIcon
} from '@codernic/components';

export function PillarMetrics() {
  return (
    <div className="flex items-center gap-4">
      <DemingGPUHostIcon size={24} pillar="deming" />
      <VectorVaultIcon size={24} pillar="ragtime" />
      <DAGPipelineLockIcon size={24} pillar="galileus" />
      <LocalQuantizationIcon size={24} pillar="ockham" />
      <DLPScrubberIcon size={24} pillar="pirsig" />
    </div>
  );
}
```

### 3. Isometric Brand Logo
Import the official Codernic brand mark:

```tsx
import { IconCodernic } from '@codernic/components';

<IconCodernic size={48} />
```
