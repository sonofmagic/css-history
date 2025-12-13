function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">2013 · 预处理器 (Sass/Less/PostCSS)</p>
        <h1>变量、混入、函数把样式脚本化</h1>
        <p className="hero-desc">
          Sass 让 BEM 时代的全局样式有了变量与复用能力，但作用域依旧是全局：能带来统一色板，也容易走向“嵌套地狱”。
        </p>
      </section>

      <section className="grid">
        <article className="sass-card">
          <header className="card-header">
            <span className="pill pill--brand">能力</span>
            <p className="eyebrow">复用与体系化</p>
            <h2>变量/混入 = 低成本 tokens</h2>
            <p className="muted">
              色板、阴影、圆角集中在
              <code>_tokens.scss</code>
              ；混入让卡片/按钮在全局统一风格。
            </p>
          </header>
          <div className="callout success">
            <strong>好处：</strong>
            {' '}
            调整
            <code>$color-brand</code>
            {' '}
            立刻影响全局；混入像
            <code>@include surface</code>
            {' '}
            让 BEM 更快落地。
          </div>
          <div className="actions">
            <button className="btn btn--primary" type="button">
              一处改色，处处生效
            </button>
            <button className="btn btn--subtle" type="button">
              变量定义在 tokens
            </button>
          </div>
        </article>

        <article className="sass-card sass-card--muted">
          <header className="card-header">
            <span className="pill pill--danger">弊端</span>
            <p className="eyebrow">全局作用域 + 嵌套</p>
            <h2>嵌套地狱 &amp; 体积膨胀</h2>
            <p className="muted">虽然写起来像组件，但编译后仍是全局选择器，层级越深越难拆分。</p>
          </header>
          <div className="callout danger">
            <strong>隐患：</strong>
            {' '}
            下方的表单样式在全局展开为
            <code>.legacy-form .field label</code>
            {' '}
            这类长链，后续迁移到组件化需要手动拆分。
          </div>
          <div className="legacy-form">
            <div className="field">
              <label htmlFor="email">邮箱 (被全局选择器锁死)</label>
              <input id="email" placeholder="作用域仍是全局" />
            </div>
            <div className="field">
              <label htmlFor="cta">CTA 按钮</label>
              <button className="btn btn--ghost" id="cta" type="button">
                想要局部样式，却被全局继承
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
