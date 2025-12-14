import styled from 'styled-components'
import { palette } from '../styles/theme'

const Card = styled.section`
  display: grid;
  gap: 10px;
  padding: 16px;
  color: ${palette.ink};
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgb(15 23 42 / 10%);
`

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 10px;
  font-size: 12px;
  color: #2563eb;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgb(37 99 235 / 10%);
  border: 1px solid rgb(37 99 235 / 36%);
  border-radius: 999px;
`

interface ButtonVariantProps {
  $variant?: 'solid' | 'ghost'
}

const Button = styled.button<ButtonVariantProps>`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid transparent;
  color: ${({ $variant }: ButtonVariantProps) => ($variant === 'ghost' ? '#0f172a' : '#fff')};
  background: ${({ $variant }: ButtonVariantProps) =>
    $variant === 'ghost' ? 'transparent' : 'linear-gradient(135deg, #2563eb, #3b82f6)'};
  border-color: ${({ $variant }: ButtonVariantProps) =>
    $variant === 'ghost' ? '#cbd5e1' : 'color-mix(in srgb, #2563eb 40%, transparent)'};
  box-shadow: ${({ $variant }: ButtonVariantProps) =>
    $variant === 'ghost' ? 'none' : '0 10px 26px rgb(59 130 246 / 26%)'};
  transition: transform 140ms ease, box-shadow 140ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }: ButtonVariantProps) =>
      $variant === 'ghost' ? '0 10px 22px rgb(15 23 42 / 8%)' : '0 12px 30px rgb(59 130 246 / 30%)'};
  }
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Meta = styled.span`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;
  color: #475569;
  background: #f1f5f9;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;
`

export function StyledComponentsCard() {
  return (
    <Card>
      <Tag>styled-components</Tag>
      <h3 style={{ margin: 0 }}>以组件为单位的 CSS runtime</h3>
      <p style={{ margin: 0, color: '#475569' }}>
        通过模板字符串定义 styled 组件，props 直接参与样式分支；主题/变体放在同一组件内，易于封装 Design System。
      </p>
      <MetaRow>
        <Meta>ThemeProvider 注入 tokens</Meta>
        <Meta>props → 变体 class</Meta>
        <Meta>SSR 需收集 style 标签</Meta>
      </MetaRow>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button type="button">Solid CTA</Button>
        <Button $variant="ghost" type="button">
          Ghost CTA
        </Button>
      </div>
    </Card>
  )
}

export default StyledComponentsCard
