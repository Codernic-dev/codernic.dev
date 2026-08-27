# Sequencer Launcher Widget

Interactive onboarding sequence controller for guiding users through architectural features and DAG workflows.

## Live React Component Render

<ReactSpecimen componentName="sequencer" />

## Usage

```tsx
import { SequencerLauncherWidget } from '@codernic/components/sequencer';

<SequencerLauncherWidget
  sequences={[architectureTourConfig, modelHubTourConfig]}
  onDismiss={() => console.log('Dismissed')}
/>
```
