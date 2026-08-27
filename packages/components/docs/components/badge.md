# Badge Atom Component

The `Badge` component displays compact status indicators colored according to the 5 Sovereignty Pillars.

## Live React Component Render

<ReactSpecimen componentName="badge" />

## Visual Specimen Preview

<Specimen type="badge" />


## Usage

```tsx
import { Badge } from '@codernic/components/atoms';

<Badge pillar="deming">01. Deming Execution</Badge>
<Badge pillar="ragtime">02. Ragtime Memory</Badge>
<Badge pillar="galileus">03. Galileus Governance</Badge>
<Badge pillar="ockham">04. Ockham Optimization</Badge>
<Badge pillar="pirsig">05. Pirsig Security</Badge>
```

## Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `pillar` | `'amber' \| 'deming' \| 'ragtime' \| 'galileus' \| 'ockham' \| 'pirsig'` | `'amber'` | Dynamic pillar color accent |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size dimension |
