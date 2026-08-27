use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum LicenseType {
    Free,
    NdaTrial(String),
    Production(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LicensePayload {
    pub tier: LicenseType,
    pub issued_at: u64,
    pub expires_at: u64,
    pub machine_id: Option<String>,
    pub modules: Vec<String>,
}

#[derive(Debug, thiserror::Error)]
pub enum LicenseError {
    #[error("Invalid license format. Expected payload.signature")]
    InvalidFormat,
    #[error("Invalid cryptographic signature")]
    InvalidSignature,
    #[error("License expired")]
    Expired,
    #[error("Base64 decoding failed")]
    DecodeError,
}
