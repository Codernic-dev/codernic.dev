# AgnosticDropdown Component

Standardized dropdown menu control for selecting model profiles, session configurations, and route profiles.

## Live React Component Render

<ReactSpecimen componentName="agnostic-dropdown" />

## Usage

```tsx
import { AgnosticDropdown } from '@codernic/components/molecules';

<AgnosticDropdown
  options={[
    { label: 'GitHub Copilot', value: 'copilot-gpt4o' },
    { label: 'Local Ollama', value: 'ollama-llama3' }
  ]}
  value="copilot-gpt4o"
  onChange={(val) => console.log(val)}
/>
```
