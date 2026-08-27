# Privacy Gateway Showdown — Benchmark Suite (ISO-17025 & ALCOA+)

> **Standard Certification :** ISO/IEC 17025:2017  
> **Data Integrity Standard :** ALCOA+ (Attributable, Legible, Contemporaneous, Original, Accurate)  
> **Protocol Reference :** `benchmarks/protocols/privacy_gateway_showdown_protocol.json`

---

## 1. Benchmark Overview

This benchmark suite evaluates four architectures for enterprise AI Privacy Gateways & Data Loss Prevention (DLP):
1. **LiteLLM + Microsoft Presidio** (Python proxy + regex/spaCy NLP hook).
2. **Microsoft Presidio Standalone** (FastAPI service).
3. **GLiNER 2.5** (Zero-Shot Transformer Named Entity Recognition).
4. **Codernic SWG** (Compiled native Rust engine with zero-copy interception and SessionVault state management).

---

## 2. Experimental Controls & Principles

1. **Strict Hardware Quotas**: All solutions are executed under identical cgroup constraints (`limits: 2 vCPU, 4GB RAM`).
2. **Standardized Datasets**: Swiss enterprise records (AVS13 `756.xxxx.xxxx.xx`, Swiss IBAN `CHxx`, Swiss Enterprise IDE/UID `CHE-xxx.xxx.xxx`, confidential salaries, structured documents).
3. **Warmup Protocol**: 3 initial warmup runs per stack to eliminate initialization penalties, followed by 10 measured iterations.
4. **Memory Management**: Sequential ephemeral execution ensures total server RAM usage remains $< 3.5\text{ GB}$.

---

## 3. Execution Guide

### Local Execution
```bash
cd benchmarks/suites/privacy_gateway_showdown
chmod +x run_showdown.sh
./run_showdown.sh
```

---

## 4. Generated Artifacts
- **Markdown Report:** `reports/showdown_report.md`
- **Sealed JSON Report:** `reports/showdown_report.json`
- **Protocol Seal:** `benchmarks/protocols/privacy_gateway_showdown_protocol.json.seal.json`
