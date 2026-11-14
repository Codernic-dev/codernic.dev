use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthRequest {
    pub nonce: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthResponse {
    pub sig: String,
    pub version: String,
}

pub fn compute_sig(secret: &str, nonce: &str) -> String {
    let sig = codernic_nano::hmac_sha256(secret.as_bytes(), nonce.as_bytes());
    codernic_nano::hex::encode(&sig)
}

pub fn verify_sig(secret: &str, nonce: &str, sig: &str) -> bool {
    if let Ok(sig_bytes) = codernic_nano::hex::decode(sig) {
        if sig_bytes.len() == 32 {
            let mut arr = [0u8; 32];
            arr.copy_from_slice(&sig_bytes);
            return codernic_nano::hmac_verify(secret.as_bytes(), nonce.as_bytes(), &arr);
        }
    }
    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hmac_signature() {
        let secret = "super_secret_key";
        let nonce = "123e4567-e89b-12d3-a456-426614174000";

        let sig = compute_sig(secret, nonce);
        assert!(verify_sig(secret, nonce, &sig));
        assert!(!verify_sig("wrong_secret", nonce, &sig));
        assert!(!verify_sig(secret, "wrong_nonce", &sig));
        assert!(!verify_sig(secret, nonce, "invalid_sig"));
    }
}
