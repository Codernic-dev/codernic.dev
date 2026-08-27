// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

//! # AI Agencee Protocol Crate
//!
//! The **Protocol Crate** defines the core data structures and communication interfaces for the AI Agencee system.

pub mod api;
pub mod commands;
pub mod dag;
pub mod erathos;
pub mod license;
pub mod models;
pub mod transport;

// FFI VTable modules — used by codernic-bench-standalone engine_loader for hot-loading
pub mod deming;
pub mod ragtime;
pub mod ockham;
pub mod hw_probe;
pub mod galileus_api;

pub use api::*;
pub use commands::*;
pub use dag::*;
pub use models::*;
pub use transport::*;
