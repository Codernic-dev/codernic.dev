import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  BatchFileItem,
  SampleDocumentEntry,
  SandboxPillarId,
  SandboxState,
  SecurityMode,
  SecurityProcessingResult,
  SlotDiffItem,
} from './sandbox-types';

const INITIAL_SAMPLES: SampleDocumentEntry[] = [
  {
    filename: 'Confidential_Roadmap.pptx',
    category: 'pptx',
    sizeBytes: 1425000,
    description: 'Présentation stratégique & Roadmap R&D 2026-2027 Confidentielle',
  },
  {
    filename: 'Legal_Case_384_Victim_Settlement.pdf',
    category: 'pdf',
    sizeBytes: 892000,
    description: 'Protocole transactionnel juridique, indemnisations & identités protégées',
  },
  {
    filename: 'financial_secrets.xlsx',
    category: 'xlsx',
    sizeBytes: 645000,
    description: 'Bilan financier trimestriel, IBAN bancaires & grille salariale direction',
  },
  {
    filename: 'Project_Titan_Acquisition_TermSheet_v7_Draft.docx',
    category: 'docx',
    sizeBytes: 1120000,
    description: 'Contrat d\'acquisition M&A, valorisation d\'actifs & clauses d\'exclusivité',
  },
  {
    filename: 'CEO_Email_BiotechX_Titan.txt',
    category: 'eml',
    sizeBytes: 42000,
    description: 'Échange d\'e-mails confidentiels de la Direction Générale',
  },
];

const INITIAL_BATCH_FILES: BatchFileItem[] = [
  {
    id: 'f1',
    name: 'contracts_q4_signed.pdf',
    path: '/vault/archive/contracts_q4_signed.pdf',
    sizeBytes: 2450000,
    extension: 'pdf',
    threatLevel: 'CRITICAL',
    piiCount: 14,
    secretsCount: 2,
    watermarked: true,
    status: 'SANITIZED',
    diffs: [
      {
        slotId: 0,
        originalText: 'Contrat cadre signé par Me Jean DUPONT (IBAN: FR763000600001) le 12/08/2026.',
        sanitizedText: 'Contrat cadre signé par Me [PERSON_01] (IBAN: [IBAN_PROTECTED_01]) le 12/08/2026. \u200B\u200C',
        modified: true,
        detectedEntities: [
          {
            id: 'e1',
            category: 'PII_NAME',
            label: 'Identité Civile',
            originalValue: 'Jean DUPONT',
            maskedValue: '[PERSON_01]',
            confidence: 0.99,
          },
          {
            id: 'e2',
            category: 'IBAN',
            label: 'Compte Bancaire',
            originalValue: 'FR763000600001',
            maskedValue: '[IBAN_PROTECTED_01]',
            confidence: 1.0,
          },
        ],
      },
    ],
  },
  {
    id: 'f2',
    name: 'q3_payroll_master.xlsx',
    path: '/vault/archive/q3_payroll_master.xlsx',
    sizeBytes: 1280000,
    extension: 'xlsx',
    threatLevel: 'CRITICAL',
    piiCount: 48,
    secretsCount: 0,
    watermarked: true,
    status: 'SANITIZED',
    diffs: [
      {
        slotId: 1,
        originalText: 'Salaire brut annuel Directeur R&D: 185,000 CHF versé à UBS CH93000022.',
        sanitizedText: 'Salaire brut annuel Directeur R&D: [CONFIDENTIAL_SALARY] versé à UBS [IBAN_MASKED].',
        modified: true,
        detectedEntities: [
          {
            id: 'e3',
            category: 'CONFIDENTIAL_FINANCIAL',
            label: 'Donnée Salariale',
            originalValue: '185,000 CHF',
            maskedValue: '[CONFIDENTIAL_SALARY]',
            confidence: 0.97,
          },
        ],
      },
    ],
  },
  {
    id: 'f3',
    name: 'architecture_diagram.pptx',
    path: '/vault/archive/architecture_diagram.pptx',
    sizeBytes: 3100000,
    extension: 'pptx',
    threatLevel: 'MEDIUM',
    piiCount: 3,
    secretsCount: 1,
    watermarked: true,
    status: 'SANITIZED',
    diffs: [
      {
        slotId: 2,
        originalText: 'API_KEY_PROD: sk_live_99281a8b9c pour passerelle Claude/OpenAI.',
        sanitizedText: 'API_KEY_PROD: [VAULT_REDACTED_KEY] pour passerelle Claude/OpenAI.',
        modified: true,
        detectedEntities: [
          {
            id: 'e4',
            category: 'SECRET_KEY',
            label: 'Clé d\'API Privée',
            originalValue: 'sk_live_99281a8b9c',
            maskedValue: '[VAULT_REDACTED_KEY]',
            confidence: 1.0,
          },
        ],
      },
    ],
  },
  {
    id: 'f4',
    name: 'public_whitepaper.docx',
    path: '/vault/archive/public_whitepaper.docx',
    sizeBytes: 520000,
    extension: 'docx',
    threatLevel: 'CLEAN',
    piiCount: 0,
    secretsCount: 0,
    watermarked: false,
    status: 'SANITIZED',
    diffs: [],
  },
];

const initialState: SandboxState = {
  activePillar: 'security', // Pilier 5 actif par défaut en Phase 1
  securityMode: 'single',
  availableSamples: INITIAL_SAMPLES,
  selectedSample: 'Confidential_Roadmap.pptx',
  isProcessing: false,
  processingResult: null,
  batchFiles: INITIAL_BATCH_FILES,
  activeInspectItem: null,
  activeInspectBatchFile: null,
  isDiffModalOpen: false,
  userRole: 'external_partner',
  sensitivityLevel: 'Confidential',
  enableWatermark: true,
  watermarkUser: 'usr_partner_042',
  error: null,
};

export const sandboxSlice = createSlice({
  name: 'sandbox',
  initialState,
  reducers: {
    setActivePillar: (state, action: PayloadAction<SandboxPillarId>) => {
      state.activePillar = action.payload;
    },
    setSecurityMode: (state, action: PayloadAction<SecurityMode>) => {
      state.securityMode = action.payload;
    },
    setSelectedSample: (state, action: PayloadAction<string>) => {
      state.selectedSample = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    setSensitivityLevel: (
      state,
      action: PayloadAction<'Public' | 'Internal' | 'Confidential' | 'SecretDefense'>
    ) => {
      state.sensitivityLevel = action.payload;
    },
    setEnableWatermark: (state, action: PayloadAction<boolean>) => {
      state.enableWatermark = action.payload;
    },
    setWatermarkUser: (state, action: PayloadAction<string>) => {
      state.watermarkUser = action.payload;
    },
    processDocumentRequest: (state, _action: PayloadAction<{ filename: string }>) => {
      state.isProcessing = true;
      state.error = null;
    },
    processDocumentSuccess: (state, action: PayloadAction<SecurityProcessingResult>) => {
      state.isProcessing = false;
      state.processingResult = action.payload;
    },
    processDocumentFailure: (state, action: PayloadAction<string>) => {
      state.isProcessing = false;
      state.error = action.payload;
    },
    openDiffInspection: (
      state,
      action: PayloadAction<{ diffItem: SlotDiffItem; batchFile?: BatchFileItem }>
    ) => {
      state.activeInspectItem = action.payload.diffItem;
      state.activeInspectBatchFile = action.payload.batchFile || null;
      state.isDiffModalOpen = true;
    },
    closeDiffInspection: (state) => {
      state.isDiffModalOpen = false;
      state.activeInspectItem = null;
      state.activeInspectBatchFile = null;
    },
    triggerBatchScanRequest: (state) => {
      state.isProcessing = true;
    },
    triggerBatchScanSuccess: (state, action: PayloadAction<BatchFileItem[]>) => {
      state.isProcessing = false;
      state.batchFiles = action.payload;
    },
  },
});

export const {
  setActivePillar,
  setSecurityMode,
  setSelectedSample,
  setUserRole,
  setSensitivityLevel,
  setEnableWatermark,
  setWatermarkUser,
  processDocumentRequest,
  processDocumentSuccess,
  processDocumentFailure,
  openDiffInspection,
  closeDiffInspection,
  triggerBatchScanRequest,
  triggerBatchScanSuccess,
} = sandboxSlice.actions;

// Selectors
export const selectSandboxActivePillar = (state: { sandbox: SandboxState }) =>
  state.sandbox.activePillar;
export const selectSandboxSecurityMode = (state: { sandbox: SandboxState }) =>
  state.sandbox.securityMode;
export const selectAvailableSamples = (state: { sandbox: SandboxState }) =>
  state.sandbox.availableSamples;
export const selectSelectedSample = (state: { sandbox: SandboxState }) =>
  state.sandbox.selectedSample;
export const selectSandboxIsProcessing = (state: { sandbox: SandboxState }) =>
  state.sandbox.isProcessing;
export const selectProcessingResult = (state: { sandbox: SandboxState }) =>
  state.sandbox.processingResult;
export const selectBatchFiles = (state: { sandbox: SandboxState }) =>
  state.sandbox.batchFiles;
export const selectActiveInspectItem = (state: { sandbox: SandboxState }) =>
  state.sandbox.activeInspectItem;
export const selectActiveInspectBatchFile = (state: { sandbox: SandboxState }) =>
  state.sandbox.activeInspectBatchFile;
export const selectIsDiffModalOpen = (state: { sandbox: SandboxState }) =>
  state.sandbox.isDiffModalOpen;
export const selectUserRole = (state: { sandbox: SandboxState }) =>
  state.sandbox.userRole;
export const selectSensitivityLevel = (state: { sandbox: SandboxState }) =>
  state.sandbox.sensitivityLevel;
export const selectEnableWatermark = (state: { sandbox: SandboxState }) =>
  state.sandbox.enableWatermark;
export const selectWatermarkUser = (state: { sandbox: SandboxState }) =>
  state.sandbox.watermarkUser;
export const selectSandboxError = (state: { sandbox: SandboxState }) =>
  state.sandbox.error;

export default sandboxSlice.reducer;
