export const themes = {
  dark: {
    surface: 'linear-gradient(150deg, #0f172a, #0b1224 60%, #111827)',
    border: 'rgba(255, 255, 255, 0.12)',
    accent: '#7dd3fc',
    accentAlt: '#a855f7',
    text: '#e5e7eb',
    shadow: '0 18px 44px rgba(0, 0, 0, 0.38)',
  },
  light: {
    surface: '#f8fafc',
    border: '#e2e8f0',
    accent: '#0ea5e9',
    accentAlt: '#6366f1',
    text: '#0f172a',
    shadow: '0 20px 44px rgba(14, 165, 233, 0.18)',
  },
}

export type ThemeKey = keyof typeof themes

export const palette = {
  ink: '#0f172a',
  muted: '#94a3b8',
  subtle: '#cbd5e1',
  surfaceMuted: '#0b1224',
  surfaceSoft: '#0f172a',
  warning: '#fecdd3',
  danger: '#f87171',
  success: '#4ade80',
  borderSoft: 'rgba(255, 255, 255, 0.12)',
  highlight: '#a855f7',
}
