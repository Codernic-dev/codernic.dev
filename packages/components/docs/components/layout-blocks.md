# Layout Engine Blocks Architecture

The Layout Engine provides sovereign desktop multi-panel tiling, drag-and-drop widget docking, fluid resizing, accordion panel collapsing, and portal fullscreen overlays across all Codernic IDE viewports.

## Live Interactive IDE Workspace Render

<ReactSpecimen componentName="layout-blocks" />

## Visual Architectural Diagram

<Specimen type="layout-blocks" />

## Architecture & Code Usage

The layout system is driven by `LayoutProvider` and recursive `VBlock` containers holding `WidgetContainer` elements.

```tsx
import { LayoutProvider, VBlock, WidgetContainer } from '@codernic/components';

const layoutState = {
  isEditMode: true,
  rootId: 'workspace-root',
  blocks: {
    'workspace-root': {
      id: 'workspace-root',
      type: 'vblock',
      orientation: 'horizontal',
      childrenIds: ['sidebar', 'editor'],
      ratios: [0.3, 0.7]
    },
    'sidebar': {
      id: 'sidebar',
      type: 'vblock',
      orientation: 'vertical',
      childrenIds: ['widget-file-tree'],
      behavior: 'panel-left'
    },
    'editor': {
      id: 'editor',
      type: 'vblock',
      orientation: 'vertical',
      childrenIds: ['widget-code']
    },
    'widget-file-tree': { id: 'widget-file-tree', type: 'widget', widgetType: 'AST Ray Explorer' },
    'widget-code': { id: 'widget-code', type: 'widget', widgetType: 'Deming CUDA Editor' }
  }
};

export function IdeWorkspace() {
  return (
    <LayoutProvider initialState={layoutState} renderWidget={(b) => <div>{b.widgetType}</div>}>
      <VBlock id="workspace-root" />
    </LayoutProvider>
  );
}
```
