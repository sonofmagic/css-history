<script setup lang="ts">
import { useCssModule } from 'vue'
import ScopedCard from './components/ScopedCard.vue'

const modulePoints = [
  '编译期生成哈希类名，默认隔离作用域',
  '可以组合：局部类 + props 决定组件状态',
  'Card 样式随组件走，发布 npm 也不怕污染宿主',
]

const drawbacks = [
  '跨组件复用要抽 hooks 或 shared 样式文件',
  '设计 token 不在 CSS Modules 里，需要额外抽离',
  '类名哈希后可读性下降，调试需借助 source map',
]

const inlineStyles = useCssModule('inline')
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">2015 · CSS Modules 阶段</p>
      <h1 class="hero-title">类名编译哈希化，作用域终于隔离</h1>
      <p class="hero-desc">
        CSS Modules 把样式与组件绑定，<code>card__title</code> 会编译成哈希，避免全局污染；同时也让跨组件的 token/主题需要新的抽象层。
      </p>
    </section>

    <section class="grid">
      <ScopedCard
        eyebrow="优势：隔离"
        title="类名本地化，组件可发布"
        :points="modulePoints"
      >
        <p class="chip">card__title → card__title___3z5s8</p>
        <p class="tiny">（示例哈希，提醒调试时要看 source map）</p>
      </ScopedCard>

      <ScopedCard
        eyebrow="弊端：跨组件难复用"
        title="tokens/主题需额外管线"
        :points="drawbacks"
        :elevated="false"
      >
        <div class="note">
          <strong>例子：</strong> 设计团队调了品牌色，组件内的 <code>--brand</code> 变量并不知道；需要在构建层把 tokens 注入，或另建全局变量文件。
        </div>
      </ScopedCard>
    </section>

    <section :class="inlineStyles.card">
      <div :class="inlineStyles.badge">SFC &lt;style module&gt;</div>
      <h2 :class="inlineStyles.title">在单文件里直接使用 $style</h2>
      <p :class="inlineStyles.desc">
        Vue SFC 的 <code>&lt;style module&gt;</code> 会把类名编译成哈希并注入当前组件，模板里通过 <code>$style</code> 或
        <code>useCssModule</code> 引用，避免全局污染。
      </p>
      <ul :class="inlineStyles.list">
        <li>无需单独 .module.css，局部示例可内联。</li>
        <li>类名依旧本地化，避免与外部冲突。</li>
        <li>适合 demo/小片段，减少额外文件拆分。</li>
      </ul>
      <div :class="inlineStyles.actions">
        <button :class="inlineStyles.button" type="button">模块化按钮</button>
        <span :class="inlineStyles.muted">真实类名：{{ inlineStyles.button }}</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  margin: 0;
  color: #e2e8f0;
  background: rgb(255 255 255 / 8%);
  border: 1px dashed rgb(255 255 255 / 20%);
  border-radius: 999px;
}

.tiny {
  margin: 6px 0 0;
  font-size: 12px;
  color: #94a3b8;
}

.note {
  padding: 10px 12px;
  margin: 0;
  color: #f9a8d4;
  background: rgb(244 114 182 / 8%);
  border: 1px solid rgb(244 114 182 / 30%);
  border-radius: 12px;
}
</style>

<style module="inline">
.card {
  display: grid;
  gap: 10px;
  padding: 18px;
  color: #0f172a;
  background: linear-gradient(145deg, #e2e8f0, #fff);
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  box-shadow: 0 14px 34px rgb(255 255 255 / 14%);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  font-size: 12px;
  color: #0ea5e9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgb(14 165 233 / 10%);
  border: 1px solid rgb(14 165 233 / 40%);
  border-radius: 999px;
}

.title {
  margin: 0;
  font-size: 20px;
}

.desc {
  margin: 0;
  color: #475569;
}

.list {
  display: grid;
  gap: 6px;
  padding-left: 18px;
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.button {
  padding: 10px 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  border: 1px solid rgb(14 165 233 / 60%);
  border-radius: 12px;
}

.muted {
  font-size: 12px;
  color: #64748b;
}
</style>
