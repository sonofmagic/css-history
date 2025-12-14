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
    surface: 'linear-gradient(165deg, #f8fafc, #e8f3ff 70%, #f4f4ff)',
    border: '#d9e2ed',
    accent: '#0ea5e9',
    accentAlt: '#6366f1',
    text: '#0f172a',
    shadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
  },
}

export type ThemeKey = keyof typeof themes

interface Palette {
  page: string
  pageText: string
  ink: string
  muted: string
  subtle: string
  surfaceMuted: string
  surfaceSoft: string
  warning: string
  danger: string
  success: string
  borderSoft: string
  highlight: string
  panel: string
  codeBg: string
  heroBg: string
  heroGlow: string
  heroShadow: string
  tagBg: string
}

const palettes: Record<ThemeKey, Palette> = {
  dark: {
    page: '#0a1120',
    pageText: '#e2e8f0',
    ink: '#0f172a',
    muted: '#a5b4c7',
    subtle: '#e2e8f0',
    surfaceMuted: '#0c1326',
    surfaceSoft: '#101a2f',
    warning: '#fecdd3',
    danger: '#f87171',
    success: '#4ade80',
    borderSoft: 'rgba(255, 255, 255, 0.18)',
    highlight: '#a855f7',
    panel: 'rgba(255, 255, 255, 0.06)',
    codeBg: '#0f172a',
    heroBg: '#0c1326',
    heroGlow: 'rgb(14 165 233 / 22%)',
    heroShadow: '0 22px 60px rgb(0 0 0 / 30%)',
    tagBg: 'rgba(255, 255, 255, 0.08)',
  },
  light: {
    page: '#eef2f7',
    pageText: '#0f172a',
    ink: '#0b1224',
    muted: '#3f4c63',
    subtle: '#0f172a',
    surfaceMuted: '#e2e8f0',
    surfaceSoft: '#f8fafc',
    warning: '#ef4444',
    danger: '#dc2626',
    success: '#16a34a',
    borderSoft: 'rgba(15, 23, 42, 0.18)',
    highlight: '#2563eb',
    panel: 'rgba(15, 23, 42, 0.08)',
    codeBg: '#0f172a',
    heroBg: '#e9f1ff',
    heroGlow: 'rgb(14 165 233 / 18%)',
    heroShadow: '0 14px 38px rgba(15, 23, 42, 0.18)',
    tagBg: 'rgba(15, 23, 42, 0.08)',
  },
}

export function getPalette(mode: ThemeKey): Palette {
  return palettes[mode]
}

export const palette = palettes.dark
