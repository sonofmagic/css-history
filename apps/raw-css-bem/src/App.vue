<template>
  <main class="page">
    <header class="hero">
      <p class="card__eyebrow">2010 · Raw CSS / BEM / OOCSS</p>
      <h1 class="hero__title">零构建 + 语义命名</h1>
      <p class="hero__desc">
        全局 class 与 BEM 约定让样式体系非常直白，浏览器直读、学习曲线最低，但也意味着覆盖链条、命名冲突完全靠纪律。
      </p>
    </header>

    <section class="grid">
      <article class="card card--elevated">
        <p class="card__eyebrow">优势：简单、直读</p>
        <h2 class="card__title">BEM 结构一目了然</h2>
        <p class="card__desc">没有构建链，只靠 reset + 约定统一样式，便于快速拼出页面。</p>
        <ul class="card__list">
          <li>类名即语义：<code>card__title</code>、<code>btn--primary</code>。</li>
          <li>引入 <code>normalize.css</code> 后就能上线，适合落地页/静态站。</li>
          <li>新人加入零心智成本，任何人都能直接改全局样式。</li>
        </ul>
        <div>
          <button class="btn" type="button">全局按钮</button>
          <button class="btn btn--ghost" type="button">辅助按钮</button>
        </div>
      </article>

      <article class="card card--elevated bad-override">
        <p class="card__eyebrow">劣势：全局污染</p>
        <h2 class="card__title">覆盖链条难排查</h2>
        <p class="card__desc">同一颗 <code>.btn</code> 在不同文件里被改，审阅时只能凭肉眼追踪层级。</p>
        <div class="note">
          下方的“退出编辑”按钮本想做成淡灰色，但因为和左侧按钮共用 <code>.btn</code>，被全局规则强行染红。
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 12px;">
          <span style="font-weight: 600;">设置页</span>
          <button class="btn" type="button">退出编辑</button>
        </div>
        <p class="card__desc" style="margin-top: 10px;">
          这种“隐形耦合”正是 BEM 阶段的痛点：样式复用靠约定，一旦约定失效，全局修改会产生意想不到的副作用。
        </p>
      </article>
    </section>
  </main>
</template>
