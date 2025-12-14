<script setup lang="ts">
import { cx } from '@emotion/css'
import { computed, ref } from 'vue'
import {
  codeBox,
  featureGrid,
  gridTwo,
  heroShell,
  makeButtonClass,
  makeCardClass,
  metaRow,
  metricLabel,
  metricRow,
  metricValue,
  note,
  pill,
  pillAccent,
  pillGhost,
  ribbon,
  runtimeNote,
  sectionHeading,
  tag,
  warningBox,
} from './styles/primitives'
import { type ThemeKey, palette, themes } from './styles/theme'

const mode = ref<ThemeKey>('dark')
const animatedBorder = ref(true)
const hydrationSize = ref(62)

const cardClass = computed(() => makeCardClass(mode.value))
const btn = computed(() => makeButtonClass(mode.value, animatedBorder.value))

const modeLabel = computed(() => (mode.value === 'dark' ? '暗色运行时主题' : '亮色运行时主题'))
const classSize = computed(() => btn.value.length + cardClass.value.length)

const runtimeCosts = computed(() => [
  { label: 'SSR 注水', value: `${hydrationSize.value}KB`, desc: 'emotion cache + 已生成样式必须附带到 HTML' },
  { label: '哈希类名', value: 'devtools 依赖 source map', desc: '覆盖链需要 Debug 视图辅助' },
  { label: 'HMR/缓存', value: '需要 emotion cache 复用', desc: '否则 style 标签会频繁增删' },
])

const pipeline = [
  '定义 theme tokens（颜色/阴影） -> props 读取。',
  '为组件暴露变体 props，拆出 shared hooks 生成 className。',
  '生产模式使用 babel 插件/提取 Critical CSS，减少注水。',
]

const dxSignals = [
  { label: '类型提示', value: 'css prop / styled 具备 TS 提示' },
  { label: 'Tree Shaking', value: '依赖 babel 插件（@emotion/babel-plugin）' },
  { label: '缓存策略', value: 'Emotion cache key 需与 SSR 对齐' },
]
</script>

<template>
  <main class="page">
    <header :class="heroShell">
      <div :class="metaRow">
        <span :class="cx(pill, pillAccent)">2017 · CSS-in-JS (Emotion/SC)</span>
        <span :class="cx(pill, pillGhost)">组件隔离</span>
        <span :class="cx(pill, pillGhost)">props 驱动样式</span>
      </div>
      <h1 style="margin: 0; font-size: 30px;">组件边界天然隔离，主题/状态直连样式</h1>
      <p :style="{ margin: 0, color: palette.subtle }">
        Emotion 运行时生成 class 并注入 <code>&lt;style&gt;</code>，主题切换与 props 状态天然绑定；同时要关注 SSR 注水、缓存与 devtools 可读性。
      </p>
      <div :class="metaRow">
        <button :class="btn" type="button" @click="mode = mode === 'dark' ? 'light' : 'dark'">
          切换为 {{ mode === 'dark' ? '亮色' : '暗色' }}
        </button>
        <label :class="tag">
          <input v-model="animatedBorder" type="checkbox" />
          props 决定边框/阴影
        </label>
        <label :class="tag">
          <input v-model="hydrationSize" min="40" max="120" type="range" />
          注水体积（KB）
        </label>
      </div>
      <p :class="runtimeNote">
        当前主题：{{ modeLabel }}；生成的 class 长度 ~{{ classSize }} 字符；SSR 注水体积 ~{{ hydrationSize }}KB。
      </p>
    </header>

    <div :class="gridTwo">
      <section :class="cardClass">
        <div :class="cx(pill, pillAccent)">
          <span class="icon">⚡️</span>
          动态主题（Emotion）
        </div>
        <div :class="sectionHeading">
          <h2 style="margin: 0;">用 props/状态驱动样式</h2>
          <p :style="{ color: palette.subtle, margin: 0 }">按钮、卡片、阴影都由响应式状态生成，组件边界即作用域。</p>
        </div>
        <div :class="metaRow">
          <button :class="btn" type="button" @click="mode = mode === 'dark' ? 'light' : 'dark'">
            切换为 {{ mode === 'dark' ? '亮色' : '暗色' }}
          </button>
          <span :class="tag">className 由 props 拼出</span>
          <span :class="tag">同组件支持多变体</span>
        </div>
        <div :class="note">
          <strong>工程化拆分：</strong>
          <ul style=" display: grid; gap: 4px;margin: 6px 0 0 16px; color: #cbd5e1;">
            <li v-for="item in pipeline" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div :class="codeBox">
          const button = css`padding: 10px; background: theme.accent;` →
          <span :style="{ color: themes[mode].accent }">className</span>
          随主题切换重新生成。
        </div>
      </section>

      <section :class="cx(cardClass, warningBox)">
        <div :class="pill">
          <span class="icon">⚠️</span>
          运行时成本
        </div>
        <h2 style="margin: 4px 0 0;">首屏注水 &amp; 可读性</h2>
        <div style="display: grid; gap: 8px;">
          <div v-for="item in runtimeCosts" :key="item.label" :class="metricRow">
            <div :class="metricLabel">
              <span>{{ item.label }}</span>
              <small style="color: #cbd5e1;">{{ item.desc }}</small>
            </div>
            <span :class="metricValue">{{ item.value }}</span>
          </div>
        </div>
        <p :class="runtimeNote">类名是哈希，排查覆盖链需要 devtools / 标记辅助。</p>
      </section>

      <section :class="cardClass">
        <div :class="ribbon">工程化拆分</div>
        <h2 style="margin: 6px 0 0;">主题、变体、生产优化</h2>
        <ul style=" display: grid; gap: 6px;margin: 8px 0 0 16px; color: #cbd5e1;">
          <li>ThemeProvider / emotion cache 注入，组件直接消费 tokens。</li>
          <li>变体通过 props + 条件 className，避开 BEM 样式冲突。</li>
          <li>生产模式开启 @emotion/babel-plugin，移除 dev 代码并抽离关键 CSS。</li>
        </ul>
        <p :class="runtimeNote">比 BEM 更隔离，但要为 SSR 注水与缓存策略设计好基建。</p>
      </section>

      <section :class="cardClass">
        <div :class="pill">DX 快照</div>
        <h2 style="margin: 4px 0 0;">类型/Tree Shaking/缓存</h2>
        <div style="display: grid; gap: 6px; margin-top: 6px;">
          <div v-for="signal in dxSignals" :key="signal.label" :class="metricRow">
            <div :class="metricLabel">
              <span>{{ signal.label }}</span>
              <small style="color: #cbd5e1;">{{ signal.value }}</small>
            </div>
            <span :class="metricValue">OK</span>
          </div>
        </div>
        <p :class="runtimeNote">Dev 提示与生产优化通常由 Babel/Vite 插件和 cache 配置兜底。</p>
      </section>
    </div>

    <section :class="cardClass">
      <div :class="sectionHeading">
        <h2 style="margin: 0;">更多 CSS-in-JS 侧重点</h2>
        <p :style="{ margin: 0, color: palette.subtle }">运行时/编译期的取舍不同：有的零运行时，有的强调原子化。</p>
      </div>
      <div :class="featureGrid">
        <div :class="note">
          <strong>styled-components：</strong>
          props → 样式分支，ThemeProvider 注入主题，SSR 需收集 style 标签。
        </div>
        <div :class="note">
          <strong>styled-jsx：</strong>
          Next.js 内置，编译成 scoped class；轻量，但仍有注水。
        </div>
        <div :class="note">
          <strong>stylex：</strong>
          编译期映射原子类，运行时极轻；语法接近 inline style。
        </div>
        <div :class="note">
          <strong>vanilla-extract：</strong>
          零运行时，构建期产出 CSS，具备类型提示，适合大规模 Design System。
        </div>
      </div>
    </section>
  </main>
</template>
