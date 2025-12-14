function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__meta">
          <span className="pill pill--brand">2013 · 预处理器 (Sass/Less/PostCSS)</span>
          <span className="pill pill--ghost">变量 / 混入 / 函数</span>
          <span className="pill pill--ghost">依旧是全局作用域</span>
        </div>
        <h1>变量、混入、函数把样式脚本化</h1>
        <p className="hero__desc">
          Sass 让 BEM 时代的全局样式有了变量与复用能力，但作用域依旧是全局：能带来统一色板，也容易走向“嵌套地狱”。
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button">
            一处改色，处处生效
          </button>
          <button className="btn btn--ghost" type="button">
            嵌套选择器仍在泄漏
          </button>
        </div>
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

      <section className="section">
        <header className="section__header">
          <p className="eyebrow">工程化拆分</p>
          <h2>把 Sass 拆成 tokens / mixins / modules</h2>
          <p className="muted">仍旧全局 CSS，但靠文件分层、约定的 import 顺序来降低混乱。</p>
        </header>
        <div className="token-grid">
          <div className="token-chip token-chip--brand">
            <p className="token-chip__name">$color-brand</p>
            <p className="token-chip__desc">色板集中定义，方便一键换肤。</p>
          </div>
          <div className="token-chip token-chip--muted">
            <p className="token-chip__name">@mixin surface</p>
            <p className="token-chip__desc">面板统一边框/阴影，所有卡片共用。</p>
          </div>
          <div className="token-chip token-chip--danger">
            <p className="token-chip__name">@mixin deep-nesting-demo</p>
            <p className="token-chip__desc">嵌套链条一旦输出，即成为全局锁死。</p>
          </div>
        </div>
      </section>

      <section className="section flow">
        <header className="section__header">
          <p className="eyebrow">典型流水线</p>
          <h2>预处理器时代的“工程化”</h2>
          <p className="muted">没有模块隔离，只能通过拆文件 + 约定的 mixin 使用顺序降低风险。</p>
        </header>
        <div className="flow__steps">
          <div className="flow__step">
            <div className="flow__badge">1</div>
            <div>
              <h3>定义 tokens</h3>
              <p className="muted">
                色板、阴影、radius 写进
                {' '}
                <code>_tokens.scss</code>
                。
              </p>
            </div>
          </div>
          <div className="flow__step">
            <div className="flow__badge">2</div>
            <div>
              <h3>封装 mixins</h3>
              <p className="muted">按钮、面板等抽成 mixin，避免重复。</p>
            </div>
          </div>
          <div className="flow__step">
            <div className="flow__badge">3</div>
            <div>
              <h3>再写页面</h3>
              <p className="muted">按约定 import，祈祷没有全局覆盖冲突。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
