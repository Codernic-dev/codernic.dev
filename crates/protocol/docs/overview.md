> [!CAUTION]
> **CONFIDENTIAL & PROPRIETARY - PROPERTY OF TADEOP**
> This document contains internal trade secrets and intellectual property.
> Unauthorized copying, distribution, or reproduction is strictly prohibited under NDA.

# Protocol Crate Overview

[<- Back to Parent Index](../../index.md)

## 1. Introduction (High-level overview)
The **Protocol Crate** is the central nervous system of AI Agencee. It defines all the shared data structures, events, and communication contracts used by every other module in the system. If the frontend (VS Code) wants to talk to the backend engine (Deming), they do it using the structures defined in this crate. 

## 2. Technical Deep-Dive (Logic and Architecture)
- **Exact Responsibilities:** 
  - Defines `CommandRequest` (incoming client requests) and `CommandResponse` (outgoing server responses).
  - Handles configuration structures for inference (Hyperparams, Local Models), DAG Orchestration (`DagConfig`), and Indexing (`IndexingConfig`).
  - Provides the `Transport` trait and `InterprocessStream` abstraction to abstract away OS-level socket differences (TCP/Unix).
- **Key Modules:**
  - [lib.md](lib.md): The core models and transport abstractions.
  - [erathos.md](erathos.md): Structures dedicated to the Erathos schema (Graph representation and JSON schema validation).
  - [license.md](license.md): The cryptographic license tiers and validation payloads.
- **Interactions:** Every major crate (`codernic`, `galileus`, `ragtime`) relies on `protocol` for type-safe message passing across IPC boundaries.
