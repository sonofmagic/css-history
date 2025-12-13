<script setup lang="ts">
import { computed, ref } from 'vue'

const approvedCombo = 'bg-white text-slate-900 p-6 rounded-lg shadow-lg space-y-3'
const badgeList = ['JIT 摇树', 'class = style', '设计 token 对齐', '多端复用']

const uncontrolled = ref(
  'p-6 px-4 py-3 text-white bg-slate-900 shadow-lg border border-slate-800 rounded-lg text-sm font-semibold tracking-wide hover:translate-y-[-2px] hover:shadow-xl transition my-custom-class yet-another-class',
)

const uncontrolledPreview = computed(() => uncontrolled.value.split(' ').filter(Boolean).length)
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="tagline">2020 · Utility-first / Tailwind / UnoCSS</p>
      <h1>原子类：类名即样式，组合出界面</h1>
      <p>
        把样式拆成可组合的原子，JIT 扫描将未用类摇掉，团队只需记住有限的命名体系；但约束一旦放松，class soup 也会迅速出现。
      </p>
    </section>

    <section class="grid-auto">
      <article :class="approvedCombo">
        <div class="flex items-center gap-3">
          <span class="badge bg-slate-900 text-white">优势</span>
          <p class="text-xs uppercase tracking-wide text-slate-700">class = style</p>
        </div>
        <h2 class="text-lg font-semibold">原子类拼装卡片</h2>
        <p class="text-slate-700">无需跳转到样式文件，类名直接揭示视觉效果，且未被使用的类不会出现在构建产物。</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="item in badgeList" :key="item" class="badge bg-gradient-brand text-white border-0">{{ item }}</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button class="bg-slate-900 text-white rounded-full px-4 py-2 inline-flex items-center gap-2 shadow-md hover:shadow-lg transition" type="button">
            快速交付
          </button>
          <button class="bg-slate-100 text-slate-900 rounded-full px-4 py-2 inline-flex items-center gap-2 border border-slate-800 hover:translate-y-[-2px] transition" type="button">
            tokens/variants 对齐
          </button>
        </div>
      </article>

      <article class="bg-slate-900 border border-dashed border-slate-800 p-6 rounded-lg shadow-md space-y-3">
        <div class="flex items-center gap-3">
          <span class="badge bg-white text-slate-900">弊端</span>
          <p class="text-xs uppercase tracking-wide text-slate-100">class soup</p>
        </div>
        <h2 class="text-lg font-semibold text-white">约束缺失时，类名会失控</h2>
        <p class="text-slate-100">
          当动态拼接 class 或缺少推荐组合时，class 串会越来越长，审查和代码评审都困难。
        </p>
        <textarea
          v-model="uncontrolled"
          class="w-full bg-slate-800 text-slate-100 rounded-lg border border-slate-700 p-3"
          rows="3"
        />
        <p class="text-slate-100 text-sm">
          这段 class 一共有 {{ uncontrolledPreview }} 个 token —— 没有 <code>cva</code>/<code>variants</code> 约束，很难知道哪些组合被允许。
        </p>
        <div :class="uncontrolled">
          视觉可用，但规范缺席：维护者只能凭经验判断是否合规。
        </div>
      </article>
    </section>
  </main>
</template>
