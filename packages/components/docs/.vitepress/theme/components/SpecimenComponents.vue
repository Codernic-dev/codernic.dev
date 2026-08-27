<template>
  <div class="codernic-specimen-root font-sans text-zinc-100 my-6 p-6 rounded-xl border border-zinc-800 bg-[#0a0a0c] shadow-2xl">
    <!-- Button Specimen -->
    <div v-if="type === 'button'" class="flex flex-wrap items-center gap-4">
      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-[#f59e0b] hover:bg-[#fbbf24] text-black shadow-lg shadow-[#f59e0b]/20">
        Primary Button
      </button>
      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700">
        Secondary Button
      </button>
      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30">
        Danger Button
      </button>
      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-transparent hover:bg-zinc-800/60 text-zinc-400 hover:text-white">
        Ghost Button
      </button>
      <button disabled class="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-zinc-600 border border-zinc-800/50 cursor-not-allowed opacity-50">
        Disabled
      </button>
    </div>

    <!-- Badge Specimen -->
    <div v-else-if="type === 'badge'" class="flex flex-wrap items-center gap-3">
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/30">
        Codernic Core
      </span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
        01. Deming Execution
      </span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#60A5FA]/15 text-[#60A5FA] border border-[#60A5FA]/30">
        02. Ragtime Memory
      </span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
        03. Galileus Governance
      </span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2DD4BF]/15 text-[#2DD4BF] border border-[#2DD4BF]/30">
        04. Ockham Optimization
      </span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30">
        05. Pirsig Security
      </span>
    </div>

    <!-- Card Specimen -->
    <div v-else-if="type === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-5 rounded-xl border border-zinc-800 bg-[#0d1117] hover:border-[#f59e0b]/50 transition-all group">
        <h4 class="text-base font-semibold text-zinc-100 group-hover:text-[#fbbf24] transition-colors">Agnostic Base Card</h4>
        <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
          Standard structural container for dashboard widgets, telemetry views, and modular panels.
        </p>
      </div>
      <div class="p-5 rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/5 hover:border-[#4ADE80]/60 transition-all">
        <h4 class="text-base font-semibold text-[#4ADE80]">Galileus Governance Card</h4>
        <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
          Pillar-accented variant with dynamic border glow and active DAG state handling.
        </p>
      </div>
    </div>

    <!-- Text Specimen -->
    <div v-else-if="type === 'text'" class="space-y-3">
      <h1 class="text-2xl font-bold text-zinc-100 font-heading">Heading Level 1 (Outfit)</h1>
      <h2 class="text-xl font-semibold text-zinc-200 font-heading">Heading Level 2 (Outfit)</h2>
      <p class="text-sm text-zinc-400 font-sans">Body text rendered in crisp Inter typography with optimal line height for high-density IDE UIs.</p>
      <code class="block p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-[#fbbf24]">
        cargo run --bin isis-toolbox -- --target baremetal-cuda
      </code>
    </div>

    <!-- Help Tooltip Specimen -->
    <div v-else-if="type === 'help-tooltip'" class="flex items-center gap-3">
      <span class="text-sm text-zinc-300">Hover or click icon for documentation:</span>
      <a href="https://codernic.dev/docs" target="_blank" class="inline-flex items-center justify-center p-1 rounded-md bg-zinc-800/80 hover:bg-[#f59e0b]/20 text-zinc-400 hover:text-[#fbbf24] border border-zinc-700 hover:border-[#f59e0b]/40 transition-all cursor-pointer" title="Click to open documentation">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </a>
    </div>

    <!-- Metric Card Specimen -->
    <div v-else-if="type === 'metric-card'" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
        <span class="text-xs font-medium text-zinc-400 uppercase tracking-wider">Bare-Metal TFLOPS</span>
        <span class="text-2xl font-bold text-[#fbbf24] mt-2 font-mono">142.8 TFLOPS</span>
      </div>
      <div class="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
        <span class="text-xs font-medium text-zinc-400 uppercase tracking-wider">Ragtime Vector Index</span>
        <span class="text-2xl font-bold text-[#60A5FA] mt-2 font-mono">2,410,980</span>
      </div>
      <div class="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
        <span class="text-xs font-medium text-zinc-400 uppercase tracking-wider">DAG Latency</span>
        <span class="text-2xl font-bold text-[#4ADE80] mt-2 font-mono">1.4 ms</span>
      </div>
    </div>

    <!-- Empty State Specimen -->
    <div v-else-if="type === 'empty-state'" class="flex flex-col items-center justify-center p-8 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950/40">
      <div class="w-12 h-12 mb-4 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#fbbf24]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      </div>
      <h4 class="text-base font-semibold text-zinc-200">No Active Introspection Traces</h4>
      <p class="text-xs text-zinc-400 mt-1 max-w-sm">Execute a workflow DAG or submit a prompt to record telemetry events.</p>
      <button class="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-semibold transition-all">
        Start New Execution
      </button>
    </div>

    <!-- Skeleton Specimen -->
    <div v-else-if="type === 'skeleton'" class="space-y-3">
      <div class="h-4 skeleton-loader rounded-md w-3/4 animate-pulse"></div>
      <div class="h-4 skeleton-loader rounded-md w-1/2 animate-pulse"></div>
      <div class="h-4 skeleton-loader rounded-md w-5/6 animate-pulse"></div>
    </div>

    <!-- Banner Specimen -->
    <div v-else-if="type === 'banner'" class="space-y-3">
      <div class="p-3.5 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#fbbf24] text-xs font-medium flex items-center justify-between">
        <span>⚡ Warning: Codernic is optimized for desktop viewports.</span>
        <button class="text-zinc-400 hover:text-white text-xs">Dismiss</button>
      </div>
    </div>

    <!-- Agnostic Dropdown Specimen -->
    <div v-else-if="type === 'agnostic-dropdown'" class="w-64">
      <label class="block text-xs font-medium text-zinc-400 mb-1.5">Select LLM Provider Profile</label>
      <div class="relative">
        <select class="w-full bg-[#0d1117] border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 appearance-none focus:outline-none focus:border-[#f59e0b]">
          <option>GitHub Copilot (GPT-4o Bare-Metal)</option>
          <option>Local Ollama (Llama 3.3 70B Quantized)</option>
          <option>Custom Sovereign Gateway (Ed25519 Signed)</option>
        </select>
      </div>
    </div>

    <!-- Alphanumeric Badge Specimen -->
    <div v-else-if="type === 'alphanumeric-badge'" class="flex flex-wrap items-center gap-4">
      <div v-for="char in ['0', '1', '2', 'A', 'B', 'C', '#', '*']" :key="char"
           class="w-9 h-9 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 flex items-center justify-center font-mono font-bold text-sm text-[#fbbf24] shadow-md shadow-[#f59e0b]/5 hover:scale-110 transition-transform cursor-pointer">
        {{ char }}
      </div>
    </div>

    <!-- Business Icons Specimen -->
    <div v-else-if="type === 'business-icons'" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl border border-[#F87171]/30 bg-[#F87171]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#F87171]/10 text-[#F87171]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect><path d="M8 1v2M16 1v2M8 21v2M16 21v2M1 8h2M1 16h2M21 8h2M21 16h2"></path></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#F87171]">Deming GPU Host</div>
          <div class="text-[10px] text-zinc-400">Bare-metal CUDA core</div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[#60A5FA]/30 bg-[#60A5FA]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#60A5FA]/10 text-[#60A5FA]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="12" cy="18" r="3"></circle><path d="M8.5 7.5l7 0M7.5 8.5l3.5 7M16.5 8.5l-3.5 7"></path></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#60A5FA]">Vector Vault</div>
          <div class="text-[10px] text-zinc-400">Ragtime AST Ray Search</div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#4ADE80]/10 text-[#4ADE80]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#4ADE80]">DAG Lock</div>
          <div class="text-[10px] text-zinc-400">Galileus Orchestration</div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14l8-8 8 8"></path><path d="M4 18l8-8 8 8"></path></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#2DD4BF]">Quantization</div>
          <div class="text-[10px] text-zinc-400">Ockham Model Compressor</div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[#A78BFA]/30 bg-[#A78BFA]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#A78BFA]/10 text-[#A78BFA]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#A78BFA]">DLP Scrubber</div>
          <div class="text-[10px] text-zinc-400">Pirsig Governance Shield</div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#f59e0b]/10 text-[#fbbf24]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9" stroke-dasharray="3 3"></circle><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>
        </div>
        <div>
          <div class="text-xs font-bold text-[#fbbf24]">AirGap Status</div>
          <div class="text-[10px] text-zinc-400">Sovereign Isolated</div>
        </div>
      </div>
    </div>

    <!-- System Icons Specimen -->
    <div v-else-if="type === 'system-icons' || type === 'icons-and-logos'" class="space-y-4">
      <div class="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h4 class="text-xs font-bold font-mono text-zinc-200 uppercase tracking-wider">Complete System Icons Catalog</h4>
        <span class="text-[10px] font-mono text-amber-400">60+ ICONS</span>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
        <div v-for="icon in [
          'ChevronRight', 'ChevronDown', 'Maximize', 'PanelLeft', 'Menu',
          'FileText', 'Folder', 'Session', 'Agent', 'Dag', 'Bot',
          'Plus', 'X', 'Trash', 'Edit', 'Refresh', 'Search', 'Download',
          'Copy', 'Code', 'Stop', 'ZoomIn', 'Eye', 'LockOpen', 'Sandbox',
          'Shield', 'Save', 'Activity', 'Cpu', 'Zap', 'CheckCircle',
          'Settings', 'Terminal', 'Database', 'Globe', 'BookOpen', 'Info',
          'Heart', 'Cloud', 'Package', 'Thought', 'Tool', 'Play', 'Coins'
        ]" :key="icon"
             class="p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 flex flex-col items-center gap-1.5 hover:border-[#f59e0b]/40 hover:bg-zinc-800/50 transition-all cursor-pointer">
          <div class="text-[#fbbf24]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>
          </div>
          <span class="text-[10px] font-mono text-zinc-300 truncate w-full text-center">{{ icon }}</span>
        </div>
      </div>
    </div>

    <!-- Icon Codernic Specimen -->
    <div v-else-if="type === 'icon-codernic'" class="flex items-center gap-6 p-4">
      <div class="w-16 h-16 p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 204.8 206.9">
          <path fill="#fbbf24" d="M150,58.9c-4.4-7.9-8.7-15.4-13.6-23.9c9,0,17-0.2,25,0.2c1.2,0.1,2.6,2.2,3.5,3.7c5.1,8.6,10.1,17.4,15.1,26.1c1.5,2.6,2.1,4.7,0.2,8c-15.2,25.8-30.1,51.8-45.1,77.7c-3.5,6-6.9,12-10.2,18c-1.3,2.5-3,3.4-5.9,3.3c-13-0.2-26,0-39-0.2c-1.5,0-3.7-0.8-4.4-1.9c-4-6.2-7.6-12.7-11.9-20c6.4,0,11.7,0,17.1,0c8.2,0,16.3-0.2,24.5,0.1c3.1,0.1,5-0.9,6.4-3.4c10.5-18.4,21-36.9,31.6-55.3c2.9-5.1,5.9-10.3,9.1-15.3c2.6-4,4.5-7.9,0.7-12.3C151.8,62.5,151,60.8,150,58.9z" />
          <path fill="#f4f4f5" d="M205.4,47.7c-6.8,0.3-13.7,0-20.5,0.5c-4.4,0.3-6.3-1.7-8.1-5.1c-3.2-6-6.7-11.8-10.3-17.5c-0.8-1.2-2.7-2.4-4.1-2.4c-29-0.1-58-0.2-87,0c-1.7,0-4.1,1.8-5.1,3.4C56.7,49.8,43.2,73.1,29.7,96.4c-1.2,2.1-2.4,4.2-3.4,6.4c-0.2,0.5,0,1.3,0.2,1.8c5.2,8.9,10.5,17.8,15.6,26.7c7,12.2,13.8,24.4,20.7,36.6c2.5,4.5,4.9,9.1,7.8,13.4c1,1.4,3.4,2.5,5.3,2.6c5.6,0.3,11.3,0.1,17,0.2c1.4,0,3.5,0.2,4,1.1c4,6.9,7.8,14,11.6,21.5c-16,0.4-32,0.4-48.6,0c-4.7-7.4-8.8-14.5-12.9-21.6c-9.6-16.6-19.1-33.2-28.8-49.7C12,124.8,5.7,114.4-0.6,104c0,0,0-0.5,0.3-0.8c1.4-2.1,2.5-3.9,3.6-5.7C11.5,83,19.5,68.5,27.8,54.2C38.3,36.1,48.9,18,59.4,0C98.8,0,138.1,0,178,0.3c3.2,4.9,5.8,9.5,8.5,14c6.3,10.6,12.6,21.1,18.9,31.6C205.4,46.4,205.4,46.9,205.4,47.7z" />
          <path fill="#f4f4f5" d="M49.7,97.3C61.4,77,72.8,57,84.5,37.1c0.9-1.6,3.5-2.9,5.4-3c9.3-0.3,18.7-0.3,28,0c1.8,0.1,4.1,1.6,5.1,3.2c2.7,3.9,4.8,8.2,7.3,12.7c-10.2,0-19.8,0.2-29.5-0.1c-3.1-0.1-4.9,1.1-6.2,3.5c-9.3,16.2-18.2,32.7-28,48.6c-3.9,6.3-4.1,10.8,0.4,16.7c3.9,5,6.4,11.1,9.9,17.4c-6.4,0-12,0.2-17.5-0.1c-1.4-0.1-3.1-1.6-4-2.9c-4.1-6.7-8.1-13.6-11.9-20.5c-0.7-1.3-0.4-3.7,0.3-5.2C45.4,103.9,47.6,100.8,49.7,97.3z" />
        </svg>
      </div>
      <div>
        <h4 class="text-sm font-bold text-zinc-100">Codernic Official Mark</h4>
        <p class="text-xs text-zinc-400 mt-1">60°/120° Isometric geometry mark shared across all 5 sovereignty pillars.</p>
      </div>
    </div>

    <!-- Isis Health Badge Specimen -->
    <div v-else-if="type === 'isis-health-badge'" class="flex flex-wrap items-center gap-3">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        ISIS DAEMON ONLINE
      </span>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/30">
        <span class="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
        DEGRADED (HIGH VRAM)
      </span>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
        <span class="w-2 h-2 rounded-full bg-red-400"></span>
        AIR-GAP DISCONNECTED
      </span>
    </div>

    <!-- Isis Metric Bar Specimen -->
    <div v-else-if="type === 'isis-metric-bar'" class="space-y-3">
      <div>
        <div class="flex justify-between text-xs font-mono text-zinc-400 mb-1">
          <span>GPU VRAM Allocation (NVIDIA RTX 4090)</span>
          <span class="text-[#fbbf24]">18.4 GB / 24.0 GB (76%)</span>
        </div>
        <div class="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
          <div class="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full" style="width: 76%"></div>
        </div>
      </div>
    </div>

    <!-- Isis Diagnostic Card Specimen -->
    <div v-else-if="type === 'isis-diagnostic-card'" class="p-5 rounded-xl border border-zinc-800 bg-[#0d1117]">
      <div class="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <h4 class="text-sm font-bold text-zinc-200 font-mono">isis_telemetry_probe_01</h4>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">STATUS: PASS</span>
      </div>
      <div class="grid grid-cols-2 gap-4 text-xs font-mono">
        <div><span class="text-zinc-500">Latency:</span> <span class="text-zinc-200">1.2ms</span></div>
        <div><span class="text-zinc-500">Memory RSS:</span> <span class="text-zinc-200">142MB</span></div>
      </div>
    </div>

    <!-- FastTable Specimen -->
    <div v-else-if="type === 'fast-table'" class="overflow-x-auto rounded-lg border border-zinc-800 bg-[#0d1117]">
      <table class="w-full text-left text-xs font-mono text-zinc-300">
        <thead class="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Agent Task</th>
            <th class="p-3">Engine</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800/50">
          <tr class="hover:bg-zinc-900/50">
            <td class="p-3 text-[#fbbf24]">#01</td>
            <td class="p-3 text-zinc-200">Deming CUDA Kernel Compile</td>
            <td class="p-3">baremetal-cuda</td>
            <td class="p-3 text-emerald-400">COMPLETED</td>
          </tr>
          <tr class="hover:bg-zinc-900/50">
            <td class="p-3 text-[#fbbf24]">#02</td>
            <td class="p-3 text-zinc-200">Ragtime Vector Index Scan</td>
            <td class="p-3">ragtime-ast</td>
            <td class="p-3 text-emerald-400">COMPLETED</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sequencer Specimen -->
    <div v-else-if="type === 'sequencer'" class="p-4 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-[#f59e0b] animate-ping"></span>
        <span class="text-xs font-mono text-zinc-200 font-bold">FSM Sequencer Active: Step 2/5</span>
      </div>
      <button class="px-3 py-1 rounded text-xs font-semibold bg-[#f59e0b] text-black hover:bg-[#fbbf24] transition-all">
        Next Step →
      </button>
    </div>

    <!-- Layout Blocks Visual Specimen -->
    <div v-else-if="type === 'layout-blocks'" class="border border-zinc-800 rounded-xl overflow-hidden bg-[#07090c] p-4 space-y-3 font-mono">
      <div class="flex items-center justify-between border-b border-zinc-800 pb-2">
        <span class="text-xs font-bold text-amber-400 flex items-center gap-2">
          <span>LAYOUT ENGINE ARCHITECTURE</span>
          <span class="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">VBLOCK SPLIT SYSTEM</span>
        </span>
        <span class="text-[10px] text-zinc-500">EDIT_MODE: TRUE</span>
      </div>
      <div class="grid grid-cols-12 gap-2 h-48">
        <div class="col-span-3 p-3 rounded bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <span class="text-[10px] text-zinc-400 font-bold">VBlock (panel-left)</span>
          <div class="p-2 rounded bg-black/50 border border-zinc-800 text-[10px] text-zinc-300">Widget: File Explorer</div>
          <div class="p-2 rounded bg-black/50 border border-zinc-800 text-[10px] text-zinc-300">Widget: Model Hub</div>
        </div>
        <div class="col-span-6 p-3 rounded bg-zinc-900/80 border border-amber-500/40 flex flex-col justify-between shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]">
          <span class="text-[10px] text-amber-400 font-bold">VBlock (Editor Core)</span>
          <div class="p-2 rounded bg-black/50 border border-amber-500/30 text-[10px] text-zinc-200">Widget: CUDA Kernel Editor</div>
          <div class="p-2 rounded bg-black/50 border border-zinc-800 text-[10px] text-zinc-300">Widget: Galileus DAG Graph</div>
        </div>
        <div class="col-span-3 p-3 rounded bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <span class="text-[10px] text-zinc-400 font-bold">VBlock (panel-right)</span>
          <div class="p-2 rounded bg-black/50 border border-zinc-800 text-[10px] text-zinc-300">Widget: ISIS Terminal</div>
          <div class="p-2 rounded bg-black/50 border border-zinc-800 text-[10px] text-zinc-300">Widget: Pirsig DLP</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>
