import type { ThemeKey } from './theme'
import { css } from '@emotion/css'
import { getPalette, themes } from './theme'

export function makeHeroShell(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    display: grid;
    gap: 12px;
    padding: 24px;
    background: radial-gradient(circle at 16% 20%, ${palette.heroGlow}, transparent 34%), ${palette.heroBg};
    border: 1px solid ${palette.borderSoft};
    border-radius: 18px;
    box-shadow: ${palette.heroShadow};
    color: ${themes[mode].text};
  `
}

export function makePill(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    display: inline-flex;
    gap: 6px;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid ${palette.borderSoft};
    color: ${palette.subtle};
    background: ${palette.tagBg};
  `
}

export function makePillAccent(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    color: ${mode === 'dark' ? themes[mode].text : palette.ink};
    border-color: color-mix(in srgb, ${themes[mode].accent} 48%, transparent);
    background: color-mix(in srgb, ${themes[mode].accent} ${mode === 'dark' ? '28%' : '18%'}, transparent);
  `
}

export function makePillGhost(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    color: ${palette.subtle};
    border-color: ${palette.borderSoft};
    background: transparent;
  `
}

export function makeRuntimeNote(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    font-size: 12px;
    color: ${palette.muted};
    margin-top: 8px;
    word-break: break-all;
  `
}

export function makeWarningBox(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    border: 1px dashed ${mode === 'dark' ? 'rgba(248, 113, 113, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
    background: ${mode === 'dark' ? 'rgba(248, 113, 113, 0.08)' : 'rgba(239, 68, 68, 0.1)'};
    color: ${palette.warning};
  `
}

export const gridTwo = css`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`

export const featureGrid = css`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`

export const metaRow = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`

export function makeMetricRow(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid ${palette.borderSoft};
    background: ${palette.panel};
  `
}

export function makeMetricLabel(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    display: grid;
    gap: 2px;
    font-size: 14px;
    color: ${palette.subtle};
  `
}

export function makeMetricValue(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    font-weight: 700;
    color: ${palette.highlight};
  `
}

export function makeNote(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${palette.borderSoft};
    background: ${palette.panel};
    color: ${palette.subtle};
  `
}

export function makeCodeBox(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    padding: 10px;
    font-family: ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    font-size: 13px;
    color: #e5e7eb;
    background: ${palette.codeBg};
    border-radius: 10px;
    border: 1px solid ${palette.borderSoft};
  `
}

export const sectionHeading = css`
  display: grid;
  gap: 4px;
`

export function makeCardClass(mode: ThemeKey) {
  return css`
    display: grid;
    gap: 10px;
    padding: 18px;
    background: ${themes[mode].surface};
    border: 1px solid ${themes[mode].border};
    color: ${themes[mode].text};
    border-radius: 18px;
    box-shadow: ${themes[mode].shadow};
    transition: transform 150ms ease, box-shadow 150ms ease;

    &:hover {
      transform: translateY(-2px);
    }
  `
}

export function makeButtonClass(mode: ThemeKey, animated: boolean) {
  return css`
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid ${animated ? themes[mode].accent : themes[mode].border};
    color: ${mode === 'dark' ? '#0b1224' : '#f8fafc'};
    background: linear-gradient(135deg, ${themes[mode].accent}, ${mode === 'dark' ? themes[mode].accent : '#0284c7'});
    box-shadow: 0 12px 30px rgba(14, 165, 233, 0.4);
    cursor: pointer;
    transition: transform 140ms ease, box-shadow 140ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px rgba(14, 165, 233, 0.44);
    }
  `
}

export const ribbon = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #0b1224;
  background: linear-gradient(120deg, #c7d2fe, #a855f7);
  border-radius: 8px;
  border: 1px solid rgb(168 85 247 / 40%);
  width: fit-content;
`

export function makeTag(mode: ThemeKey) {
  const palette = getPalette(mode)
  return css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    font-size: 12px;
    color: ${palette.subtle};
    background: ${palette.tagBg};
    border: 1px dashed ${palette.borderSoft};
    border-radius: 999px;
  `
}
