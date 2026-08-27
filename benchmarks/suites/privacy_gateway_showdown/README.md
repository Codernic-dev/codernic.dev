# 🏆 Privacy Gateway Showdown — Benchmark Suite (ISO-17025 & ALCOA+)

> **Standard Certification :** ISO/IEC 17025:2017  
> **Data Integrity Standard :** ALCOA+ (Attributable, Legible, Contemporaneous, Original, Accurate)  
> **Protocol Reference :** `benchmarks/protocols/privacy_gateway_showdown_protocol.json`

---

## 🎯 Benchmark Overview

This benchmark suite rigorously and impartially evaluates four leading architectures for enterprise AI Privacy Gateways & Data Loss Prevention (DLP):
1. **LiteLLM + Microsoft Presidio** (Python proxy + regex/spaCy NLP hook).
2. **Microsoft Presidio Standalone** (FastAPI service).
3. **GLiNER 2.5** (Zero-Shot Transformer Named Entity Recognition).
4. **Codernic SWG** (Compiled native Rust engine with zero-copy interception and SessionVault state management).

---

## ⚖️ Fair Test & Scientific Principles

1. **Strict Hardware Quotas** : All solutions are executed under identical cgroup constraints (`limits: 2 vCPU, 4GB RAM`).
2. **Identical Swiss Datasets** : Real-world French and German Swiss enterprise records (AVS13 `756.xxxx.xxxx.xx`, Swiss IBAN `CHxx`, Swiss Enterprise IDE/UID `CHE-xxx.xxx.xxx`, confidential salaries, medical data).
3. **Warmup Cycles** : 3 initial warmup runs per stack to eliminate JIT/cache startup penalties, followed by 10 measured iterations.
4. **Zero-Saturation Memory Orchestration** : Sequential ephemeral execution ensures total server RAM usage remains $< 3.5\text{ GB}$.

---

## 🚀 Execution Guide

### 1. Execute Benchmark Locally
```bash
cd /home/tadeop/dev/Codernic-Workspace/codernic-bench-standalone/benchmarks/suites/privacy_gateway_showdown
chmod +x run_showdown.sh package_downloadable_bundle.sh
./run_showdown.sh
```

### 2. Package for External Distribution (RegData SA)
```bash
./package_downloadable_bundle.sh
# Outputs: dist/codernic_privacy_showdown_k3s.zip
```

---

## 📊 Output Artifacts
- **Markdown Report :** `reports/showdown_report.md`
- **Sealed JSON Report :** `reports/showdown_report.json`
- **Protocol Seal :** `benchmarks/protocols/privacy_gateway_showdown_protocol.json.seal.json`
