import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Codernic Components Wiki",
  description: "Agnostic UI Component Library & Design System Showcase for Codernic",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Atoms', link: '/components/button' },
      { text: 'Molecules', link: '/components/metric-card' },
      { text: 'Icons & Logos', link: '/components/icons-and-logos' },
      { text: 'Isis Telemetry', link: '/components/isis-health-badge' },
      { text: 'Layout Engine', link: '/components/layout-blocks' }
    ],
    sidebar: [
      {
        text: 'Atomic Primitives',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Card', link: '/components/card' },
          { text: 'Text', link: '/components/text' },
          { text: 'Help Tooltip', link: '/components/help-tooltip' }
        ]
      },
      {
        text: 'Molecules & Display',
        items: [
          { text: 'Metric Card', link: '/components/metric-card' },
          { text: 'Empty State', link: '/components/empty-state' },
          { text: 'Skeleton Loader', link: '/components/skeleton' },
          { text: 'Banner', link: '/components/banner' },
          { text: 'Agnostic Dropdown', link: '/components/agnostic-dropdown' }
        ]
      },
      {
        text: 'Icons & Logos Reference',
        items: [
          { text: 'Complete Icons & Logos Library', link: '/components/icons-and-logos' },
          { text: 'Alphanumeric Badge', link: '/components/alphanumeric-badge' },
          { text: 'Business Widget Icons', link: '/components/business-icons' },
          { text: 'System Icon Library', link: '/components/system-icons' },
          { text: 'Codernic Isometric Logo', link: '/components/icon-codernic' }
        ]
      },
      {
        text: 'Isis Telemetry & Diagnostics',
        items: [
          { text: 'Isis Health Badge', link: '/components/isis-health-badge' },
          { text: 'Isis Metric Bar', link: '/components/isis-metric-bar' },
          { text: 'Isis Diagnostic Card', link: '/components/isis-diagnostic-card' }
        ]
      },
      {
        text: 'Data & Engine Primitives',
        items: [
          { text: 'FastTable Grid', link: '/components/fast-table' },
          { text: 'Sequencer Engine', link: '/components/sequencer-launcher-widget' },
          { text: 'Layout Engine Workspace', link: '/components/layout-blocks' }
        ]
      }
    ]
  }
})
