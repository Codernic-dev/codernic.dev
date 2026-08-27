> [!CAUTION]
> **CONFIDENTIAL & PROPRIETARY - PROPERTY OF TADEOP**
> This document contains internal trade secrets and intellectual property.
> Unauthorized copying, distribution, or reproduction is strictly prohibited under NDA.

# Cryptographic Licensing (license.rs)

[<- Back to Parent Index](../../index.md) | [Go to Overview](overview.md)

## 1. Introduction (High-level overview)
This file holds the definitions for Codernic's licensing system. It dictates the different tiers of users (Free vs Pro) and defines the exact structure of the cryptographic payload that proves a user has a valid license.

## 2. Technical Deep-Dive (Logic and Architecture)
- **Exact Responsibilities:**
  - Enums the available `LicenseTier`s in the application.
  - Defines the `LicensePayload` which contains the tier, user email, and expiration date.
  - Defines `LicenseError` variants to handle cryptographic verification failures (Expired, Invalid Signature, Decode Error).
- **Core Data Structures:** `LicenseTier`, `LicensePayload`, `LicenseError`.
- **Interactions:** This payload is attached to client requests defined in [lib.md](lib.md). Note that the actual *verification logic* (RSA/ECDSA checks) is not implemented here; this file only provides the structural contract for the protocol to transmit license states securely.
