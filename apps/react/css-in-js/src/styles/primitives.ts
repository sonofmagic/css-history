import type { ThemeKey } from './theme'
import { css } from '@emotion/css'
import { palette, themes } from './theme'

export const heroShell = css`
  display: grid;
  gap: 12px;
  padding: 24px;
  background: radial-gradient(circle at 16% 20%, rgb(14 165 233 / 16%), transparent 34%), #0b1224;
  border: 1px solid ${palette.borderSoft};
  border-radius: 18px;
  box-shadow: 0 22px 60px rgb(0 0 0 / 30%);
`

export const pill = css`
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
  background: rgba(148, 163, 184, 0.12);
`

export const pillAccent = css`
  color: ${palette.ink};
  border-color: rgb(125 211 252 / 40%);
  background: rgb(14 165 233 / 16%);
`

export const pillGhost = css`
  color: ${palette.subtle};
  border-color: ${palette.borderSoft};
  background: transparent;
`

export const runtimeNote = css`
  font-size: 12px;
  color: ${palette.muted};
  margin-top: 8px;
  word-break: break-all;
`

export const warningBox = css`
  border: 1px dashed rgba(248, 113, 113, 0.6);
  background: rgba(248, 113, 113, 0.08);
  color: ${palette.warning};
`

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

export const metricRow = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid ${palette.borderSoft};
  background: rgba(255, 255, 255, 0.02);
`

export const metricLabel = css`
  display: grid;
  gap: 2px;
  font-size: 14px;
  color: ${palette.subtle};
`

export const metricValue = css`
  font-weight: 700;
  color: ${palette.highlight};
`

export const note = css`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${palette.borderSoft};
  background: rgba(255, 255, 255, 0.02);
  color: ${palette.subtle};
`

export const codeBox = css`
  padding: 10px;
  font-family: ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 13px;
  color: #e5e7eb;
  background: #0f172a;
  border-radius: 10px;
  border: 1px solid ${palette.borderSoft};
`

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

export const tag = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: ${palette.subtle};
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed ${palette.borderSoft};
  border-radius: 999px;
`
