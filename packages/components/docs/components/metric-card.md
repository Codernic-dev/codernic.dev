# MetricCard Molecule Component

High-density stat card for telemetry metrics, memory allocations, and latency figures.

## Live React Component Render

<ReactSpecimen componentName="metric-card" />

## Usage

```tsx
import { MetricCard } from '@codernic/components/molecules';

<MetricCard label="Bare-Metal TFLOPS" value="142.8 TFLOPS" size="lg" />
<MetricCard label="Ragtime Vector Index" value="2,410,980" />
<MetricCard label="DAG Latency" value="1.4 ms" />
```
