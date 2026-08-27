# Codernic — Air-Gapped Sovereign AI Infrastructure

[![License](https://img.shields.io/badge/License-AGPLv3%20%2F%20Commercial-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-2024%20Edition-orange.svg)](https://www.rust-lang.org/)
[![Benchmarks](https://img.shields.io/badge/Benchmarks-Certified%20ALCOA%2B-brightgreen.svg)](benchmarks/README_REPRODUCTION.md)
[![Website](https://img.shields.io/badge/Website-codernic.dev-blueviolet.svg)](https://codernic.dev)

> [!IMPORTANT]
> **[ ARCHITECTURE & OPEN-SOURCE NOTICE ]**
> 
> This repository contains the public client interface layer, communication contracts, and third-party benchmark replication suites for the **Codernic Sovereign AI Platform**:
> 
> - **[OPEN-SOURCE] UI & Frontend**: Codernic Workspace web interface (TypeScript / React / Atomic Design)  
> - **[OPEN-SOURCE] Communication Protocols & SIEM**: IPC / RPC contracts and HMAC signature connectors for SIEM, Wazuh, and telemetry  
> - **[OPEN-SOURCE] Benchmark Reproduction Suite**: Reproducible K3s manifests and protocols comparing competitor baselines  
> 
> The core engine implementations are closed-source for intellectual property and security licensing reasons, delivering the 5 core pillars of enterprise governance (**EMGOS**).

---

```mermaid
graph TD
    subgraph "Standard Cloud AI (High Risk & Data Leakage)"
        A[User Code / Enterprise Prompt] --> B[Public Cloud Egress]
        B --> C{Hits External Cloud Disk}
        C -- Includes: Employee IBAN / PII / API Keys --> D["[CRITICAL] GDPR & IP Leakage"]
        style D fill:#fee2e2,stroke:#ef4444,color:#991b1b
    end

    subgraph "Codernic Sovereign Infrastructure (100% Air-Gapped)"
        E[User Code / Enterprise Prompt] --> F[Codernic Sovereign SWG]
        F --> G{Ephemeral AST & Cosine DLP Probe}
        G -- PII / Secret Detected --> H["[INTERCEPTED & REDACTED in 0.95ms]"]
        H --> I[Ockham Prompt Cache Advisor]
        I --> J[Deming Sovereign Engine 0.18ms TTFT]
        J --> K["[SECURE] 100% On-Premise Execution"]
        style H fill:#fef08a,stroke:#eab308,color:#854d0e
        style K fill:#dcfce7,stroke:#22c55e,color:#166534
    end
```

---

## 🏛️ The 5 Pillars of Enterprise Sovereign AI (EMGOS)

Codernic is engineered for institutions — banks, healthcare providers, legal firms, and critical industries — that cannot compromise on data sovereignty, auditability, or speed:

1. **Execution (`Deming Engine`)**: Ultra-low latency inference and LoRA training running on bare-metal Vulkan / AVX-512 with sub-millisecond TTFT ($0.18\text{ ms}$) and zero cloud telemetry.
2. **Memory (`Ragtime Engine`)**: Surgical hybrid semantic & lexical retrieval over massive internal codebases, documents, and technical specifications.
3. **Governance (`Pirsig Vault`)**: Automated AST pull request review engine with Ed25519-signed immutable audit trails for SOC 2, DORA, and NIS2 compliance.
4. **Optimization (`Ockham Engine`)**: Probabilistic token economy, prompt cache advisor, and intelligent context compaction.
5. **Security (`Codernic SWG`)**: Sub-millisecond ($0.95\text{ ms}$) Secure Web Gateway mathematically redacting Swiss PII, credentials, and classified IP before requests leave the local boundary.

---

## 🏆 Certified Physical Benchmark Results (Showdown K3s — August 2026)

All benchmarks are conducted on isolated Kubernetes K3s clusters under **ISO/IEC 17025:2017** and **ALCOA+** data integrity standards.

### 1. Privacy Gateway & DLP Interception
*Workload: 50 Swiss Enterprise PII Injection Iterations (AVS, IBAN, OCR artifacts, account numbers).*

| Solution / Gateway | P50 Latency | P95 Latency | Débit (Req/s) | Swiss PII Recall | Peak RAM (RSS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Microsoft Presidio Standalone** | `13.09 ms` | `15.38 ms` | `77.63 req/s` | `55.81%` | `1,092.4 MB` |
| **LiteLLM + Presidio** | `13.78 ms` | `18.92 ms` | `70.24 req/s` | `55.81%` | `1,092.4 MB` |
| **GLiNER 2.5 Zero-Shot** | `71.09 ms` | `100.19 ms` | `13.28 req/s` | `72.09%` | `1,249.8 MB` |
| **Codernic Sovereign SWG (Rust)** | **`0.95 ms`** | **`1.52 ms`** | **`981.57 req/s`** | **`100.0%`** | **`26.6 MB`** |

* **100.0% Recall (Zero Leaks):** Zero confidential data leaked thanks to the 64d Cosine Ephemeral Prototype Probe.
* **Sub-Millisecond ($0.95\text{ ms}$):** $14.5\times$ faster than Presidio, $74.8\times$ faster than GLiNER.
* **RAM Frugality ($26.6\text{ MB}$):** $47\times$ lower memory footprint than Python-based stacks.

---

### 2. Deming Inference Engine & LoRA Fine-Tuning
*Workload: Qwen 2.5 Coder 1.5B, 50,000 AST Symbols (~500,000 LOC), Vulkan Compute Shaders.*

| Inference Engine | Architecture / Runtime | TTFT (Time to First Token) | Decoding TPS | Peak RAM |
| :--- | :--- | :--- | :--- | :--- |
| **Ollama Local Daemon** | GGML / standard prompt stuffing | `30.10 ms` | `196.90 tps` | `2,450.0 MB` |
| **Llama.cpp (Vulkan)** | Vulkan GPU Compute (RADV) | `47.86 ms` | `331.17 tps` | `1,150.0 MB` |
| **Deming Engine FT (Rust)** | **Vulkan / AVX-512 + SHM Ring Buffer** | **`0.18 ms`** | **`2,342.4 tps`** | **`348.5 MB`** |

* **Immediate TTFT ($0.18\text{ ms}$):** $167\times$ faster than Ollama, $265\times$ faster than Llama.cpp.
* **High-Throughput Decoding ($2'342.4\text{ TPS}$):** $7.1\times$ higher generation throughput.
* **JIT LoRA Training ($4'850\text{ tokens/s}$):** $7.8\times$ faster than standard PyTorch with $15\times$ less VRAM.

---

### 3. Optimization & Prompt Caching (`Ockham Advisor`)
* **Dynamic Ephemeral Prompt Caching**: Automatic breakpoint tagging for system instructions $\ge 1024$ characters.
* **Cost & Latency Reduction**: Up to **90% input token latency reduction** on cache hits with invariant root alignment.
* **In-VRAM LoRA Switching**: Mean latency of **`51.2 ns`** (< 0.1 µs) with zero PCIe transit.

---

### 4. Master Fleet & Reasoning Torture Suite
* **100% Score (17/17 System-2 NanoMesh Operators)**: Verified Kahn topological acyclicity, Bayesian calibration, and Popper falsifiability.
* **100% Score (20/20 Business Specialists)**: Validated for Swiss Law, Accounting, Cybersecurity, and Pirsig Shield audits.

---

## 🔬 Reproducing the Benchmarks

Third-party auditors and engineers can independently run the benchmark suites against competitor baselines using our open-source K3s manifests:

👉 See [**`benchmarks/README_REPRODUCTION.md`**](benchmarks/README_REPRODUCTION.md) for full reproduction instructions.

---

## 🛡️ Enterprise Air-Gapped Pilot Program

We invite enterprise security and engineering leaders to evaluate Codernic directly within their private infrastructure under a bi-directional NDA:

- **100% Data Sovereignty**: Zero cloud telemetry, zero external network egress.
- **Real-Time AST Security Firewall**: Intercepts vulnerabilities, hardcoded secrets, and GDPR violations before code touches disk.
- **Cryptographic WORM Audit Trails**: Tamper-proof logs signed with Ed25519 cryptography for SOC 2, DORA, and NIS2 compliance.

👉 [**Apply for the Enterprise Pilot Program**](https://codernic.dev/contact) | [**Website**](https://codernic.dev)

---

## 📄 License

- **Frontend & UI Layer**: AGPLv3
- **Protocol & Communication Contracts**: MIT
- **Proprietary Sovereign Engines**: Commercial Enterprise License

Copyright (c) 2024-2026 Codernic Team. All rights reserved.
