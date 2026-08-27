#!/usr/bin/env bash
# Copyright (c) Tadeop. All rights reserved.
# Proprietary and Confidential Source Code.
# Bundling script for External Third-Party Reproduction (RegData / Lucas & Nicolas)

set -euo pipefail

SUITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SUITE_DIR/../../.." && pwd)"
DIST_DIR="$WORKSPACE_ROOT/dist"
BUNDLE_NAME="codernic_privacy_showdown_k3s.zip"
BUNDLE_PATH="$DIST_DIR/$BUNDLE_NAME"

mkdir -p "$DIST_DIR"

TEMP_STAGE=$(mktemp -d)
trap 'rm -rf "$TEMP_STAGE"' EXIT

STAGE_ROOT="$TEMP_STAGE/privacy_gateway_showdown"
mkdir -p "$STAGE_ROOT"

echo "=========================================================================="
echo "  📦 PACKAGING REPRODUCIBLE K3S BENCHMARK BUNDLE: $BUNDLE_NAME"
echo "=========================================================================="

# Copy Protocol & Seal
mkdir -p "$STAGE_ROOT/protocols"
cp "$WORKSPACE_ROOT/benchmarks/protocols/privacy_gateway_showdown_protocol.json" "$STAGE_ROOT/protocols/"
cp "$WORKSPACE_ROOT/benchmarks/protocols/privacy_gateway_showdown_protocol.json.seal.json" "$STAGE_ROOT/protocols/"

# Copy Suite Files
cp -r "$SUITE_DIR/datasets" "$STAGE_ROOT/"
cp -r "$SUITE_DIR/runners" "$STAGE_ROOT/"
cp -r "$SUITE_DIR/servers" "$STAGE_ROOT/"
cp -r "$SUITE_DIR/k3s" "$STAGE_ROOT/"
cp "$SUITE_DIR/dataset_manifest.json" "$STAGE_ROOT/"
cp "$SUITE_DIR/run_showdown.sh" "$STAGE_ROOT/"

# Create Standalone Reproduction Guide
cat << 'EOF' > "$STAGE_ROOT/README_REPRODUCTION.md"
# 🛡️ Privacy Gateway Showdown — Independent Reproduction Kit

This bundle allows any third-party auditor, partner (e.g., RegData SA), or engineer to independently execute and reproduce the **Privacy Gateway Showdown** benchmark comparing **LiteLLM + Presidio**, **Presidio Standalone**, **GLiNER 2.5**, and **Codernic SWG** in strict compliance with **ISO/IEC 17025:2017** and **ALCOA+**.

## 🚀 Quick Start (1 Command)

```bash
# 1. Unzip the bundle
unzip codernic_privacy_showdown_k3s.zip
cd privacy_gateway_showdown

# 2. Run the full benchmark suite
chmod +x run_showdown.sh
./run_showdown.sh
```

## 📋 Requirements
- Linux (Ubuntu 22.04+, CachyOS, Debian 12+) or macOS
- Python 3.10+ (standard library only)
- K3s / Kubernetes cluster (optional, for pod container execution)

## 📊 Output
- Markdown Report: `reports/showdown_report.md`
- ALCOA+ Sealed JSON: `reports/showdown_report.json`
EOF

# Create Zip Archive using Python standard library (universal compatibility)
python3 -c "
import shutil
shutil.make_archive('$DIST_DIR/codernic_privacy_showdown_k3s', 'zip', '$TEMP_STAGE', 'privacy_gateway_showdown')
"

echo "✅ Successfully generated downloadable bundle:"
echo "   Path: $BUNDLE_PATH"
echo "   Size: $(du -h "$BUNDLE_PATH" | cut -f1)"
echo "   SHA256: $(sha256sum "$BUNDLE_PATH" | cut -d' ' -f1)"
echo "=========================================================================="
