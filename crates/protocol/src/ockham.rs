// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

use std::ffi::c_char;

#[repr(C)]
pub struct QualityGateHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct DedupCacheHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct OckhamVTable {
    pub dedup_cache_new: extern "C" fn() -> *mut DedupCacheHandle,
    pub dedup_cache_check: extern "C" fn(*const DedupCacheHandle, *const c_char) -> bool,
    pub dedup_cache_free: extern "C" fn(*mut DedupCacheHandle),
    
    pub quality_gate_new: extern "C" fn() -> *mut QualityGateHandle,
    pub quality_gate_evaluate: extern "C" fn(*const QualityGateHandle, *const c_char, *mut c_char, usize) -> bool,
    pub quality_gate_free: extern "C" fn(*mut QualityGateHandle),
}
