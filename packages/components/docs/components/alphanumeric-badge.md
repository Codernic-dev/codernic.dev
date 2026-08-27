# Alphanumeric Badge Component

The `AlphanumericBadge` atom renders geometric step markers (`0`–`9`, `A`–`Z`, `#`, `*`) in isometric rounded frames.

## Live React Component Render

<ReactSpecimen componentName="alphanumeric-badge" />

## Usage

```tsx
import { AlphanumericBadge } from '@codernic/components/atoms';

<AlphanumericBadge char="1" pillar="deming" size="md" />
<AlphanumericBadge char="A" pillar="ragtime" size="md" />
<AlphanumericBadge char="B" pillar="galileus" size="md" />
```

## Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `char` | `string \| number` | Required | Single alphanumeric character or symbol |
| `pillar` | `'amber' \| 'deming' \| 'ragtime' \| 'galileus' \| 'ockham' \| 'pirsig'` | `'amber'` | Pillar dynamic color accent |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge dimension size |
