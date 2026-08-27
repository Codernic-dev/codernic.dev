> [!CAUTION]
> **CONFIDENTIAL & PROPRIETARY - PROPERTY OF TADEOP**
> This document contains internal trade secrets and intellectual property.
> Unauthorized copying, distribution, or reproduction is strictly prohibited under NDA.

# lib.rs

[<- Back to Parent Index](../index.md) | [Go to Overview](overview.md)

## 1. Introduction (High-level overview)
This file serves as the core of the `pirsig-protocol` crate, establishing the primary data structures and cryptographic functions used for secure health check verification in the Pirsig Module.

## 2. Technical Deep-Dive (Logic and Architecture)
The module exposes two main structs:
- `HealthRequest`: Represents an incoming health probe payload containing a random `nonce`.
- `HealthResponse`: Contains a cryptographic `sig` (signature) and the software `version`.

For cryptographic validation, it uses `ring::hmac` and `hex` to provide two main routines:
- `compute_sig(secret: &str, nonce: &str) -> String`: Generates an HMAC-SHA256 signature using the shared secret and the provided nonce, returning it as a hex-encoded string.
- `verify_sig(secret: &str, nonce: &str, sig: &str) -> bool`: Decodes a hex-encoded signature and verifies it against the expected HMAC-SHA256 hash using the provided secret and nonce.
