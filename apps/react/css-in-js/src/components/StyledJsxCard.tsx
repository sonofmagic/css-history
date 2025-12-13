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

      <style jsx>
        {`
          .jsx-card {
            display: grid;
            gap: 10px;
            padding: 16px;
            background: #0b1224;
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.12);
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
            color: #a855f7;
            background: rgb(168 85 247 / 12%);
            border: 1px solid rgb(168 85 247 / 32%);
            border-radius: 999px;
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
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: linear-gradient(135deg, #a855f7, #6366f1);
            color: #0b1224;
            cursor: pointer;
          }
          button.ghost {
            color: #e2e8f0;
            background: transparent;
          }
        `}
      </style>
    </section>
  )
}

export default StyledJsxCard
