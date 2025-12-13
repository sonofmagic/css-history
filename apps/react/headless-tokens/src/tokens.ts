export type ThemeName = 'ocean' | 'sunset' | 'mono' | 'generative'

export interface TokenPack {
  name: ThemeName
  accent: string
  accentMuted: string
  surface: string
  surfaceSubtle: string
  text: string
  border: string
  radius: string
}

export const tokenPresets: TokenPack[] = [
  {
    name: 'ocean',
    accent: '#0ea5e9',
    accentMuted: 'rgba(14, 165, 233, 0.14)',
    surface: '#0b1224',
    surfaceSubtle: '#101935',
    text: '#e2e8f0',
    border: 'rgba(255, 255, 255, 0.12)',
    radius: '16px',
  },
  {
    name: 'sunset',
    accent: '#f97316',
    accentMuted: 'rgba(249, 115, 22, 0.12)',
    surface: '#fff7ed',
    surfaceSubtle: '#ffedd5',
    text: '#0f172a',
    border: '#fed7aa',
    radius: '18px',
  },
  {
    name: 'mono',
    accent: '#111827',
    accentMuted: 'rgba(17, 24, 39, 0.08)',
    surface: '#f8fafc',
    surfaceSubtle: '#e2e8f0',
    text: '#111827',
    border: '#cbd5e1',
    radius: '14px',
  },
]

export const generativeSuggestions: TokenPack[] = [
  {
    name: 'generative',
    accent: '#a855f7',
    accentMuted: 'rgba(168, 85, 247, 0.12)',
    surface: '#0f172a',
    surfaceSubtle: '#111827',
    text: '#f8fafc',
    border: 'rgba(255, 255, 255, 0.18)',
    radius: '20px',
  },
]
