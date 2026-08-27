// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

use std::ffi::c_char;

#[repr(C)]
pub struct HardwareProbeHandle {
    _private: [u8; 0],
}

#[repr(C)]
pub struct HwProbeVTable {
    pub hw_probe_new: extern "C" fn() -> *mut HardwareProbeHandle,
    pub hw_probe_get_vulkan_capabilities: extern "C" fn(*const HardwareProbeHandle, *mut c_char, usize) -> bool,
    pub hw_probe_free: extern "C" fn(*mut HardwareProbeHandle),
}
