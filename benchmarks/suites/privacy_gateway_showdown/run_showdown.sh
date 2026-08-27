#!/usr/bin/env bash
# Copyright (c) Tadeop. All rights reserved.
# Proprietary and Confidential Source Code.
# Pure Physical ISO-17025 / ALCOA+ Master Orchestrator (Zero-Simulation, Zero-Stubs)

set -euo pipefail

SUITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SUITE_DIR/../../.." && pwd)"
SERVERS_DIR="$SUITE_DIR/servers"
RUNNERS_DIR="$SUITE_DIR/runners"
MANIFEST_FILE="$SUITE_DIR/dataset_manifest.json"
PROTOCOL_FILE="$WORKSPACE_ROOT/benchmarks/protocols/privacy_gateway_showdown_protocol.json"
SEAL_FILE="${PROTOCOL_FILE}.seal.json"

VENV_PYTHON="$WORKSPACE_ROOT/.venv/bin/python"
if [ ! -f "$VENV_PYTHON" ]; then
    VENV_PYTHON="python3"
fi

SWG_BIN="$WORKSPACE_ROOT/target/release/codernic-swg-bench-server"

echo "=========================================================================="
echo "  🏆 PRIVACY GATEWAY SHOWDOWN BENCHMARK (PURE PHYSICAL ZERO-STUB EXECUTION)"
echo "=========================================================================="
echo "Suite directory: $SUITE_DIR"
echo "Python Runtime:  $($VENV_PYTHON --version)"
echo "Protocol:        $PROTOCOL_FILE"

# 1. Cryptographic Protocol & Dataset Verification
echo ""
echo "[Phase 1/4] Verifying Protocol & Dataset Cryptographic Signatures..."

if [ ! -f "$PROTOCOL_FILE" ] || [ ! -f "$SEAL_FILE" ]; then
    echo "❌ FATAL: Protocol or seal file missing!"
    exit 1
fi

SEALED_HASH=$(python3 -c "import json; print(json.load(open('$SEAL_FILE'))['sha256_digest'])")
ACTUAL_HASH=$(python3 -c "import hashlib; print(hashlib.sha256(open('$PROTOCOL_FILE', 'rb').read()).hexdigest())")

if [ "$SEALED_HASH" != "$ACTUAL_HASH" ]; then
    echo "❌ PROTOCOL INTEGRITY VIOLATION! Expected $SEALED_HASH, got $ACTUAL_HASH"
    exit 1
fi
echo "  ✅ Protocol Sealed Integrity: OK ($ACTUAL_HASH)"

# Verify Datasets against manifest
python3 -c "
import json, os, hashlib
manifest = json.load(open('$MANIFEST_FILE'))
for item in manifest['datasets']:
    full_path = os.path.join('$SUITE_DIR', item['path'])
    if not os.path.exists(full_path):
        raise FileNotFoundError(f'Missing dataset: {full_path}')
    sha = hashlib.sha256(open(full_path, 'rb').read()).hexdigest()
    if sha != item['sha256']:
        raise ValueError(f'Dataset hash mismatch on {item[\"path\"]}')
print('  ✅ Dataset SHA-256 Manifest: 100% Verified')
"

# 2. Build Native SWG Server if needed
if [ ! -f "$SWG_BIN" ]; then
    echo ""
    echo "[Phase 2/4] Compiling Native Codernic SWG Engine..."
    cargo build --release -p codernic-swg-bench-server --manifest-path "$WORKSPACE_ROOT/Cargo.toml"
else
    echo ""
    echo "[Phase 2/4] Native Codernic SWG Engine already compiled: $SWG_BIN"
fi

# 3. Sequential Ephemeral Execution
echo ""
echo "[Phase 3/4] Executing Sequential Physical Benchmarks (Zero-Saturation Rule)..."
REPORTS_DIR="$SUITE_DIR/reports"
mkdir -p "$REPORTS_DIR"
RAW_RESULTS_FILE="$REPORTS_DIR/raw_execution_results.jsonl"
rm -f "$RAW_RESULTS_FILE"

# --- STACK 1: LiteLLM + Presidio ---
echo "--------------------------------------------------------------------------"
echo "  ▶ [1/4] Starting Server: LiteLLM + Microsoft Presidio (Port 4000)..."
$VENV_PYTHON "$SERVERS_DIR/server_litellm_presidio.py" &
SERVER_PID=$!

# Wait for server readiness
READY=0
for i in {1..60}; do
    if curl -s http://127.0.0.1:4000/health/readiness > /dev/null 2>&1; then
        echo "    Server Ready (PID: $SERVER_PID)"
        READY=1
        break
    fi
    sleep 0.2
done
if [ $READY -eq 0 ]; then
    echo "❌ FATAL: LiteLLM + Presidio server failed to start on port 4000"
    kill -9 "$SERVER_PID" 2>/dev/null || true
    exit 1
fi

echo "    Running Physical Client Measurements..."
SERVER_PID=$SERVER_PID $VENV_PYTHON "$RUNNERS_DIR/run_litellm_presidio_bench.py" | tee -a "$RAW_RESULTS_FILE"

echo "    Stopping Server (PID: $SERVER_PID)..."
kill -9 "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
sleep 0.5

# --- STACK 2: Presidio Standalone ---
echo "--------------------------------------------------------------------------"
echo "  ▶ [2/4] Starting Server: Microsoft Presidio Standalone (Port 5001)..."
$VENV_PYTHON "$SERVERS_DIR/server_presidio_standalone.py" &
SERVER_PID=$!

READY=0
for i in {1..60}; do
    if curl -s http://127.0.0.1:5001/healthz > /dev/null 2>&1; then
        echo "    Server Ready (PID: $SERVER_PID)"
        READY=1
        break
    fi
    sleep 0.2
done
if [ $READY -eq 0 ]; then
    echo "❌ FATAL: Presidio Standalone server failed to start on port 5001"
    kill -9 "$SERVER_PID" 2>/dev/null || true
    exit 1
fi

echo "    Running Physical Client Measurements..."
SERVER_PID=$SERVER_PID $VENV_PYTHON "$RUNNERS_DIR/run_presidio_standalone_bench.py" | tee -a "$RAW_RESULTS_FILE"

echo "    Stopping Server (PID: $SERVER_PID)..."
kill -9 "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
sleep 0.5

# --- STACK 3: GLiNER 2.5 ---
echo "--------------------------------------------------------------------------"
echo "  ▶ [3/4] Starting Server: GLiNER 2.5 Zero-Shot NER (Port 5002)..."
$VENV_PYTHON "$SERVERS_DIR/server_gliner.py" &
SERVER_PID=$!

READY=0
for i in {1..60}; do
    if curl -s http://127.0.0.1:5002/health > /dev/null 2>&1; then
        echo "    Server Ready (PID: $SERVER_PID)"
        READY=1
        break
    fi
    sleep 0.2
done
if [ $READY -eq 0 ]; then
    echo "❌ FATAL: GLiNER server failed to start on port 5002"
    kill -9 "$SERVER_PID" 2>/dev/null || true
    exit 1
fi

echo "    Running Physical Client Measurements..."
SERVER_PID=$SERVER_PID $VENV_PYTHON "$RUNNERS_DIR/run_gliner_bench.py" | tee -a "$RAW_RESULTS_FILE"

echo "    Stopping Server (PID: $SERVER_PID)..."
kill -9 "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
sleep 0.5

# --- STACK 4: Codernic SWG (Native Rust Engine) ---
echo "--------------------------------------------------------------------------"
echo "  ▶ [4/4] Starting Server: Codernic SWG Native Rust Engine (Port 8080)..."
"$SWG_BIN" &
SERVER_PID=$!

READY=0
for i in {1..60}; do
    if curl -s http://127.0.0.1:8080/healthz > /dev/null 2>&1; then
        echo "    Server Ready (PID: $SERVER_PID)"
        READY=1
        break
    fi
    sleep 0.2
done
if [ $READY -eq 0 ]; then
    echo "❌ FATAL: Codernic SWG server failed to start on port 8080"
    kill -9 "$SERVER_PID" 2>/dev/null || true
    exit 1
fi

echo "    Running Physical Client Measurements..."
SERVER_PID=$SERVER_PID $VENV_PYTHON "$RUNNERS_DIR/run_codernic_swg_bench.py" | tee -a "$RAW_RESULTS_FILE"

echo "    Stopping Server (PID: $SERVER_PID)..."
kill -9 "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
sleep 0.5

# 4. Evaluation & ALCOA+ Reporting
echo ""
echo "[Phase 4/4] Aggregating Metrics & Generating Sealed Report..."
$VENV_PYTHON "$RUNNERS_DIR/evaluate_showdown_metrics.py"

echo "=========================================================================="
echo "  ✅ PHYSICAL SHOWDOWN BENCHMARK COMPLETED — ZERO STUBS, 100% REAL HARDWARE"
echo "=========================================================================="
