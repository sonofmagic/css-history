<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">2013 · 预处理器 (Sass/Less/PostCSS)</p>
      <h1>变量、混入、函数把样式脚本化</h1>
      <p class="hero-desc">
        Sass 让 BEM 时代的全局样式有了变量与复用能力，但作用域依旧是全局：能带来统一色板，也容易走向“嵌套地狱”。
      </p>
    </section>

    <section class="grid">
      <article class="sass-card">
        <header class="card-header">
          <span class="pill pill--brand">能力</span>
          <p class="eyebrow">复用与体系化</p>
          <h2>变量/混入 = 低成本 tokens</h2>
          <p class="muted">色板、阴影、圆角集中在 <code>_tokens.scss</code>；混入让卡片/按钮在全局统一风格。</p>
        </header>
        <div class="callout success">
          <strong>好处：</strong> 调整 <code>$color-brand</code> 立刻影响全局；混入像 <code>@include surface</code> 让 BEM 更快落地。
        </div>
        <div class="actions">
          <button class="btn btn--primary" type="button">一处改色，处处生效</button>
          <button class="btn btn--subtle" type="button">变量定义在 tokens</button>
        </div>
      </article>

      <article class="sass-card sass-card--muted">
        <header class="card-header">
          <span class="pill pill--danger">弊端</span>
          <p class="eyebrow">全局作用域 + 嵌套</p>
          <h2>嵌套地狱 & 体积膨胀</h2>
          <p class="muted">虽然写起来像组件，但编译后仍是全局选择器，层级越深越难拆分。</p>
        </header>
        <div class="callout danger">
          <strong>隐患：</strong> 下方的表单样式在全局展开为 <code>.legacy-form .field label</code> 这类长链，后续迁移到组件化需要手动拆分。
        </div>
        <div class="legacy-form">
          <div class="field">
            <label for="email">邮箱 (被全局选择器锁死)</label>
            <input id="email" placeholder="作用域仍是全局" />
          </div>
          <div class="field">
            <label for="cta">CTA 按钮</label>
            <button class="btn btn--ghost" id="cta" type="button">想要局部样式，却被全局继承</button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style lang="scss">
/* stylelint-disable selector-class-pattern, scss/no-global-function-names */
@use './styles/tokens' as *;
@use './styles/mixins' as *;

.eyebrow {
  margin: 0;
  font-size: 12px;
  color: $color-muted;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pill {
  @include text-pill($color-highlight);

  &--brand {
    @include text-pill($color-brand);
  }

  &--danger {
    @include text-pill($color-danger);
  }
}

.sass-card {
  @include surface('default');

  display: grid;
  gap: 12px;
  padding: $padding-card;

  &--muted {
    background: $color-surface-subtle;
  }
}

.card-header {
  display: grid;
  gap: 4px;
}

h2 {
  margin: 0;
  font-size: 20px;
}

.muted {
  color: $color-muted;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: $radius-md;
  transition: transform 140ms ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.btn--primary {
  color: #fff;
  background: linear-gradient(135deg, $color-brand, $color-highlight);
  box-shadow: 0 10px 24px rgb(124 58 237 / 28%);
}

.btn--subtle {
  color: #e2e8f0;
  background: rgb(148 163 184 / 12%);
  border-color: rgb(255 255 255 / 8%);
}

.btn--ghost {
  color: #e2e8f0;
  background: transparent;
  border-color: $color-border;
}

.callout {
  padding: 12px 14px;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: $radius-md;

  &.success {
    color: lighten($color-success, 18%);
    background: rgba($color-success, 0.1);
  }

  &.danger {
    color: lighten($color-danger, 20%);
    background: rgba($color-danger, 0.08);
  }
}

@include deep-nesting-demo;
</style>
