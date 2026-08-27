> [!CAUTION]
> **CONFIDENTIAL & PROPRIETARY - PROPERTY OF TADEOP**
> This document contains internal trade secrets and intellectual property.
> Unauthorized copying, distribution, or reproduction is strictly prohibited under NDA.

# Protocol Core (lib.rs)

[<- Back to Parent Index](../../index.md) | [Go to Overview](overview.md)

## 1. Introduction (High-level overview)
This file contains the vast majority of the communication payload definitions for AI Agencee. When the system asks an LLM to generate code, or when the DAG orchestrator signals that a task is finished, those messages are built using the types defined here. It also contains the networking code that allows the UI to speak to the local engine.

## 2. Technical Deep-Dive (Logic and Architecture)
- **Exact Responsibilities:**
  - **Inference & Models:** Defines `LocalModelDefinition` (paths, formats, GPU layers) and `InferenceHyperparams` (temperature, max tokens).
  - **Commands:** Enums for `CommandRequest` (e.g., `ExecuteAsk`, `StartIndexing`) and `CommandResponse` (e.g., `InferenceEvent`, `DagExecutionEvent`).
  - **Transport Layer:** Provides `InterprocessStream` and `InterprocessListener` wrapping `tokio::net::TcpStream` and `UnixStream` with a common `Transport` trait implementing async Read/Write.
  - **Telemetry:** Enums for tracing system health, lock acquisitions, and API routing compression stats (`TelemetryEvent`, `CoreHealthPayload`).
- **Core Data Structures:** `CommandRequest`, `CommandResponse`, `Transport` trait.
- **Interactions:** Acts as the base serialization layer (via Serde) for `codernic-ui` communicating with the Rust daemon. Relies on [erathos.md](erathos.md) and [license.md](license.md) for specialized payloads.
