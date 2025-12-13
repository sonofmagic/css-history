import { style } from '@vanilla-extract/css'

export const card = style({
  display: 'grid',
  gap: '10px',
  padding: '16px',
  color: '#0f172a',
  background: 'linear-gradient(135deg, #fdf2f8, #f1f5f9)',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  boxShadow: '0 14px 30px rgb(236 72 153 / 12%)',
})

export const pill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  width: 'fit-content',
  padding: '4px 10px',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#ec4899',
  background: 'rgb(236 72 153 / 12%)',
  border: '1px solid rgb(236 72 153 / 32%)',
  borderRadius: '999px',
})

export const title = style({
  margin: 0,
})

export const desc = style({
  margin: 0,
  color: '#475569',
})

export const badgeRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 10px',
  fontSize: '12px',
  color: '#ec4899',
  background: 'rgb(236 72 153 / 14%)',
  border: '1px solid rgb(236 72 153 / 32%)',
  borderRadius: '12px',
})
