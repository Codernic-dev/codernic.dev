# EmptyState Molecule Component

Placeholder surface displayed when lists, telemetry feeds, or workspace panels are empty.

## Live React Component Render

<ReactSpecimen componentName="empty-state" />

## Usage

```tsx
import { EmptyState } from '@codernic/components/molecules';

<EmptyState
  title="No Active Introspection Traces"
  description="Execute a workflow DAG or submit a prompt to record telemetry events."
  action={<Button variant="primary">Start New Execution</Button>}
/>
```
