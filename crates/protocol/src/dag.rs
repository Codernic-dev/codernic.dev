// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct IndexingConfig {
    pub root_path: PathBuf,
    pub project_id: Option<String>,
    pub pooling_strategy: String,
    pub model_type: String,
    pub languages: Option<String>,
    pub exclude_patterns: Option<String>,
    pub additional_roots: Option<Vec<PathBuf>>,
    pub respect_gitignore: bool,
    pub json_output: bool,
    pub max_concurrency: Option<usize>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AgentParadigm {
    #[serde(alias = "linear", alias = "Linear")]
    Linear,
    #[serde(alias = "react", alias = "ReAct")]
    ReAct,
    #[serde(alias = "supervisor", alias = "Supervisor")]
    Supervisor,
    #[serde(alias = "systemsDesigner", alias = "SystemsDesigner")]
    SystemsDesigner,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CheckpointConfig {
    pub id: String,
    pub mode: String,
    pub on_fail: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct LaneNodeConfig {
    pub id: String,
    #[serde(alias = "dependencies", default)]
    pub depends_on: Vec<String>,
    pub agent_file: String,
    pub supervisor_file: Option<String>,
    pub paradigm: Option<AgentParadigm>,
    pub capabilities: Option<Vec<String>>,
    pub checkpoints: Option<Vec<CheckpointConfig>>,
    pub skill: Option<String>,
    pub input_context: Option<serde_json::Value>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct GlobalBarrierConfig {
    pub name: String,
    pub participants: Vec<String>,
    pub timeout_ms: Option<u64>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DagConfig {
    pub name: String,
    pub description: Option<String>,
    pub lanes: Vec<LaneNodeConfig>,
    pub global_barriers: Option<Vec<GlobalBarrierConfig>>,
    pub capability_registry: Option<std::collections::HashMap<String, Vec<String>>>,
    pub model_router_file: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum DagExecutionEvent {
    LaneStarted { lane_id: String, timestamp: u64 },
    LaneOutput { lane_id: String, chunk: String },
    LaneCompleted { lane_id: String, exit_code: i32 },
    LaneFailed { lane_id: String, error: String },
}
