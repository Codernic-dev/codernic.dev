#![allow(clippy::unwrap_used, clippy::expect_used)]
#![allow(clippy::disallowed_macros)]
// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use tauri::{Emitter, Window};
use tauri_plugin_shell::ShellExt;
use serde::{Deserialize, Serialize};

use std::sync::Mutex;
use tauri_plugin_shell::process::CommandChild;

#[derive(Default)]
struct AppState {
    daemon_child: Mutex<Option<CommandChild>>,
    deming_child: Mutex<Option<std::process::Child>>,
}

#[derive(Debug, Serialize, Deserialize)]
struct LicenseStatusPayload {
    tier: String,
    issued_at: u64,
    expires_at: u64,
    is_active: bool,
    modules: Vec<String>,
}

#[tauri::command]
async fn get_daemon_status() -> Result<serde_json::Value, String> {
    let port = get_daemon_port();
    let is_running = reqwest::get(format!("http://127.0.0.1:{}/health", port))
        .await
        .map(|r| r.status().is_success())
        .unwrap_or(false);
    
    Ok(serde_json::json!({
        "isRunning": is_running,
    }))
}

#[tauri::command]
async fn start_daemon(app: tauri::AppHandle, window: Window, state: tauri::State<'_, AppState>) -> Result<(), String> {
    let port = get_daemon_port();

    // 1. Check if daemon is already running
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(300))
        .no_proxy()
        .build()
        .unwrap_or_default();
    if let Ok(r) = client.get(format!("http://127.0.0.1:{}/health", port)).send().await {
        if r.status().is_success() {
            let _ = window.emit("daemon-ready", ());
            return Ok(());
        }
    }

    {
        if state.daemon_child.lock().unwrap().is_some() {
            let _ = window.emit("daemon-ready", ());
            return Ok(());
        }
    }

    if let Ok(sidecar_cmd) = app.shell().sidecar("codernic") {
        if let Ok((mut rx, child)) = sidecar_cmd.spawn() {
            *state.daemon_child.lock().unwrap() = Some(child);
            let win = window.clone();
            tokio::spawn(async move {
                use tauri_plugin_shell::process::CommandEvent;
                while let Some(event) = rx.recv().await {
                    let line = match event {
                        CommandEvent::Stdout(b) | CommandEvent::Stderr(b) => {
                            String::from_utf8_lossy(&b).to_string()
                        }
                        _ => continue,
                    };
                    let _ = win.emit("daemon-log", line);
                }
            });
        }
    } else {
        // Fallback check for codernic-cli
        let config_mgr = configuration_manager::ConfigurationManager::global();
        let cli_path = config_mgr.resolve_global_path("bin/codernic-cli");
        if cli_path.exists() {
            let _ = std::process::Command::new(&cli_path).arg("--daemon").spawn();
        }
    }

    if let Ok(config_mgr) = configuration_manager::ConfigurationManager::initialize(None).await {
        let deming_path = config_mgr.resolve_global_path("bin/deming-engine");
        if deming_path.exists() {
            if let Ok(deming_child) = std::process::Command::new(&deming_path).spawn() {
                *state.deming_child.lock().unwrap() = Some(deming_child);
            }
        }
    }

    // Await actual readiness before signaling frontend
    let _ = wait_for_daemon_ready(port, 10).await;
    let _ = window.emit("daemon-ready", ());
    Ok(())
}

#[allow(dead_code)]
async fn wait_for_daemon_ready(port: u16, timeout_secs: u64) -> bool {
    let url = format!("http://127.0.0.1:{}/health", port);
    let deadline = tokio::time::Instant::now()
        + tokio::time::Duration::from_secs(timeout_secs);
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(300))
        .no_proxy()
        .build()
        .unwrap_or_default();
    
    codernic_lexicon::c_info!(action = codernic_lexicon::ServicesActions::ServicesActions_Waitingfordaemonon_397, arg0 = url);
    loop {
        if tokio::time::Instant::now() > deadline { return false; }
        if let Ok(r) = client.get(&url).send().await {
            if r.status().is_success() { 
                codernic_lexicon::c_info!(action = codernic_lexicon::ServicesActions::ServicesActions_Daemonisreadyon_398, arg0 = url);
                return true; 
            }
        } else {
            codernic_lexicon::c_info!(action = codernic_lexicon::ServicesActions::ServicesActions_Pingfailedretrying_399);
        }
        tokio::time::sleep(tokio::time::Duration::from_millis(200)).await;
    }
}

fn get_daemon_port() -> u16 {
    use codernic_core_config::global::EngineConfig;
    EngineConfig::load().network.daemon_ws_port
}

#[tauri::command]
fn stop_daemon(state: tauri::State<'_, AppState>) -> Result<(), String> {
    if let Some(child) = state.daemon_child.lock().unwrap().take() {
        let _ = child.kill();
    }
    if let Some(mut deming) = state.deming_child.lock().unwrap().take() {
        let _ = deming.kill();
    }
    Ok(())
}

#[tauri::command]
fn get_global_config() -> Result<String, String> {
    use codernic_core_config::global::EngineConfig;
    let path = EngineConfig::get_config_path();
    
    if !path.exists() {
        return Ok("bind_address: \"0.0.0.0:49152\"\n".to_string());
    }

    std::fs::read_to_string(path).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_global_config(yaml: String) -> Result<(), String> {
    use codernic_core_config::global::EngineConfig;
    let path = EngineConfig::get_config_path();
    
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    
    std::fs::write(&path, yaml).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_license_status() -> Result<Option<LicenseStatusPayload>, String> {
    let license = configuration_manager::ConfigurationManager::global().load_active_license();
    Ok(Some(LicenseStatusPayload {
        tier: format!("{:?}", license.payload.tier),
        issued_at: license.payload.issued_at,
        expires_at: license.payload.expires_at,
        is_active: license.is_active(),
        modules: license.payload.modules.clone(),
    }))
}

#[tauri::command]
fn set_license(key: String) -> Result<(), String> {
    let path = configuration_manager::ConfigurationManager::global().get_license_path();
    
    if let Some(parent) = path.parent() {
        if !parent.exists() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
    }
    
    // Pre-verify before writing
    codernic_core_security::license::License::verify(&key).map_err(|e| format!("Invalid license token: {}", e))?;
    
    std::fs::write(&path, key).map_err(|e| e.to_string())
}

#[tauri::command]
fn open_global_config() -> Result<(), String> {
    use codernic_core_config::global::EngineConfig;
    let path = EngineConfig::get_config_path();
    
    if !path.exists() {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).unwrap_or(());
        }
        std::fs::write(&path, "bind_address: \"0.0.0.0:49152\"\n").unwrap_or(());
    }

    webbrowser::open(path.to_str().unwrap()).map_err(|e| e.to_string())
}

#[tauri::command]
fn factory_reset() -> Result<(), String> {
    let mut path = dirs::home_dir().ok_or("No home directory found")?;
    path.push(".codernic");
    
    if path.exists() {
        std::fs::remove_dir_all(&path).map_err(|e| e.to_string())?;
    }
    
    Ok(())
}

#[tauri::command]
async fn generate_ssrm(model_id: String, owner: String, _expires_in_days: u64) -> Result<String, String> {
    let vault = codernic_core_security::VaultManager::new().await;
    let hw_uuid_str = machine_uid::get().unwrap_or_else(|_| "unknown-hardware".to_string());
    let hw_uuid = md5::compute(hw_uuid_str.as_bytes()).0;
    match codernic_core_security::ssrm::SsrmManifest::generate(&vault, hw_uuid, &owner, &model_id).await {
        Ok(manifest) => {
            let config = codernic_core_config::global::EngineConfig::load();
            let models_dir = std::path::PathBuf::from(&config.systemPaths.system_models_download_dir);
            if !models_dir.exists() {
                let _ = std::fs::create_dir_all(&models_dir);
            }
            let file_path = models_dir.join(format!("{}.ssrm", model_id));
            let json = serde_json::to_string_pretty(&manifest).map_err(|e| e.to_string())?;
            std::fs::write(&file_path, json).map_err(|e| e.to_string())?;
            Ok(file_path.to_string_lossy().to_string())
        }
        Err(e) => Err(e.to_string()),
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct TelemetryStatsPayload {
    pii_interceptions: usize,
    tokens_saved_percent: f64,
    blocked_requests: usize,
}

#[tauri::command]
fn get_resolved_engine_config() -> Result<serde_json::Value, String> {
    use codernic_core_config::global::EngineConfig;
    let config = EngineConfig::load();
    serde_json::to_value(&config).map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_telemetry_stats() -> Result<TelemetryStatsPayload, String> {
    use codernic_core_config::global::EngineConfig;
    let config = EngineConfig::load();
    let port = config.network.daemon_ws_port;

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(500))
        .no_proxy()
        .build()
        .unwrap_or_default();

    if let Ok(resp) = client.get(format!("http://127.0.0.1:{}/api/v1/metrics/interceptions", port)).send().await {
        if let Ok(json) = resp.json::<serde_json::Value>().await {
            let pii = json.get("pii_scrubbed_tokens").and_then(|v| v.as_u64()).unwrap_or(0) as usize;
            let tokens_saved = json.get("tokens_saved_percent").and_then(|v| v.as_f64()).unwrap_or(0.0);
            let blocked = json.get("interceptions_blocked").and_then(|v| v.as_u64()).unwrap_or(0) as usize;
            return Ok(TelemetryStatsPayload {
                pii_interceptions: pii,
                tokens_saved_percent: tokens_saved,
                blocked_requests: blocked,
            });
        }
    }

    Ok(TelemetryStatsPayload {
        pii_interceptions: 0,
        tokens_saved_percent: 0.0,
        blocked_requests: 0,
    })
}

pub mod git_engine;

#[tauri::command]
fn git_status(repo_path: String) -> Result<Vec<git_engine::GitFileStatus>, String> {
    git_engine::GitEngine::get_status(repo_path)
}

#[tauri::command]
fn git_branch_list(repo_path: String) -> Result<Vec<git_engine::GitBranchInfo>, String> {
    git_engine::GitEngine::get_branches(repo_path)
}

#[tauri::command]
fn git_commit(repo_path: String, message: String) -> Result<String, String> {
    git_engine::GitEngine::commit(repo_path, &message)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init());

    #[cfg(any(debug_assertions, test))]
    let builder = builder.plugin(tauri_plugin_wdio_webdriver::init());

    builder
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            get_daemon_status, 
            start_daemon, 
            stop_daemon, 
            open_global_config, 
            factory_reset,
            get_license_status,
            set_license,
            get_global_config,
            save_global_config,
            get_resolved_engine_config,
            generate_ssrm,
            get_telemetry_stats,
            git_status,
            git_branch_list,
            git_commit
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}

