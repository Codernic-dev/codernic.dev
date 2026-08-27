<template>
  <div class="react-renderer-root my-6 p-6 rounded-xl border border-zinc-800 bg-[#0a0a0c] shadow-2xl overflow-hidden">
    <div ref="mountPoint"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  componentName: {
    type: String,
    required: true
  }
})

const mountPoint = ref(null)
let root = null

onMounted(async () => {
  if (typeof window !== 'undefined' && mountPoint.value) {
    const React = await import('react')
    const ReactDOM = await import('react-dom/client')
    const Components = await import('../../../../src/index.ts')

    root = ReactDOM.createRoot(mountPoint.value)

    let element = null
    const {
      Button, Badge, Card, Text, HelpTooltip,
      MetricCard, EmptyState, Skeleton, Banner, AgnosticDropdown,
      AlphanumericBadge, DemingGPUHostIcon, VectorVaultIcon, DAGPipelineLockIcon,
      LocalQuantizationIcon, DLPScrubberIcon, AirGapStatusIcon, IconCodernic,
      IconChevronRight, IconChevronDown, IconChevronUp, IconChevronLeft,
      IconMaximize, IconMinimize, IconPanelLeft, IconPanelRight, IconMenu,
      IconFile, IconFileText, IconFolder, IconSession,
      IconAgent, IconDag, IconTech, IconBot,
      IconPlus, IconX, IconTrash, IconEdit, IconRefresh, IconSearch, IconDownload,
      IconArrowLeft, IconArrowRight, IconCopy, IconCode, IconStop, IconZoomIn, IconZoomOut,
      IconEye, IconEyeOff, IconLockOpen, IconSandbox,
      IconShield, IconSave, IconActivity, IconCpu, IconZap, IconCheck, IconCheckCircle,
      IconAlertTriangle, IconCircle, IconDot, IconLoader,
      IconSettings, IconTerminal, IconDatabase, IconLock, IconGlobe, IconBookOpen, IconInfo, IconHelpCircle,
      IconHeart, IconCloud, IconPackage, IconThought, IconTool, IconPlay, IconRepeat,
      IconShare2, IconLandmark, IconLayers, IconCoins,
      IsisHealthBadge, IsisMetricBar, IsisDiagnosticCard,
      LayoutProvider, VBlock, WidgetContainer
    } = Components

    if (props.componentName === 'button') {
      element = React.createElement('div', { className: 'flex flex-wrap items-center gap-4' },
        React.createElement(Button, { variant: 'primary' }, 'Primary Button'),
        React.createElement(Button, { variant: 'secondary' }, 'Secondary Button'),
        React.createElement(Button, { variant: 'outline' }, 'Outline Button'),
        React.createElement(Button, { variant: 'ghost' }, 'Ghost Button'),
        React.createElement(Button, { variant: 'danger' }, 'Danger Action')
      )
    } else if (props.componentName === 'badge') {
      element = React.createElement('div', { className: 'flex flex-wrap items-center gap-3' },
        React.createElement(Badge, { status: 'running', label: 'Codernic Core', dot: true }),
        React.createElement(Badge, { status: 'failed', label: '01. Deming Execution', dot: true }),
        React.createElement(Badge, { status: 'warning', label: '02. Ragtime Memory', dot: true }),
        React.createElement(Badge, { status: 'success', label: '03. Galileus Governance', dot: true }),
        React.createElement(Badge, { status: 'pending', label: '04. Ockham Optimization', dot: true }),
        React.createElement(Badge, { status: 'partial', label: '05. Pirsig Security', dot: true })
      )
    } else if (props.componentName === 'card') {
      element = React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        React.createElement(Card, { className: 'p-5' },
          React.createElement('h3', { className: 'text-sm font-bold text-zinc-100 mb-1' }, 'Bare-Metal CUDA Instance'),
          React.createElement('p', { className: 'text-xs text-zinc-400' }, 'Deming engine worker node connected via NVLink.')
        ),
        React.createElement(Card, { className: 'p-5' },
          React.createElement('h3', { className: 'text-sm font-bold text-zinc-100 mb-1' }, 'AST Ray Embedding Vault'),
          React.createElement('p', { className: 'text-xs text-zinc-400' }, 'Ragtime vector index with 1,024-dim dense embeddings.')
        )
      )
    } else if (props.componentName === 'text') {
      element = React.createElement('div', { className: 'space-y-2' },
        React.createElement(Text, { size: 'lg', weight: 'bold' }, 'Codernic Enterprise IDE System'),
        React.createElement(Text, { size: 'md', color: 'muted' }, 'Sovereign multi-agent orchestration desktop platform.'),
        React.createElement(Text, { size: 'sm', family: 'mono' }, '01_DEMING_EXECUTION_ENGINE_READY')
      )
    } else if (props.componentName === 'help-tooltip') {
      element = React.createElement('div', { className: 'flex items-center gap-2' },
        React.createElement(Text, { size: 'sm' }, 'Air-Gap Encryption Protocol'),
        React.createElement(HelpTooltip, { text: 'Enforces strictly offline compute with zero external telemetry leakage.' })
      )
    } else if (props.componentName === 'metric-card') {
      element = React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4' },
        React.createElement(MetricCard, {
          title: 'Active Agents',
          value: '12',
          subtext: '+3 since last session',
          pillar: 'deming'
        }),
        React.createElement(MetricCard, {
          title: 'Tokens/sec',
          value: '142.8',
          subtext: 'NVIDIA RTX 4090 (vLLM)',
          pillar: 'ockham'
        }),
        React.createElement(MetricCard, {
          title: 'DLP Audits',
          value: '100%',
          subtext: '0 secrets exposed',
          pillar: 'pirsig'
        })
      )
    } else if (props.componentName === 'empty-state') {
      element = React.createElement(EmptyState, {
        title: 'No Active Introspection Traces',
        description: 'Execute a workflow DAG or submit a prompt to record telemetry events.',
        action: React.createElement(Button, { variant: 'primary' }, 'Start New Execution')
      })
    } else if (props.componentName === 'skeleton') {
      element = React.createElement('div', { className: 'space-y-3' },
        React.createElement(Skeleton, { className: 'h-4 w-3/4' }),
        React.createElement(Skeleton, { className: 'h-4 w-1/2' }),
        React.createElement(Skeleton, { className: 'h-4 w-5/6' })
      )
    } else if (props.componentName === 'banner') {
      element = React.createElement(Banner, {
        id: 'viewport-disclaimer',
        message: 'Codernic is optimized for desktop viewports.',
        type: 'warning'
      })
    } else if (props.componentName === 'agnostic-dropdown') {
      element = React.createElement('div', { className: 'w-64' },
        React.createElement(AgnosticDropdown, {
          options: [
            { label: 'GitHub Copilot (GPT-4o Bare-Metal)', value: 'copilot-gpt4o' },
            { label: 'Local Ollama (Llama 3.3 70B)', value: 'ollama' }
          ],
          value: 'copilot-gpt4o',
          onChange: (val) => console.log(val)
        })
      )
    } else if (props.componentName === 'alphanumeric-badge') {
      element = React.createElement('div', { className: 'flex flex-wrap items-center gap-3' },
        React.createElement(AlphanumericBadge, { char: '0', pillar: 'amber' }),
        React.createElement(AlphanumericBadge, { char: '1', pillar: 'deming' }),
        React.createElement(AlphanumericBadge, { char: '2', pillar: 'ragtime' }),
        React.createElement(AlphanumericBadge, { char: '3', pillar: 'galileus' }),
        React.createElement(AlphanumericBadge, { char: '4', pillar: 'ockham' }),
        React.createElement(AlphanumericBadge, { char: '5', pillar: 'pirsig' })
      )
    } else if (props.componentName === 'business-icons') {
      element = React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 gap-4' },
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#F87171]/30 bg-[#F87171]/5 flex items-center gap-3' },
          React.createElement(DemingGPUHostIcon, { size: 24, pillar: 'deming' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#F87171]' }, 'Deming GPU Host'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Bare-metal CUDA core')
          )
        ),
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#60A5FA]/30 bg-[#60A5FA]/5 flex items-center gap-3' },
          React.createElement(VectorVaultIcon, { size: 24, pillar: 'ragtime' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#60A5FA]' }, 'Vector Vault'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Ragtime AST Ray')
          )
        ),
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/5 flex items-center gap-3' },
          React.createElement(DAGPipelineLockIcon, { size: 24, pillar: 'galileus' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#4ADE80]' }, 'DAG Lock'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Galileus Orchestration')
          )
        ),
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 flex items-center gap-3' },
          React.createElement(LocalQuantizationIcon, { size: 24, pillar: 'ockham' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#2DD4BF]' }, 'Quantization'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Ockham Compressor')
          )
        ),
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#A78BFA]/30 bg-[#A78BFA]/5 flex items-center gap-3' },
          React.createElement(DLPScrubberIcon, { size: 24, pillar: 'pirsig' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#A78BFA]' }, 'DLP Scrubber'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Pirsig Shield')
          )
        ),
        React.createElement('div', { className: 'p-4 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 flex items-center gap-3' },
          React.createElement(AirGapStatusIcon, { size: 24, pillar: 'amber' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-xs font-bold text-[#fbbf24]' }, 'Air-Gap Status'),
            React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Sovereign Isolated')
          )
        )
      )
    } else if (props.componentName === 'system-icons' || props.componentName === 'icons-and-logos') {
      const allIconsList = [
        { name: 'IconChevronRight', icon: IconChevronRight, cat: 'Navigation' },
        { name: 'IconChevronDown', icon: IconChevronDown, cat: 'Navigation' },
        { name: 'IconChevronUp', icon: IconChevronUp, cat: 'Navigation' },
        { name: 'IconChevronLeft', icon: IconChevronLeft, cat: 'Navigation' },
        { name: 'IconMaximize', icon: IconMaximize, cat: 'Navigation' },
        { name: 'IconMinimize', icon: IconMinimize, cat: 'Navigation' },
        { name: 'IconPanelLeft', icon: IconPanelLeft, cat: 'Navigation' },
        { name: 'IconPanelRight', icon: IconPanelRight, cat: 'Navigation' },
        { name: 'IconMenu', icon: IconMenu, cat: 'Navigation' },

        { name: 'IconFile', icon: IconFile, cat: 'Files' },
        { name: 'IconFileText', icon: IconFileText, cat: 'Files' },
        { name: 'IconFolder', icon: IconFolder, cat: 'Files' },
        { name: 'IconSession', icon: IconSession, cat: 'Files' },

        { name: 'IconAgent', icon: IconAgent, cat: 'Agents & DAGs' },
        { name: 'IconDag', icon: IconDag, cat: 'Agents & DAGs' },
        { name: 'IconTech', icon: IconTech, cat: 'Agents & DAGs' },
        { name: 'IconBot', icon: IconBot, cat: 'Agents & DAGs' },

        { name: 'IconPlus', icon: IconPlus, cat: 'Actions' },
        { name: 'IconX', icon: IconX, cat: 'Actions' },
        { name: 'IconTrash', icon: IconTrash, cat: 'Actions' },
        { name: 'IconEdit', icon: IconEdit, cat: 'Actions' },
        { name: 'IconRefresh', icon: IconRefresh, cat: 'Actions' },
        { name: 'IconSearch', icon: IconSearch, cat: 'Actions' },
        { name: 'IconDownload', icon: IconDownload, cat: 'Actions' },
        { name: 'IconArrowLeft', icon: IconArrowLeft, cat: 'Actions' },
        { name: 'IconArrowRight', icon: IconArrowRight, cat: 'Actions' },
        { name: 'IconCopy', icon: IconCopy, cat: 'Actions' },
        { name: 'IconCode', icon: IconCode, cat: 'Actions' },
        { name: 'IconStop', icon: IconStop, cat: 'Actions' },
        { name: 'IconZoomIn', icon: IconZoomIn, cat: 'Actions' },
        { name: 'IconZoomOut', icon: IconZoomOut, cat: 'Actions' },
        { name: 'IconEye', icon: IconEye, cat: 'Actions' },
        { name: 'IconEyeOff', icon: IconEyeOff, cat: 'Actions' },
        { name: 'IconLockOpen', icon: IconLockOpen, cat: 'Actions' },
        { name: 'IconSandbox', icon: IconSandbox, cat: 'Actions' },

        { name: 'IconShield', icon: IconShield, cat: 'Monitoring' },
        { name: 'IconSave', icon: IconSave, cat: 'Monitoring' },
        { name: 'IconActivity', icon: IconActivity, cat: 'Monitoring' },
        { name: 'IconCpu', icon: IconCpu, cat: 'Monitoring' },
        { name: 'IconZap', icon: IconZap, cat: 'Monitoring' },
        { name: 'IconCheck', icon: IconCheck, cat: 'Monitoring' },
        { name: 'IconCheckCircle', icon: IconCheckCircle, cat: 'Monitoring' },
        { name: 'IconAlertTriangle', icon: IconAlertTriangle, cat: 'Monitoring' },
        { name: 'IconCircle', icon: IconCircle, cat: 'Monitoring' },
        { name: 'IconDot', icon: IconDot, cat: 'Monitoring' },
        { name: 'IconLoader', icon: IconLoader, cat: 'Monitoring' },

        { name: 'IconSettings', icon: IconSettings, cat: 'System' },
        { name: 'IconTerminal', icon: IconTerminal, cat: 'System' },
        { name: 'IconDatabase', icon: IconDatabase, cat: 'System' },
        { name: 'IconLock', icon: IconLock, cat: 'System' },
        { name: 'IconGlobe', icon: IconGlobe, cat: 'System' },
        { name: 'IconBookOpen', icon: IconBookOpen, cat: 'System' },
        { name: 'IconInfo', icon: IconInfo, cat: 'System' },
        { name: 'IconHelpCircle', icon: IconHelpCircle, cat: 'System' },

        { name: 'IconHeart', icon: IconHeart, cat: 'Model Hub' },
        { name: 'IconCloud', icon: IconCloud, cat: 'Model Hub' },
        { name: 'IconPackage', icon: IconPackage, cat: 'Model Hub' },

        { name: 'IconThought', icon: IconThought, cat: 'Introspection' },
        { name: 'IconTool', icon: IconTool, cat: 'Introspection' },
        { name: 'IconPlay', icon: IconPlay, cat: 'Introspection' },
        { name: 'IconRepeat', icon: IconRepeat, cat: 'Introspection' },

        { name: 'IconShare2', icon: IconShare2, cat: 'Canvas' },
        { name: 'IconLandmark', icon: IconLandmark, cat: 'Canvas' },

        { name: 'IconLayers', icon: IconLayers, cat: 'Context' },
        { name: 'IconCoins', icon: IconCoins, cat: 'Context' },
      ]

      element = React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'flex items-center justify-between border-b border-zinc-800 pb-3' },
          React.createElement('div', null,
            React.createElement('h3', { className: 'text-sm font-bold text-zinc-100 font-mono' }, 'CODERNIC SYSTEM ICON LIBRARY'),
            React.createElement('p', { className: 'text-xs text-zinc-400' }, `Showing all ${allIconsList.length} SVG components with stroke-based design.`)
          ),
          React.createElement('span', { className: 'text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30' },
            `${allIconsList.length} ICONS`
          )
        ),
        React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3' },
          allIconsList.map(item =>
            React.createElement('div', {
              key: item.name,
              className: 'p-3 rounded-lg border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-amber-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer'
            },
              React.createElement(item.icon, { size: 22, color: '#fbbf24', className: 'group-hover:scale-110 transition-transform' }),
              React.createElement('span', { className: 'text-[11px] font-mono font-medium text-zinc-200 truncate w-full' }, item.name.replace('Icon', '')),
              React.createElement('span', { className: 'text-[9px] font-mono text-zinc-500 uppercase tracking-wider' }, item.cat)
            )
          )
        )
      )
    } else if (props.componentName === 'icon-codernic') {
      element = React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'flex items-center justify-between border-b border-zinc-800 pb-3' },
          React.createElement('div', null,
            React.createElement('h3', { className: 'text-sm font-bold text-zinc-100 font-mono' }, 'CODERNIC OFFICIAL LOGO MARK'),
            React.createElement('p', { className: 'text-xs text-zinc-400' }, '60°/120° Isometric geometry brand emblem.')
          )
        ),
        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-6' },
          React.createElement('div', { className: 'p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 text-center' },
            React.createElement(IconCodernic, { size: 64 }),
            React.createElement('span', { className: 'text-xs font-mono font-bold text-zinc-200' }, '64px Standard App Mark'),
            React.createElement('span', { className: 'text-[10px] text-zinc-500' }, 'Used in Headers & Navigation')
          ),
          React.createElement('div', { className: 'p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 text-center' },
            React.createElement(IconCodernic, { size: 48 }),
            React.createElement('span', { className: 'text-xs font-mono font-bold text-zinc-200' }, '48px Compact Logo'),
            React.createElement('span', { className: 'text-[10px] text-zinc-500' }, 'Used in Sidebar & Toolbar')
          ),
          React.createElement('div', { className: 'p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 text-center' },
            React.createElement(IconCodernic, { size: 32 }),
            React.createElement('span', { className: 'text-xs font-mono font-bold text-zinc-200' }, '32px Micro Emblem'),
            React.createElement('span', { className: 'text-[10px] text-zinc-500' }, 'Used in Favicons & Badges')
          )
        )
      )
    } else if (props.componentName === 'layout-blocks') {
      const initialLayoutState = {
        isEditMode: true,
        rootId: 'workspace-root',
        blocks: {
          'workspace-root': {
            id: 'workspace-root',
            type: 'vblock',
            orientation: 'horizontal',
            childrenIds: ['left-sidebar-vblock', 'main-editor-vblock', 'right-panel-vblock'],
            ratios: [0.25, 0.5, 0.25],
            locked: false,
          },
          'left-sidebar-vblock': {
            id: 'left-sidebar-vblock',
            type: 'vblock',
            orientation: 'vertical',
            childrenIds: ['widget-file-explorer', 'widget-model-hub'],
            ratios: [0.6, 0.4],
            behavior: 'panel-left',
            allowFullScreen: true,
            parentId: 'workspace-root'
          },
          'widget-file-explorer': {
            id: 'widget-file-explorer',
            type: 'widget',
            widgetType: 'AST Ray Explorer',
            parentId: 'left-sidebar-vblock'
          },
          'widget-model-hub': {
            id: 'widget-model-hub',
            type: 'widget',
            widgetType: 'Ollama Local Model Hub',
            parentId: 'left-sidebar-vblock'
          },
          'main-editor-vblock': {
            id: 'main-editor-vblock',
            type: 'vblock',
            orientation: 'vertical',
            childrenIds: ['widget-code-editor', 'widget-dag-graph'],
            ratios: [0.6, 0.4],
            allowFullScreen: true,
            parentId: 'workspace-root'
          },
          'widget-code-editor': {
            id: 'widget-code-editor',
            type: 'widget',
            widgetType: 'Deming CUDA Kernel Editor',
            parentId: 'main-editor-vblock'
          },
          'widget-dag-graph': {
            id: 'widget-dag-graph',
            type: 'widget',
            widgetType: 'Galileus DAG Pipeline',
            parentId: 'main-editor-vblock'
          },
          'right-panel-vblock': {
            id: 'right-panel-vblock',
            type: 'vblock',
            orientation: 'vertical',
            childrenIds: ['widget-[#111620]', 'widget-security'],
            ratios: [0.55, 0.45],
            behavior: 'panel-right',
            allowFullScreen: true,
            parentId: 'workspace-root'
          },
          'widget-[#111620]': {
            id: 'widget-[#111620]',
            type: 'widget',
            widgetType: 'ISIS Bare-Metal Terminal',
            parentId: 'right-panel-vblock'
          },
          'widget-security': {
            id: 'widget-security',
            type: 'widget',
            widgetType: 'Pirsig DLP Scrubber',
            parentId: 'right-panel-vblock'
          }
        }
      }

      const customWidgetRenderer = (block) => {
        const type = block.widgetType
        if (type === 'AST Ray Explorer') {
          return React.createElement('div', { className: 'p-3 text-xs font-mono space-y-1.5' },
            React.createElement('div', { className: 'flex items-center gap-1.5 text-amber-400 font-bold' },
              React.createElement(IconFolder, { size: 14 }),
              React.createElement('span', null, 'codernic-core/')
            ),
            React.createElement('div', { className: 'pl-3 space-y-1 text-zinc-400' },
              React.createElement('div', { className: 'flex items-center gap-1.5' }, React.createElement(IconFileText, { size: 12 }), 'deming_engine.rs'),
              React.createElement('div', { className: 'flex items-center gap-1.5 text-zinc-200' }, React.createElement(IconFileText, { size: 12 }), 'galileus_dag.rs'),
              React.createElement('div', { className: 'flex items-center gap-1.5' }, React.createElement(IconFileText, { size: 12 }), 'pirsig_audit.rs')
            )
          )
        }
        if (type === 'Ollama Local Model Hub') {
          return React.createElement('div', { className: 'p-3 space-y-2' },
            React.createElement('div', { className: 'flex items-center justify-between text-xs font-mono' },
              React.createElement('span', { className: 'text-zinc-200 font-bold' }, 'Llama-3.3-70B-Instruct'),
              React.createElement('span', { className: 'text-emerald-400 text-[10px]' }, 'READY')
            ),
            React.createElement('div', { className: 'w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden' },
              React.createElement('div', { className: 'h-full bg-emerald-400 w-3/4' })
            ),
            React.createElement('span', { className: 'text-[10px] text-zinc-500 font-mono block' }, 'VRAM Allocated: 14.2 GB / 24 GB')
          )
        }
        if (type === 'Deming CUDA Kernel Editor') {
          return React.createElement('div', { className: 'p-3 font-mono text-xs space-y-1 bg-[#07090c] h-full rounded border border-zinc-800/40' },
            React.createElement('div', { className: 'text-zinc-500' }, '// Deming Engine GPU Kernel v2.4'),
            React.createElement('div', { className: 'text-amber-400' }, '__global__ void process_tensor_ray(...) {'),
            React.createElement('div', { className: 'pl-4 text-zinc-300' }, 'int idx = blockIdx.x * blockDim.x + threadIdx.x;'),
            React.createElement('div', { className: 'pl-4 text-emerald-400' }, 'cuda_matrix_multiply(tensor[idx], &weights);'),
            React.createElement('div', { className: 'text-amber-400' }, '}')
          )
        }
        if (type === 'Galileus DAG Pipeline') {
          return React.createElement('div', { className: 'p-3 flex items-center justify-around h-full font-mono text-xs' },
            React.createElement('div', { className: 'p-2 rounded bg-zinc-800 border border-zinc-700 text-center' },
              React.createElement('div', { className: 'text-amber-400 font-bold' }, 'NODE 01'),
              React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Parse AST')
            ),
            React.createElement(IconChevronRight, { size: 16, className: 'text-zinc-500' }),
            React.createElement('div', { className: 'p-2 rounded bg-zinc-800 border border-emerald-500/40 text-center' },
              React.createElement('div', { className: 'text-emerald-400 font-bold' }, 'NODE 02'),
              React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Quantize')
            ),
            React.createElement(IconChevronRight, { size: 16, className: 'text-zinc-500' }),
            React.createElement('div', { className: 'p-2 rounded bg-zinc-800 border border-zinc-700 text-center' },
              React.createElement('div', { className: 'text-blue-400 font-bold' }, 'NODE 03'),
              React.createElement('div', { className: 'text-[10px] text-zinc-400' }, 'Audit')
            )
          )
        }
        if (type === 'ISIS Bare-Metal Terminal') {
          return React.createElement('div', { className: 'p-3 font-mono text-xs space-y-1 bg-[#050505] text-zinc-300 h-full rounded border border-zinc-800/60' },
            React.createElement('div', { className: 'text-emerald-400' }, '[isis-daemon] Connected to /dev/ttyUSB0 (115200 baud)'),
            React.createElement('div', { className: 'text-zinc-400' }, 'root@codernic-node:~# cargo check --workspace'),
            React.createElement('div', { className: 'text-amber-400' }, '   Finished dev [unoptimized + debuginfo] target(s) in 0.42s')
          )
        }
        return React.createElement('div', { className: 'p-3 space-y-1.5' },
          React.createElement('div', { className: 'flex items-center justify-between text-xs font-mono' },
            React.createElement('span', { className: 'text-purple-400 font-bold' }, 'Pirsig Secret Scrubber'),
            React.createElement('span', { className: 'text-emerald-400 text-[10px]' }, '0 SECRETS DETECTED')
          ),
          React.createElement('div', { className: 'text-[11px] text-zinc-400 font-mono' }, 'Scanning 14 files during AST traversal...')
        )
      }

      element = React.createElement(LayoutProvider, {
        initialState: initialLayoutState,
        renderWidget: customWidgetRenderer
      }, React.createElement(VBlock, { id: 'workspace-root' }))
    } else if (props.componentName === 'isis-health-badge') {
      element = React.createElement('div', { className: 'flex flex-wrap items-center gap-3' },
        React.createElement(IsisHealthBadge, { status: 'online', label: 'ISIS DAEMON ONLINE' }),
        React.createElement(IsisHealthBadge, { status: 'degraded', label: 'DEGRADED (HIGH VRAM)' }),
        React.createElement(IsisHealthBadge, { status: 'offline', label: 'AIR-GAP DISCONNECTED' })
      )
    } else if (props.componentName === 'isis-metric-bar') {
      element = React.createElement(IsisMetricBar, {
        label: 'GPU VRAM Allocation (NVIDIA RTX 4090)',
        current: 18.4,
        max: 24.0,
        unit: 'GB'
      })
    } else if (props.componentName === 'isis-diagnostic-card') {
      element = React.createElement(IsisDiagnosticCard, {
        probeId: 'isis_telemetry_probe_01',
        status: 'PASS',
        latencyMs: 1.2,
        memoryRssMb: 142
      })
    }

    if (element) {
      root.render(element)
    }
  }
})

onUnmounted(() => {
  if (root) {
    root.unmount()
  }
})
</script>
