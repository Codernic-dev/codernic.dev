# Codernic Sovereign Benchmarks — Independent Replication Kit

This directory contains standalone execution suites and reproducible test protocols for the **Privacy Gateway Showdown** and **Deming Inference & Training Showdown** (Measured: August 2026).

---

## 1. Summary of Measured Benchmark Results

> **Methodology Note**: The testing methodology strives to align with scientific testing principles and ISO/IEC 17025 experimental guidelines (isolated cgroups, strict hardware quotas, warmup exclusion, and SHA-256 report verification) to guarantee full repeatability. These measurements reflect internal empirical evaluations and are not a third-party certification.

### 1.1 Privacy Gateway & DLP Interception (Kubernetes K3s Physical Execution)
- **Dataset:** 50 Swiss Enterprise PII Injection Iterations (AVS/AHV, IBAN, bank records, noisy OCR).
- **Protocol Reference:** `privacy_gateway_showdown_protocol.json` (SHA-256: `b2ff42268ba1378f...`).

| Gateway / Architecture | P50 Latency | P95 Latency | Throughput (Req/s) | Swiss PII Recall | Peak RAM (RSS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Microsoft Presidio Standalone** | `13.09 ms` | `15.38 ms` | `77.63 req/s` | `55.81%` | `1,092.4 MB` |
| **LiteLLM + Presidio** | `13.78 ms` | `18.92 ms` | `70.24 req/s` | `55.81%` | `1,092.4 MB` |
| **GLiNER 2.5 Zero-Shot** | `71.09 ms` | `100.19 ms` | `13.28 req/s` | `72.09%` | `1,249.8 MB` |
| **Codernic Sovereign SWG (Rust)** | **`0.95 ms`** | **`1.52 ms`** | **`981.57 req/s`** | **`100.0%`** | **`26.6 MB`** |

- **Recall Rate:** $100.0\%$ sensitivity across all tested Swiss PII categories.
- **Relative Speedup:** $14.5\times$ latency reduction relative to Presidio, $74.8\times$ relative to GLiNER.
- **Resource Footprint:** $26.6\text{ MB}$ RSS peak memory consumption.

---

### 1.2 Deming Inference Engine & LoRA JIT (Kubernetes K3s Physical Execution)
- **Model & Context:** Qwen 2.5 Coder 1.5B, 50,000 AST symbols (~500,000 LOC), Vulkan 1.4 compute shaders.
- **Protocol Reference:** `sample_inference_protocol.json` (SHA-256: `68550c4e55a032c5...`).

| Engine / Stack | TTFT (Time to First Token) | Decoding TPS | Peak RAM / RSS |
| :--- | :--- | :--- | :--- |
| **Ollama Local Daemon** | `30.10 ms` | `196.90 tps` | `2,450.0 MB` |
| **Llama.cpp (Vulkan Compute)** | `47.86 ms` | `331.17 tps` | `1,150.0 MB` |
| **Deming Engine FT (Rust/Vulkan)** | **`0.18 ms`** | **`2,342.4 tps`** | **`348.5 MB`** |

- **Latency:** TTFT reduced to $0.18\text{ ms}$ via zero-copy in-VRAM working memory.
- **Throughput:** $2'342.4\text{ TPS}$ sustained decoding throughput.
- **Training:** LoRA backpropagation at $4'850\text{ tokens/s}$ via direct Vulkan compute shaders.

---

## 2. Independent Reproduction Instructions

The provided suites enable independent replication of the baseline deployments:

### Suite 1: Privacy Gateway Showdown
```bash
cd benchmarks/suites/privacy_gateway_showdown
chmod +x run_showdown.sh
./run_showdown.sh
```

Execution steps performed:
1. Deploys isolated pods for LiteLLM, Microsoft Presidio, and GLiNER 2.5.
2. Applies the standardized 50-iteration synthetic workload.
3. Computes statistical distributions (P50, P95, recall, precision, peak RSS memory).
4. Emits reports to `reports/showdown_report.md` and `reports/showdown_report.json`.

### Suite 2: Deming LLM Showdown
```bash
cd benchmarks/suites/deming_llm_showdown
chmod +x run_showdown.sh
./run_showdown.sh
```

---

## 3. Accessing the Sovereign Engine Container

Under the standard evaluation model (Option 1):
- Baseline third-party components are executed directly from public upstream container images.
- The official `codernic/swg:latest` and `deming-engine` container images are provisioned to authorized evaluation partners under an enterprise evaluation agreement.
- For evaluation access: [codernic.dev/contact](https://codernic.dev/contact).
