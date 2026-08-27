# IsisMetricBar Component

Telemetry progress bar for GPU VRAM allocation, CPU thread load, and memory RSS usage.

## Live React Component Render

<ReactSpecimen componentName="isis-metric-bar" />

## Usage

```tsx
import { IsisMetricBar } from '@codernic/components/isis';

<IsisMetricBar
  label="GPU VRAM Allocation (NVIDIA RTX 4090)"
  current={18.4}
  max={24.0}
  unit="GB"
/>
```
