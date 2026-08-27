# IsisDiagnosticCard Component

Structural card presenting diagnostic probe details, memory RSS, and latency figures.

## Live React Component Render

<ReactSpecimen componentName="isis-diagnostic-card" />

## Usage

```tsx
import { IsisDiagnosticCard } from '@codernic/components/isis';

<IsisDiagnosticCard
  probeId="isis_telemetry_probe_01"
  status="PASS"
  latencyMs={1.2}
  memoryRssMb={142}
/>
```
