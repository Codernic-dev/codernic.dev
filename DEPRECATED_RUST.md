# Legacy Rust Deprecation Notice — `codernic.dev`

> **Status:** `DEPRECATED` (Legacy Freeze — Backward Compatibility Only)  
> **Canonical Implementation:** [`helonium/`](./helonium/) (Helonium v2.0 Clean Architecture + Oracles)

All new domain logic, capabilities, contracts (`requires`/`ensures`), and sovereign verification live exclusively in **`./helonium/`**.

```sh
cd helonium && helo check --json && helo oracle --json && helo test --all
```
