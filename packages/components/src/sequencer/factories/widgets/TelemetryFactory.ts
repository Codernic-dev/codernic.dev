// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export class TelemetryFactory {
  static createDispatchActions() {
    return [
      {
        type: 'telemetry/updateHeartbeat',
        payload: 'ok'
      },
      {
        type: 'telemetry/updateDiagnostic',
        payload: {
          hardware: { vramUsedGb: 8.5, memoryLockLimit: '64G', totalRamGb: 64, cpuCores: 16, hasCuda: true, hasRocm: false, hasMetal: false },
          backend: { ragInitialized: true, indexedChunksCount: 15420, activeMcpBridges: ['chrome-devtools-mcp', 'github-mcp'] },
          frontend: { activeWatchers: 3 },
          proxy: { enabled: true, activeConnections: 12, blockedRequests: 3, anonymizedTokens: 450, bypassedRequests: 0 }
        }
      }
    ];
  }
}
