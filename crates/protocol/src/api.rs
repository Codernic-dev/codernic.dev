use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UnifiedResult {
    pub success: bool,
    pub data: Option<String>,
    pub error: Option<String>,
}

impl UnifiedResult {
    pub fn success(data: String) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }
    
    pub fn error(msg: &str) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(msg.to_string()),
        }
    }
    
    pub fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap_or_else(|_| "{\"success\":false,\"error\":\"Serialization failed\"}".to_string())
    }
}
