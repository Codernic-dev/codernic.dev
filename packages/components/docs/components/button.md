# Button Atom Component

The `Button` atom provides standardized interactive targets with variant styles and hover micro-animations across all Codernic applications.

## Live React Component Render

<ReactSpecimen componentName="button" />

## Visual Specimen Preview

<Specimen type="button" />


## Usage

```tsx
import { Button } from '@codernic/components/atoms';

// Primary Action
<Button variant="primary" onClick={() => console.log('Action')}>
  Primary Button
</Button>

// Secondary Action
<Button variant="secondary">Secondary Button</Button>

// Danger Action
<Button variant="danger">Danger Action</Button>

// Ghost Action
<Button variant="ghost">Ghost Button</Button>
```

## Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Target size dimension |
| `disabled` | `boolean` | `false` | Disables user interaction |
| `onClick` | `(e: React.MouseEvent) => void` | `undefined` | Click event handler |
