# Codernic UI — Developer Reference Guide

## 1. Quick Start

```bash
# Install and run
cd apps/codernic-ui
pnpm install
pnpm dev

# Build for production
pnpm build
pnpm preview
```

Access: `http://localhost:5173` (HMR enabled).

---

## 2. File Organization

| Path | Purpose | Examples |
| :--- | :--- | :--- |
| `src/app/` | Application entry points | `App.tsx`, `main.tsx` |
| `src/features/` | Modular feature units | `chat-input/`, `settings/` |
| `src/widgets/` | Composed composite panels | `message-feed/`, `header-bar/` |
| `src/shared/ui/` | Reusable atomic primitives | `Button`, `Input`, `Modal` |
| `src/shared/api/` | Typed API clients | `useFetchMessages()` |
| `src/shared/types/` | Data schemas & contracts | `Message`, `Agent` |
| `src/store/` | Global state management | Redux, Sagas |
| `e2e/` | Verification tests | `*.spec.ts` |

---

## 3. Component Construction Pattern

### File Structure
```
src/features/my-feature/
├── my-feature.tsx          # Component implementation
├── my-feature.types.ts     # TypeScript interfaces
├── my-feature.module.css   # Stylesheet
└── index.ts                # Public module export
```

### Component Implementation
```typescript
// my-feature.tsx
import { Props } from './my-feature.types'

export const MyFeature = function({ title, onClose }: Props) {
  return (
    <div className="my-feature">
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

### Type Definition
```typescript
// my-feature.types.ts
export interface Props {
  title: string;
  onClose: () => void;
  description?: string;
}
```

---

## 4. TypeScript Typing Standards

### Parameter and Return Typing
```typescript
// Recommended: explicit parameter and return typing
export const formatMessage = (msg: Message): string => {
  return `${msg.author}: ${msg.text}`;
};
```

### Discriminated Unions for State Transitions
```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Message[] }
  | { status: 'error'; error: Error };
```

---

## 5. Security Checklist

- Sanitize client input before rendering.
- Validate API response shapes against JSON schemas.
- Enforce HTTPS/WSS communication channels.
- Persist tokens strictly in secure non-local storage.
- Never commit private secrets or credentials.
