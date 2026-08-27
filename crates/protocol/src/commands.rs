// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use super::dag::{DagExecutionEvent, IndexingConfig};
use super::models::{InferenceEvent, InferenceHyperparams, LocalModelDefinition};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum CommandRequest {
    ExecuteAsk {
        task_id: String,
        model_def: LocalModelDefinition,
        messages: Vec<ChatMessage>,
        params: InferenceHyperparams,
        use_rag: bool,
        route_profile: Option<String>,
        project_id: Option<String>,
        #[serde(default)]
        auth_token: Option<String>,
    },
    GetSessions { project_id: Option<String> },
    LoadSession { id: String, project_id: Option<String> },
    RenameSession { id: String, new_name: String, project_id: Option<String> },
    DeleteSession { id: String, project_id: Option<String> },
    UpdateSessionConfig {
        session_id: String,
        project_id: Option<String>,
        llm_id: Option<String>,
        use_rag: Option<bool>,
        auto_pilot: Option<bool>,
        current_mode: Option<String>,
        erathos_schema: Option<serde_json::Value>,
    },
    UpdateSessionSchema { session_id: String, schema: serde_json::Value, project_id: Option<String> },
    GetAsset { asset_type: String, id: String, project_id: Option<String> },
    SaveAsset { asset_type: String, id: String, content: String, mode: Option<String>, project_id: Option<String> },
    SaveLlmSecret {
        provider_id: String,
        api_key: String,
        base_url: Option<String>,
        project_id: Option<String>,
    },
    ResolveToolApproval {
        request_id: String,
        approved: bool,
    },
    GeneratePlan {
        instruction: String,
        project_id: Option<String>,
        route_profile: Option<String>,
    },
    ExecuteDag {
        task_id: String,
        project_id: Option<String>,
        instruction: String,
        route_profile: Option<String>,
        yolo_mode: bool,
    },
    AnalyzeAst {
        file_path: PathBuf,
    },
    AnalyzeProject {
        project_id: Option<String>,
    },
    StartIndexing {
        config: IndexingConfig,
    },
    DownloadModel {
        name: String,
        provider: PathBuf,
    },
    GetMetrics,
    GetStatus,
    GetHealth,
    GetVersion,
    Shutdown,
    Abort {
        task_id: String,
    },
    Chat {
        session_id: String,
        prompt: String,
        force_mode: Option<String>,
        sub_mode: Option<String>,
        use_rag: bool,
        model_def: LocalModelDefinition,
        params: InferenceHyperparams,
        #[serde(default)]
        yolo_mode: bool,
        route_profile: Option<String>,
        project_id: Option<String>,
        #[serde(default)]
        auth_token: Option<String>,
    },
    Freeze {
        session_id: String,
        project_id: Option<String>,
    },
    CancelFreeze {
        session_id: String,
        project_id: Option<String>,
    },
    Implement {
        session_id: String,
        project_id: Option<String>,
    },
    StoreSecret {
        key: String,
        secret: String,
    },
    SyncAggregatorModels {
        project_id: Option<String>,
    },
    GetModelBenchmarks {
        models: Vec<String>,
        project_id: Option<String>,
    },
    GetCloudModels,
    AddCloudModel {
        provider_id: String,
        model: serde_json::Value,
    },
    DeleteModel {
        name: String,
        project_id: Option<String>,
    },
    OckhamCompressContext {
        messages: Vec<ChatMessage>,
        budget_tokens: usize,
        strategy: String,
        session_id: String,
        project_id: Option<String>,
    },
    OckhamSyncCatalog { project_id: Option<String> },
    OckhamSearchModels {
        query: String,
        match_type: String,
        project_id: Option<String>,
    },
    Ping,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ModelBenchmarkInfo {
    pub model_id: String,
    pub provider: String,
    pub tokens_per_second: Option<f32>,
    pub quality_elo: Option<f32>,
    pub input_cost_per_m: Option<f32>,
    pub output_cost_per_m: Option<f32>,
    pub context_window: Option<usize>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum TelemetryEvent {
    LockAcquiring { lock_id: String, task_id: String },
    LockAcquired { lock_id: String, task_id: String },
    ToolExecuting { tool_name: String, args: String },
    ToolExecuted { tool_name: String, status: String },
    PromptDispatched { prompt: String, model_id: String, seed: u64 },
    LLMResponseStats { tokens_generated: usize, prompt_tokens: usize, duration_ms: u64 },
    ModelLoaded { model_id: String, vram_usage_mb: f64 },
    AiAdapterSwapped { adapter_id: String, base_model: String },
    OckhamCompressionStats { original_tokens: usize, compressed_tokens: usize, saved_tokens: usize, cost_saved_usd: f64 },
    HardwareBackendSelected { gpu_name: String, backend: String, is_native: bool, features: String, fallback_reason: Option<String> },
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CoreHealthPayload {
    pub vram_used_gb: Option<f64>,
    pub vram_total_gb: Option<f64>,
    pub vram_available_gb: Option<f64>,
    pub memory_lock_limit: Option<String>,
    pub rag_initialized: bool,
    pub indexed_chunks_count: usize,
    pub total_ram_gb: f64,
    pub used_ram_gb: f64,
    pub cpu_cores: usize,
    pub cpu_usage_pct: f32,
    pub has_cuda: bool,
    pub has_rocm: bool,
    pub has_metal: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum CommandResponse {
    Inference(InferenceEvent),
    Dag(DagExecutionEvent),
    PlanTopology { json_graph: String },
    AstMetrics { kpi_score: f32, symbols_count: usize, qualitative_flags: Option<Vec<String>> },
    IndexingProgress { files_indexed: usize, total_files: usize, percentage: u8 },
    IndexingDone,
    IndexingError(String),
    Status {
        active_slots: usize,
        max_slots: usize,
        vram_used_gb: Option<f64>,
        vram_total_gb: Option<f64>,
        ram_used_gb: Option<f64>,
        total_ram_gb: Option<f64>,
        cpu_usage_pct: Option<f64>,
        #[serde(default)]
        is_indexing: bool,
    },
    MetricsReport { json_parse_failures: u64 },
    Health(CoreHealthPayload),
    Version { version: String, pid: u32 },
    Telemetry(TelemetryEvent),
    ModeTransition {
        session_id: String,
        from: String,
        to: String,
        reason: String,
    },
    RequestToolApproval {
        tool_name: String,
        request_id: String,
        sandbox_recommended: bool,
    },
    AgentEvent(serde_json::Value),
    EgressBlockedNotification { reason: String, payload_id: String },
    ResourceExhaustedNotification { 
        reason: String, 
        required_vram_gb: f32, 
        available_vram_gb: f32, 
        required_tokens: usize, 
        max_tokens: usize 
    },
    AggregatorSyncComplete {
        providers_updated: usize,
        models_added: usize,
    },
    ModelBenchmarks(Vec<ModelBenchmarkInfo>),
    Done,
    Error(String),
    SessionsList { sessions: Vec<SessionMeta> },
    SessionLoaded {
        id: String,
        messages: Vec<ChatMessage>,
        erathos_schema: Option<serde_json::Value>,
        config: Option<SessionConfigMeta>,
    },
    SessionDeleted { id: String },
    AssetContent { id: String, content: String },
    ToolCall { name: String, arguments: serde_json::Value },
    ToolResponse { name: String, result: String },
    HfdProgress { downloaded: u64, total: u64 },
    HfdDone,
    HfdError(String),
    Pong,
    UiLayoutUpdate(serde_json::Value),
    CloudModelsResult(serde_json::Value),
    AddCloudModelResult {
        success: bool,
        provider_id: String,
        model_id: String,
    },
    ModelDeleted {
        name: String,
        success: bool,
        error: Option<String>,
    },
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SessionConfigMeta {
    pub llm_id: Option<String>,
    pub use_rag: Option<bool>,
    pub auto_pilot: Option<bool>,
    pub current_mode: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SessionMeta {
    pub id: String,
    pub name: String,
    pub status: String,
    pub last_updated: i64,
}
