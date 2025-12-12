<script setup lang="ts">
import { computed, ref } from 'vue'
import PrimitiveButton from './components/PrimitiveButton.vue'
import { generativeSuggestions, tokenPresets, type TokenPack } from './tokens'

const active = ref<TokenPack>(tokenPresets[0])
const nextAi = ref<Pick<TokenPack, 'accent' | 'accentMuted' | 'surface' | 'surfaceSubtle' | 'text' | 'border' | 'radius'> | null>(null)

const cssVars = computed(() => ({
  '--accent': active.value.accent,
  '--accent-muted': active.value.accentMuted,
  '--surface': active.value.surface,
  '--surface-subtle': active.value.surfaceSubtle,
  '--text': active.value.text,
  '--border': active.value.border,
  '--radius': active.value.radius,
}))

const pickTheme = (theme: TokenPack) => {
  active.value = theme
}

const sampleActions = ['tokens → variants → primitives', 'UI 与 API 解耦', '多 Runtime (Web/RSC/小程序) 共享']

const rollGenerative = () => {
  const suggestion = generativeSuggestions[Math.floor(Math.random() * generativeSuggestions.length)]
  nextAi.value = suggestion
  active.value = suggestion
}
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">2024 · tokens + headless 组件 + 生成式协作</p>
      <h1>样式抽象成 tokens，组件只负责逻辑</h1>
      <p class="hero-desc">
        Tokens 把颜色/间距抽象出样式方案之外，Headless 组件只暴露行为；设计师、AI 或脚本都可以替换 tokens，而 API 与交互保持稳定。
      </p>
    </section>

    <section class="grid">
      <article class="panel" :style="cssVars">
        <header class="panel__header">
          <span class="pill">tokens</span>
          <h2 class="panel__title">设计 token + headless primitives</h2>
          <p class="panel__desc">选择一个 token 包，下面的 Button/Panel 自动换肤，证明“样式可插拔、行为可复用”。</p>
        </header>
        <div class="theme-row">
          <span class="muted">主题：</span>
          <div class="theme-picker">
            <button
              v-for="theme in tokenPresets"
              :key="theme.name"
              :aria-pressed="theme.name === active.name"
              class="chip"
              type="button"
              @click="pickTheme(theme)"
            >
              {{ theme.name }}
            </button>
          </div>
        </div>
        <div class="actions">
          <PrimitiveButton tone="accent">Headless CTA</PrimitiveButton>
          <PrimitiveButton tone="outline">Outline</PrimitiveButton>
          <PrimitiveButton tone="ghost" density="compact">Ghost</PrimitiveButton>
        </div>
        <ul class="list">
          <li v-for="item in sampleActions" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="panel panel--muted" :style="cssVars">
        <header class="panel__header">
          <span class="pill pill--ghost">生成式 / 多 Runtime</span>
          <h2 class="panel__title">tokens 可被 AI / 脚本生成</h2>
          <p class="panel__desc">
            下一代方案会把 tokens 存在协议/JSON 中，AI 生成或脚本替换品牌即可，逻辑组件无需动刀；但也需要严格的白名单/评审链防止“风格漂移”。
          </p>
        </header>
        <div class="box">
          <p class="muted">生成式建议：</p>
          <p v-if="nextAi" class="muted">accent: {{ nextAi.accent }} · surface: {{ nextAi.surface }}</p>
          <p v-else class="muted">点击下方按钮让 AI 随机给一组 tokens。</p>
          <PrimitiveButton density="compact" tone="outline" @click="rollGenerative">AI 建议一组 tokens</PrimitiveButton>
        </div>
        <div class="box box--warn">
          <p class="muted">风险：需要约束 + 评审</p>
          <ul class="list">
            <li>tokens 变更需走校验（lint / design review）。</li>
            <li>Headless 组件要留可插拔插槽，避免强绑定品牌。</li>
            <li>跨 Web/RSC/小程序共享 tokens，避免 runtime 拼 class。</li>
          </ul>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
/* stylelint-disable selector-class-pattern */
.eyebrow {
  margin: 0;
  font-size: 12px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.panel {
  display: grid;
  gap: 12px;
  padding: 18px;
  color: var(--text, #0f172a);
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: var(--radius, 16px);
  box-shadow: 0 14px 32px rgb(15 23 42 / 8%);
}

.panel--muted {
  background: var(--surface-subtle, #f1f5f9);
}

.panel__header {
  display: grid;
  gap: 4px;
}

.panel__title {
  margin: 0;
  font-size: 20px;
}

.panel__desc {
  margin: 0;
  color: color-mix(in srgb, var(--text, #0f172a) 70%, transparent);
}

.pill {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--accent, #0ea5e9);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--accent-muted, rgb(14 165 233 / 14%));
  border: 1px solid color-mix(in srgb, var(--accent, #0ea5e9) 50%, transparent);
  border-radius: 999px;
}

.pill--ghost {
  background: color-mix(in srgb, var(--accent, #0ea5e9) 10%, transparent);
}

.theme-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.theme-picker {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 8px 12px;
  cursor: pointer;
  background: var(--surface-subtle, #f1f5f9);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
}

.chip[aria-pressed='true'] {
  background: var(--accent-muted, rgb(14 165 233 / 12%));
  border-color: var(--accent, #0ea5e9);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.list {
  display: grid;
  gap: 6px;
  padding-left: 18px;
  margin: 0;
  color: color-mix(in srgb, var(--text, #0f172a) 84%, transparent);
}

.muted {
  color: color-mix(in srgb, var(--text, #0f172a) 60%, transparent);
}

.box {
  display: grid;
  gap: 8px;
  padding: 12px;
  background: var(--surface, #fff);
  border: 1px dashed var(--border, #e2e8f0);
  border-radius: 14px;
}

.box--warn {
  background: color-mix(in srgb, var(--accent, #0ea5e9) 8%, transparent);
}
</style>
