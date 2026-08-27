# Custom Codernic Business Widget Icons

Dedicated custom SVG icons mapped to Codernic core business engines and `codernic-ui` widgets.

## Live React Component Render

<ReactSpecimen componentName="business-icons" />

## Available Icons

- `DemingGPUHostIcon`: Bare-metal GPU execution core
- `VectorVaultIcon`: Ragtime semantic vector AST ray
- `DAGPipelineLockIcon`: Galileus multi-agent DAG lock
- `LocalQuantizationIcon`: Ockham prompt compressor & model weights
- `DLPScrubberIcon`: Pirsig secret scrubber & DLP firewall
- `AirGapStatusIcon`: Sovereign isolated perimeter status

## Usage

```tsx
import {
  DemingGPUHostIcon,
  VectorVaultIcon,
  DAGPipelineLockIcon,
  DLPScrubberIcon
} from '@codernic/components/icons';

<DemingGPUHostIcon size={24} pillar="deming" />
<VectorVaultIcon size={24} pillar="ragtime" />
<DAGPipelineLockIcon size={24} pillar="galileus" />
<DLPScrubberIcon size={24} pillar="pirsig" />
```
