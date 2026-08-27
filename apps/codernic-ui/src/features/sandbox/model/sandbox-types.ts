// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export type SandboxPillarId = 'execution' | 'memory' | 'governance' | 'optimization' | 'security';

export type SecurityMode = 'single' | 'batch';

export interface SampleDocumentEntry {
  filename: string;
  category: 'pptx' | 'pdf' | 'xlsx' | 'docx' | 'eml' | 'md';
  sizeBytes: number;
  description: string;
}

export interface DetectedEntity {
  id: string;
  category: 'PII_NAME' | 'PII_EMAIL' | 'IBAN' | 'SECRET_KEY' | 'CONFIDENTIAL_FINANCIAL' | 'HEALTH_DATA';
  label: string;
  originalValue: string;
  maskedValue: string;
  confidence: number;
}

export interface SlotDiffItem {
  slotId: number;
  originalText: string;
  sanitizedText: string;
  modified: boolean;
  detectedEntities: DetectedEntity[];
}

export interface BatchFileItem {
  id: string;
  name: string;
  path: string;
  sizeBytes: number;
  extension: string;
  threatLevel: 'CLEAN' | 'LOW' | 'MEDIUM' | 'CRITICAL';
  piiCount: number;
  secretsCount: number;
  watermarked: boolean;
  diffs: SlotDiffItem[];
  status: 'PENDING' | 'SCANNING' | 'SANITIZED' | 'ERROR';
}

export interface SecurityProcessingResult {
  filename: string;
  role: string;
  sensitivity: string;
  totalSlots: number;
  modifiedSlotsCount: number;
  watermarkInjected: boolean;
  watermarkUser: string;
  watermarkTx: string;
  merkleAuditRoot: string;
  latencyUs: number;
  originalSha256: string;
  sanitizedSha256: string;
  diffs: SlotDiffItem[];
}

export interface SandboxState {
  activePillar: SandboxPillarId;
  securityMode: SecurityMode;
  availableSamples: SampleDocumentEntry[];
  selectedSample: string;
  isProcessing: boolean;
  processingResult: SecurityProcessingResult | null;
  batchFiles: BatchFileItem[];
  activeInspectItem: SlotDiffItem | null;
  activeInspectBatchFile: BatchFileItem | null;
  isDiffModalOpen: boolean;
  userRole: string;
  sensitivityLevel: 'Public' | 'Internal' | 'Confidential' | 'SecretDefense';
  enableWatermark: boolean;
  watermarkUser: string;
  error: string | null;
}
