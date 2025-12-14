import { palette } from '../styles/theme'

const tokens = {
  surface: '#0b1224',
  border: 'rgba(255, 255, 255, 0.12)',
  accent: palette.highlight,
  text: '#e2e8f0',
}

function StyledJsxCard() {
  return (
    <section className="jsx-card">
      <p className="pill">styled-jsx</p>
      <h3>作用域隔离的内联 CSS</h3>
      <p className="muted">Next.js 默认支持的方案，样式被编译成散列类名并自动作用于当前组件。</p>
      <div className="actions">
        <button type="button">Primary</button>
        <button className="ghost" type="button">
          Ghost
        </button>
      </div>
      <div className="meta">
        <span className="pill soft">零配置即作用域隔离</span>
        <span className="pill soft">SSR 注水：需收集样式</span>
      </div>

      <style jsx>
        {`
          .jsx-card {
            display: grid;
            gap: 10px;
            padding: 16px;
            background: ${tokens.surface};
            color: ${tokens.text};
            border: 1px solid ${tokens.border};
            border-radius: 14px;
            box-shadow: 0 14px 34px rgb(0 0 0 / 28%);
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            width: fit-content;
            padding: 4px 10px;
            font-size: 12px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: ${tokens.accent};
            background: rgb(168 85 247 / 12%);
            border: 1px solid rgb(168 85 247 / 32%);
            border-radius: 999px;
          }
          .pill.soft {
            color: #cbd5e1;
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
          }
          h3 {
            margin: 0;
          }
          .muted {
            margin: 0;
            color: #cbd5e1;
          }
          .actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          button {
            padding: 10px 12px;
            border-radius: 12px;
            font-weight: 600;
            border: 1px solid ${tokens.border};
            background: linear-gradient(135deg, ${tokens.accent}, #6366f1);
            color: #0b1224;
            cursor: pointer;
          }
          button.ghost {
            color: #e2e8f0;
            background: transparent;
          }
          .meta {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
        `}
      </style>
    </section>
  )
}

export default StyledJsxCard
