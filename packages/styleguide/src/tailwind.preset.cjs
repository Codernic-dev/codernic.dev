/**
 * Codernic Sovereign AI Ecosystem — Shared Tailwind Theme Preset
 * Consumed by apps using Tailwind CSS v3 / v4.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        pillar: {
          deming: '#f87171',
          ragtime: '#60a5fa',
          galileus: '#4ade80',
          ockham: '#2dd4bf',
          pirsig: '#a78bfa',
        },
        neutral: {
          950: '#0a0a0a',
          900: '#171717',
          850: '#1c1c1c',
          800: '#262626',
        }
      },
      fontFamily: {
        display: ['Outfit', '-apple-system', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      }
    }
  }
};
