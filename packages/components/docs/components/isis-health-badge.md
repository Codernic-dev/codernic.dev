# IsisHealthBadge Component

Telemetry health badge reflecting the real-time status of the Rust `isis-toolbox` daemon engine.

## Live React Component Render

<ReactSpecimen componentName="isis-health-badge" />

## Usage

```tsx
import { IsisHealthBadge } from '@codernic/components/isis';

<IsisHealthBadge status="online" label="ISIS DAEMON ONLINE" />
<IsisHealthBadge status="degraded" label="DEGRADED (HIGH VRAM)" />
<IsisHealthBadge status="offline" label="AIR-GAP DISCONNECTED" />
```

## Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `'online' \| 'degraded' \| 'offline'` | Required | Daemon connectivity status |
| `label` | `string` | Required | Status text label |
