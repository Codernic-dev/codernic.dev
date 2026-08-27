# ISO/IEC 17025 Benchmark Suite: Deming Engine & Training Physical Showdown

> **Suite ID**: `benchmarks/suites/deming_llm_showdown`  
> **Compliance Standards**: ISO/IEC 17025:2017 | ISO/IEC/IEEE 29119-3 | ALCOA+ Data Integrity | MLCommons MLPerf  
> **System Under Test (SUT)**: Deming Engine v0.6 (Fusion Tensor FT), Codernic LoRA Trainer, Ollama, Llama.cpp, vLLM, PyTorch  

---

## 1. Specification & Protocol Summary

This benchmark evaluates physical bare-metal LLM inference and fine-tuning throughput, latency, and memory footprint across execution targets:

### In-Scope Evaluations:
1. **Inference Benchmarking**:
   - **Deming Engine (FT)**: 512t Working Memory with Zero-Copy SHM Epistemic Tree Streaming & Paged KV-Cache.
   - **Ollama**: Local daemon inference over standard REST API (`http://127.0.0.1:11434/api/generate`).
   - **Llama.cpp**: `llama-bench` / `llama-server` execution on local GGUF weights.
   - **vLLM (ROCm/CUDA)**: PagedAttention server execution if available.
2. **Training & LoRA Fine-Tuning Benchmarking**:
   - **Deming LoRA Trainer**: Vulkan Backprop, Streaming QLoRA, PiSSA init, and JIT dynamic adapter adaptation.
   - **Standard PyTorch Baseline**: Standard backward pass step time and VRAM footprint.

### Mandatory Directives:
- **Zero Simulation / Verification**: If a target engine or runtime is missing, it is explicitly logged as `"status": "SKIPPED (NOT_INSTALLED)"`.
- **Sequential Execution**: Engines run strictly one at a time to prevent core and memory bus contention.
- **Warmup Exclusion**: The first 3 iterations are excluded from average latency and throughput calculations.
- **ALCOA+ Cryptographic Seal**: Final Markdown and JSON reports are cryptographically hashed using SHA-256 and recorded in the audit ledger.
