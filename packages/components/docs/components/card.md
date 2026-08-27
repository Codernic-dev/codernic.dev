# Card Atom Component

The `Card` component is a flexible structural surface container with subtle glassmorphism borders and hover glows.

## Live React Component Render

<ReactSpecimen componentName="card" />

## Visual Specimen Preview

<Specimen type="card" />


## Usage

```tsx
import { Card } from '@codernic/components/atoms';

<Card pillar="galileus" className="p-5">
  <h3>Galileus Governance Card</h3>
  <p>Pillar-accented container with dynamic border glow.</p>
</Card>
```

## Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `pillar` | `'amber' \| 'deming' \| 'ragtime' \| 'galileus' \| 'ockham' \| 'pirsig'` | `undefined` | Optional pillar accent glow |
| `className` | `string` | `''` | Additional styling classes |
