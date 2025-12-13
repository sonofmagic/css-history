<script setup lang="ts">
import { css, cx } from '@emotion/css'
import { computed, ref } from 'vue'

const themes = {
  dark: {
    surface: 'linear-gradient(150deg, #0f172a, #0b1224 60%, #111827)',
    border: 'rgba(255, 255, 255, 0.12)',
    accent: '#7dd3fc',
    text: '#e5e7eb',
    shadow: '0 18px 44px rgba(0, 0, 0, 0.38)',
  },
  light: {
    surface: '#f8fafc',
    border: '#e2e8f0',
    accent: '#0ea5e9',
    text: '#0f172a',
    shadow: '0 20px 44px rgba(14, 165, 233, 0.18)',
  },
}

const mode = ref<keyof typeof themes>('dark')
const animatedBorder = ref(true)

const shell = css`
  display: grid;
  gap: 16px;
  padding: 20px;
  border-radius: 18px;
  transition: transform 150ms ease, box-shadow 150ms ease;
`

const pill = css`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const runtimeNote = css`
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
  word-break: break-all;
`

const cardClass = computed(() => css`
  ${shell};
  background: ${themes[mode.value].surface};
  border: 1px solid ${themes[mode.value].border};
  color: ${themes[mode.value].text};
  box-shadow: ${themes[mode.value].shadow};
`)

const btn = computed(() => css`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid ${animatedBorder.value ? themes[mode.value].accent : themes[mode.value].border};
  color: ${mode.value === 'dark' ? '#0b1224' : '#f8fafc'};
  background: linear-gradient(135deg, ${themes[mode.value].accent}, ${mode.value === 'dark' ? '#0ea5e9' : '#0284c7'});
  box-shadow: 0 12px 30px rgba(14, 165, 233, 0.4);
  cursor: pointer;
  transition: transform 140ms ease, box-shadow 140ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(14, 165, 233, 0.44);
  }
`)

const warning = css`
  border: 1px dashed rgba(248, 113, 113, 0.6);
  background: rgba(248, 113, 113, 0.08);
  color: #fecdd3;
`

const modeLabel = computed(() => (mode.value === 'dark' ? '暗色运行时主题' : '亮色运行时主题'))

const classSize = computed(() => btn.value.length + cardClass.value.length)
</script>

<template>
  <main class="page">
    <header style="display: grid; gap: 8px; margin-bottom: 12px;">
      <p style=" margin: 0;color: #94a3b8; letter-spacing: 0.08em;">2017 · CSS-in-JS (Emotion/SC)</p>
      <h1 style="margin: 0; font-size: 30px;">组件边界天然隔离，props 驱动样式</h1>
      <p style=" margin: 0;color: #cbd5e1;">
        Emotion 在运行时生成 class 并注入 <code>&lt;style&gt;</code>，主题切换与 props 状态天然绑定，但首屏注水、运行时性能需关注。
      </p>
    </header>

    <section :class="cardClass">
      <div :class="pill" style=" color: #7dd3fc;background: rgb(14 165 233 / 16%); border: 1px solid rgb(125 211 252 / 32%);">
        <span class="icon">⚡️</span>
        动态主题
      </div>
      <h2 style="margin: 4px 0 0;">用 props/状态驱动样式</h2>
      <p style="color: #cbd5e1;">按钮、卡片、阴影都由响应式状态生成，组件边界即作用域。</p>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
        <button :class="btn" type="button" @click="mode = mode === 'dark' ? 'light' : 'dark'">
          切换为 {{ mode === 'dark' ? '亮色' : '暗色' }}
        </button>
        <label style="display: inline-flex; gap: 6px; align-items: center;">
          <input v-model="animatedBorder" type="checkbox" />
          props 决定边框/阴影
        </label>
      </div>
      <p :class="runtimeNote">当前主题：{{ modeLabel }}；生成的 class 长度 ~{{ classSize }} 字符（首屏需注入同等长度的 style）。</p>
    </section>

    <section :class="cx(cardClass, warning)">
      <div :class="pill" style=" color: #fecdd3;background: rgb(248 113 113 / 14%); border: 1px solid rgb(248 113 113 / 40%);">
        <span class="icon">⚠️</span>
        运行时成本
      </div>
      <h2 style="margin: 4px 0 0;">首屏注水 &amp; 可读性</h2>
      <ul style=" display: grid; gap: 4px; margin: 6px 0 0 18px;color: #fecdd3;">
        <li>SSR 要把生成的样式注入 HTML，60KB 很常见。</li>
        <li>类名是哈希，排查覆盖链需要 devtools/标记。</li>
        <li>热更新有时需要 emotion cache，性能与缓存要监控。</li>
      </ul>
    </section>
  </main>
</template>
