// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use super::transport::ConfigError;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum SupervisorDecision {
    Continue,
    InjectContext(String),
    CircuitBreak(String),
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub enum SupervisorMode {
    Permissive,
    Attentive,
    Deterministic,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SupervisorConfig {
    pub mode: SupervisorMode,
    pub max_iteration_buffer: usize,
    pub health_check_frequency: usize,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LocalModelDefinition {
    pub model_id: String,
    pub weights_paths: Vec<PathBuf>,
    pub config_path: PathBuf,
    pub tokenizer_path: PathBuf,
    pub context_window: usize,
    pub gpu_layers: Option<u32>,
    pub use_mlock: Option<bool>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ModelFormat {
    Safetensors,
    Gguf,
}

impl LocalModelDefinition {
    pub fn format(&self) -> ModelFormat {
        if self.weights_paths.iter().any(|p| p.extension().is_some_and(|ext| ext == "gguf")) {
            ModelFormat::Gguf
        } else {
            ModelFormat::Safetensors
        }
    }

    pub fn validate(&self) -> Result<(), ConfigError> {
        if self.weights_paths.is_empty() {
            return Err(ConfigError::InvalidConfiguration("No weights paths provided".to_string()));
        }

        for path in &self.weights_paths {
            if !path.exists() {
                return Err(ConfigError::FileNotFound(path.clone()));
            }
        }
        
        if self.format() == ModelFormat::Safetensors {
            if !self.config_path.exists() {
                return Err(ConfigError::FileNotFound(self.config_path.clone()));
            }

            if !self.tokenizer_path.exists() {
                return Err(ConfigError::FileNotFound(self.tokenizer_path.clone()));
            }
        }

        if self.context_window == 0 {
            return Err(ConfigError::InvalidConfiguration(
                "Context window must be strictly greater than 0".to_string(),
            ));
        }

        Ok(())
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InferenceHyperparams {
    pub temperature: Option<f64>,
    pub top_p: Option<f64>,
    pub max_tokens: usize,
    pub json_schema: Option<String>,
    pub gbnf_grammar: Option<String>,
    pub stop_sequences: Option<Vec<String>>,
    pub chat_template: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum InferenceEvent {
    Token(String),
    Metrics {
        ttft_ms: u64,
        tokens_per_second: f64,
        vram_allocated_bytes: u64,
        context_tokens_count: usize,
    },
    Error(String),
}
