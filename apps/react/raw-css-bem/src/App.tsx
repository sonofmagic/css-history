function App() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero__meta">
          <span className="pill">2010 · Raw CSS / BEM / OOCSS</span>
          <span className="pill pill--outline">无构建 · 语义 class</span>
        </div>
        <h1 className="hero__title">零构建 + 语义命名</h1>
        <p className="hero__desc">
          全局 class 与 BEM 约定让样式体系非常直白，浏览器直读、学习曲线最低；但覆盖链条、命名冲突也完全靠自觉与注释维护。
        </p>
        <div className="hero__actions">
          <button className="btn" type="button">
            写完即上线
          </button>
          <button className="btn btn--ghost" type="button">
            团队靠约定自觉
          </button>
        </div>
      </header>

      <section className="grid grid--two">
        <article className="card card--elevated">
          <p className="eyebrow">优势：简单、直读</p>
          <h2 className="card__title">BEM 结构一目了然</h2>
          <p className="card__desc">没有构建链，只靠 reset + 约定统一样式，便于快速拼出页面。</p>
          <ul className="card__list">
            <li>
              类名即语义：
              <code>card__title</code>
              、
              <code>btn--ghost</code>
              。
            </li>
            <li>
              引入
              <code>normalize.css</code>
              {' '}
              后就能上线，适合落地页/静态站。
            </li>
            <li>新人加入零心智成本，任何人都能直接改全局样式。</li>
          </ul>
          <div className="chip-row">
            <span className="pill">样式 = class</span>
            <span className="pill pill--outline">约束靠命名</span>
            <span className="pill pill--outline">不需要构建</span>
          </div>
        </article>

        <article className="card card--elevated bad-override">
          <p className="eyebrow">劣势：全局污染</p>
          <h2 className="card__title">覆盖链条难排查</h2>
          <p className="card__desc">
            同一颗
            <code>.btn</code>
            {' '}
            在不同文件里被改，审阅时只能凭肉眼追踪层级。
          </p>
          <div className="note">
            下方的“退出编辑”按钮本想做成淡灰色，但因为和左侧按钮共用
            {' '}
            <code>.btn</code>
            ，被全局规则强行染红。
          </div>
          <div className="toolbar">
            <span className="toolbar__label">设置页</span>
            <button className="btn" type="button">
              退出编辑
            </button>
          </div>
          <p className="card__desc">
            这种“隐形耦合”正是 BEM 阶段的痛点：样式复用靠约定，一旦约定失效，全局修改会产生意想不到的副作用。
          </p>
        </article>
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">工程化拆分</p>
          <h2 className="section__title">文件分层，但作用域依旧全局</h2>
          <p className="section__desc">
            无构建时代只能靠人工拆分：把色板、布局、组件、覆盖分别落在不同 CSS 文件，团队通过约定维持秩序。
          </p>
        </div>
        <div className="stack">
          <div className="stack__column">
            <h3 className="stack__title">基础层</h3>
            <ul className="stack__list">
              <li>
                <code>tokens.css</code>
                ：定义色板、圆角、阴影变量。
              </li>
              <li>
                <code>base.css</code>
                ：引入 reset，设置背景/字体。
              </li>
              <li>
                <code>layout.css</code>
                ：页面网格、section 间距。
              </li>
            </ul>
          </div>
          <div className="stack__column stack__column--muted">
            <h3 className="stack__title">组件 + 场景</h3>
            <ul className="stack__list">
              <li>
                <code>components.css</code>
                ：hero、card、pill、按钮状态。
              </li>
              <li>
                <code>overrides.css</code>
                ：场景化覆盖、坏味道示例。
              </li>
              <li>顺序全靠 import，冲突靠 Code Review 把关。</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section style-guide">
        <div className="section__header">
          <p className="eyebrow">命名规范</p>
          <h2 className="section__title">BEM 片段示例</h2>
          <p className="section__desc">block / element / modifier 必须人工守护，缺少 lint 或自动化校验。</p>
        </div>
        <div className="style-guide__grid">
          <div className="style-guide__block">
            <p className="style-guide__label">Block</p>
            <div className="style-guide__chips">
              <span className="style-guide__chip">hero</span>
              <span className="style-guide__chip">card</span>
              <span className="style-guide__chip">toolbar</span>
            </div>
          </div>
          <div className="style-guide__block">
            <p className="style-guide__label">Element</p>
            <div className="style-guide__chips">
              <span className="style-guide__chip">card__title</span>
              <span className="style-guide__chip">hero__actions</span>
              <span className="style-guide__chip">stack__list</span>
            </div>
          </div>
          <div className="style-guide__block">
            <p className="style-guide__label">Modifier</p>
            <div className="style-guide__chips">
              <span className="style-guide__chip">card--elevated</span>
              <span className="style-guide__chip">btn--ghost</span>
              <span className="style-guide__chip">grid--two</span>
            </div>
          </div>
        </div>
        <p className="note note--warning">
          命名再语义，仍然是全局作用域；当页面越来越大，覆盖顺序、选择器权重都会成为“约定式工程化”的地雷。
        </p>
      </section>
    </main>
  )
}

export default App
