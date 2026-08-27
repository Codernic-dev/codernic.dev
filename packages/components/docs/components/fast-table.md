# FastTable Grid Engine

High-performance virtualized table grid with column sorting, selection cells, and customizable row formatting rules.

## Live React Component Render

<ReactSpecimen componentName="fast-table" />

## Usage

```tsx
import { FastTable } from '@codernic/components/fast-table';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'task', label: 'Agent Task' },
  { key: 'status', label: 'Status' }
];

<FastTable columns={columns} data={rows} />
```
