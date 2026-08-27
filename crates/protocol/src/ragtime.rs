// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

use std::ffi::c_char;

#[repr(C)]
pub struct IndexManagerHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct SemanticSearchHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct RagtimeVTable {
    pub index_manager_new: extern "C" fn(*const c_char) -> *mut IndexManagerHandle,
    pub index_manager_free: extern "C" fn(*mut IndexManagerHandle),
    pub semantic_search_new: extern "C" fn(*mut IndexManagerHandle) -> *mut SemanticSearchHandle,
    pub semantic_search_execute: extern "C" fn(*const SemanticSearchHandle, *const c_char, *mut c_char, usize) -> bool,
    pub semantic_search_free: extern "C" fn(*mut SemanticSearchHandle),
}
