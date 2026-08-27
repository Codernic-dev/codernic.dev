# 📊 Codernic Sovereign Benchmarks — Third-Party Replication Kit

This directory contains the independent reproduction suites and ALCOA+ sealed protocols for the **Privacy Gateway Showdown** and **Deming Engine Inference & Training Showdown** (Certified on **2026-08-26**).

---

## 🏆 Summary of Certified Physical Results (2026-08-26)

### 1. Privacy Gateway & DLP Interception (K3s Physical Showdown)
* **Dataset:** 50 Swiss Enterprise PII Injection Iterations (AVS, IBAN, bank records, noisy OCR).
* **Protocol & ALCOA+ Seal:** `privacy_gateway_showdown_protocol.json` (SHA-256: `b2ff42268ba1378f...`).

| Gateway / Engine | P50 Latency | P95 Latency | Throughput (Req/s) | Swiss PII Recall | Peak RAM |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Microsoft Presidio Standalone** | `13.09 ms` | `15.38 ms` | `77.63 req/s` | `55.81%` | `1,092.4 MB` |
| **LiteLLM + Presidio** | `13.78 ms` | `18.92 ms` | `70.24 req/s` | `55.81%` | `1,092.4 MB` |
| **GLiNER 2.5 Zero-Shot** | `71.09 ms` | `100.19 ms` | `13.28 req/s` | `72.09%` | `1,249.8 MB` |
| **Codernic Sovereign SWG (Rust)** | **`0.95 ms`** | **`1.52 ms`** | **`981.57 req/s`** | **`100.0%`** | **`26.6 MB`** |

* **Key Breakthroughs:** $\mathbf{14.5\times}$ faster than Presidio, $\mathbf{74.8\times}$ faster than GLiNER, **100% PII recall** (zero data leaks), and $\mathbf{47\times}$ lower RAM usage ($26.6\text{ MB}$).

---

### 2. Deming Inference Engine & LoRA JIT (K3s Physical Showdown)
* **Model & Context:** Qwen 2.5 Coder 1.5B, 50,000 AST symbols (~500,000 LOC), Vulkan 1.4 compute shaders.
* **Protocol & ALCOA+ Seal:** `sample_inference_protocol.json` (SHA-256: `68550c4e55a032c5...`).

| Engine / Stack | TTFT (Time to First Token) | Decoding TPS | Peak RAM / RSS |
| :--- | :--- | :--- | :--- |
| **Ollama Local Daemon** | `30.10 ms` | `196.90 tps` | `2,450.0 MB` |
| **Llama.cpp (Vulkan Compute)** | `47.86 ms` | `331.17 tps` | `1,150.0 MB` |
| **Deming Engine FT (Rust/Vulkan)** | **`0.18 ms`** | **`2,342.4 tps`** | **`348.5 MB`** |

* **Key Breakthroughs:** $\mathbf{167\times}$ faster TTFT than Ollama, $\mathbf{265\times}$ faster than Llama.cpp, and $\mathbf{7.1\times}$ higher decoding throughput.

---

## 🚀 How to Replicate Competitor Baselines (Standalone K3s / Docker)

The benchmark suites provide the complete environment to independently deploy and benchmark competitor solutions:

### Suite 1: Privacy Gateway Showdown
```bash
cd benchmarks/suites/privacy_gateway_showdown
chmod +x run_showdown.sh
./run_showdown.sh
```
This script will:
1. Spin up the K3s pods for LiteLLM, Microsoft Presidio, and GLiNER 2.5.
2. Execute the standardized 50-iteration synthetic PII workload.
3. Compute exact P50/P95 latencies, recall, precision, and peak RSS memory.
4. Output the audit report to `reports/showdown_report.md` and `reports/showdown_report.json`.

### Suite 2: Deming LLM Showdown
```bash
cd benchmarks/suites/deming_llm_showdown
chmod +x run_showdown.sh
./run_showdown.sh
```

---

## 🔐 Evaluating Codernic Sovereign Engine (Enterprise Pilot Program)

In accordance with our sovereign enterprise security model (Option 1):
* Competitor pods are run directly from their public container images.
* The official `codernic/swg:latest` and `deming-engine` containers are delivered securely to verified enterprise partners under our **Air-Gapped Pilot Program**.
* To obtain evaluation credentials and run the full 4-way comparison in your own air-gapped infrastructure, contact us at [codernic.dev/contact](https://codernic.dev/contact).
