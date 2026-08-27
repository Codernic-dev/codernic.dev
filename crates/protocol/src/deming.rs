// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

use std::ffi::c_char;

/// Backend types for GPU context
#[repr(C)]
#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum FfiBackendType {
    Vulkan = 0,
    Cuda = 1,
    Hip = 2,
    Metal = 3,
    Cpu = 4,
}

/// Opaque handles
#[repr(C)]
pub struct GpuContextHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct MemoryManagerHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct F32BufferHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct F16BufferHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct UnifiedGraphHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct StrategyHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct GgufFileHandle {
    _private: [u8; 0],
}

/// Deming Engine VTable
#[repr(C)]
pub struct DemingEngineVTable {
    // GGUF Loader
    pub gguf_parse: extern "C" fn(*const c_char, *mut c_char, usize) -> *mut GgufFileHandle,
    pub gguf_version: extern "C" fn(*const GgufFileHandle) -> u32,
    pub gguf_tensor_count: extern "C" fn(*const GgufFileHandle) -> u64,
    pub gguf_free: extern "C" fn(*mut GgufFileHandle),

    // GPU Context
    pub gpu_context_mock: extern "C" fn() -> *mut GpuContextHandle,
    pub gpu_context_build_with_preference: extern "C" fn(*const c_char, *mut c_char, usize) -> *mut GpuContextHandle,
    pub gpu_context_backend_type: extern "C" fn(*const GpuContextHandle) -> *const c_char,
    pub gpu_context_free: extern "C" fn(*mut GpuContextHandle),

    // Memory Manager
    pub memory_manager_new: extern "C" fn(*const GpuContextHandle) -> *mut MemoryManagerHandle,
    pub memory_alloc_f32: extern "C" fn(*const MemoryManagerHandle, *const f32, usize, *mut c_char, usize) -> *mut F32BufferHandle,
    pub memory_manager_free: extern "C" fn(*mut MemoryManagerHandle),
    
    // F32 Buffer
    pub f32_buffer_hip_ptr: extern "C" fn(*const F32BufferHandle) -> u64,
    pub f32_buffer_bytes_len: extern "C" fn(*const F32BufferHandle) -> usize,
    pub f32_buffer_read: extern "C" fn(*const F32BufferHandle, *mut f32, usize) -> usize,
    pub f32_buffer_free: extern "C" fn(*mut F32BufferHandle),
    
    // Ops Strategies (GeLU as example)
    pub gelu_strategy_new: extern "C" fn(*const GpuContextHandle, u32, *const F16BufferHandle, *const F16BufferHandle, *mut c_char, usize) -> *mut StrategyHandle,
    pub strategy_execute: extern "C" fn(*const StrategyHandle, *const GpuContextHandle, *const MemoryManagerHandle, u32, bool, *mut c_char, usize) -> bool,
    pub strategy_free: extern "C" fn(*mut StrategyHandle),
}
