> [!CAUTION]
> **CONFIDENTIAL & PROPRIETARY - PROPERTY OF TADEOP**
> This document contains internal trade secrets and intellectual property.
> Unauthorized copying, distribution, or reproduction is strictly prohibited under NDA.

# Erathos Graph Schema (erathos.rs)

[<- Back to Parent Index](../../index.md) | [Go to Overview](overview.md)

## 1. Introduction (High-level overview)
This file defines how AI Agencee represents architectural or logical concepts as a Graph. It allows the system to build nodes (entities) and connect them (links). It also ensures that every node respects a strict JSON schema before being processed.

## 2. Technical Deep-Dive (Logic and Architecture)
- **Exact Responsibilities:**
  - Defines the core graph structures: `ErathosEntity` (nodes) and `ErathosLink` (edges).
  - Handles the status tracking of entities (`Planned`, `InProgress`, `Done`).
  - Provides strict schema enforcement via the `validate()` method.
- **Core Data Structures & Algorithms:**
  - `ErathosSchemaContract`: The main container holding a vector of entities and links.
  - `validate()`: Iterates over all entities and uses the `jsonschema` crate to dynamically compile and validate the entity's `properties` payload against its `template_id`. If an entity fails validation, it immediately throws a structural error.
- **Interactions:** Referenced heavily by [lib.md](lib.md) when defining session updates that involve schema changes (`UpdateSessionSchema`), guaranteeing that malformed graphs never reach the core execution engine.
