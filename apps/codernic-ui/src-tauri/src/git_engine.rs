// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use git2::{Repository, StatusOptions};
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
pub struct GitFileStatus {
    pub path: String,
    pub status: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GitBranchInfo {
    pub name: String,
    pub is_head: bool,
}

pub struct GitEngine;

impl GitEngine {
    pub fn get_status<P: AsRef<Path>>(repo_path: P) -> Result<Vec<GitFileStatus>, String> {
        let repo = Repository::open(repo_path).map_err(|e| format!("Failed to open repo: {}", e))?;
        let mut opts = StatusOptions::new();
        opts.include_untracked(true).recurse_untracked_dirs(true);

        let statuses = repo.statuses(Some(&mut opts)).map_err(|e| format!("Failed to get status: {}", e))?;

        let mut results = Vec::new();
        for entry in statuses.iter() {
            let status_str = match entry.status() {
                s if s.is_wt_new() || s.is_index_new() => "untracked",
                s if s.is_wt_modified() || s.is_index_modified() => "modified",
                s if s.is_wt_deleted() || s.is_index_deleted() => "deleted",
                s if s.is_wt_renamed() || s.is_index_renamed() => "renamed",
                _ => "staged",
            };

            if let Some(path) = entry.path() {
                results.push(GitFileStatus {
                    path: path.to_string(),
                    status: status_str.to_string(),
                });
            }
        }

        Ok(results)
    }

    pub fn get_branches<P: AsRef<Path>>(repo_path: P) -> Result<Vec<GitBranchInfo>, String> {
        let repo = Repository::open(repo_path).map_err(|e| format!("Failed to open repo: {}", e))?;
        let branches = repo.branches(None).map_err(|e| format!("Failed to list branches: {}", e))?;

        let mut results = Vec::new();
        for (branch, _type) in branches.flatten() {
            if let Ok(Some(name)) = branch.name() {
                results.push(GitBranchInfo {
                    name: name.to_string(),
                    is_head: branch.is_head(),
                });
            }
        }

        Ok(results)
    }

    pub fn commit<P: AsRef<Path>>(repo_path: P, message: &str) -> Result<String, String> {
        let repo = Repository::open(repo_path).map_err(|e| format!("Failed to open repo: {}", e))?;
        let mut index = repo.index().map_err(|e| format!("Failed to get index: {}", e))?;
        
        index.add_all(["*"].iter(), git2::IndexAddOption::DEFAULT, None)
            .map_err(|e| format!("Failed to stage files: {}", e))?;
        index.write().map_err(|e| format!("Failed to write index: {}", e))?;

        let tree_id = index.write_tree().map_err(|e| format!("Failed to write tree: {}", e))?;
        let tree = repo.find_tree(tree_id).map_err(|e| format!("Failed to find tree: {}", e))?;

        let sig = repo.signature().or_else(|_| git2::Signature::now("Codernic User", "user@codernic.dev"))
            .map_err(|e| format!("Failed to create signature: {}", e))?;

        let parent_commit = match repo.head() {
            Ok(head) => Some(head.peel_to_commit().map_err(|e| format!("Failed to get parent commit: {}", e))?),
            Err(_) => None,
        };

        let parents = match &parent_commit {
            Some(c) => vec![c],
            None => vec![],
        };

        let commit_id = repo.commit(
            Some("HEAD"),
            &sig,
            &sig,
            message,
            &tree,
            &parents,
        ).map_err(|e| format!("Failed to create commit: {}", e))?;

        Ok(commit_id.to_string())
    }
}
