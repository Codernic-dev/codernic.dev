// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

use std::ffi::c_char;

#[repr(C)]
pub struct DagBuilderHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct NodeRunnerHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct GalileusVTable {
    pub dag_builder_new: extern "C" fn(*const c_char) -> *mut DagBuilderHandle,
    pub dag_builder_add_node: extern "C" fn(*mut DagBuilderHandle, *const c_char, *const c_char) -> bool,
    pub dag_builder_free: extern "C" fn(*mut DagBuilderHandle),
    
    pub node_runner_new: extern "C" fn(*mut DagBuilderHandle) -> *mut NodeRunnerHandle,
    pub node_runner_execute: extern "C" fn(*const NodeRunnerHandle, *mut c_char, usize) -> bool,
    pub node_runner_free: extern "C" fn(*mut NodeRunnerHandle),
}
