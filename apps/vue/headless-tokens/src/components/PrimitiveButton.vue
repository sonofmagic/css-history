<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed } from 'vue'

const button = cva('btn', {
  variants: {
    tone: {
      accent: 'btn--accent',
      ghost: 'btn--ghost',
      outline: 'btn--outline',
    },
    density: {
      comfy: 'btn--comfy',
      compact: 'btn--compact',
    },
  },
  defaultVariants: {
    tone: 'accent',
    density: 'comfy',
  },
})

interface Props {
  tone?: 'accent' | 'ghost' | 'outline'
  density?: 'comfy' | 'compact'
}

const props = defineProps<Props>()
const buttonClass = computed(() => button(props))
</script>

<template>
  <button :class="buttonClass" type="button">
    <slot />
  </button>
</template>

<style scoped>
/* stylelint-disable selector-class-pattern */
.btn {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--radius, 16px);
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.btn--comfy {
  padding: 10px 14px;
}

.btn--compact {
  padding: 8px 12px;
  font-size: 14px;
}

.btn--accent {
  color: color-mix(in srgb, var(--surface) 20%, white);
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 80%, white));
  border-color: color-mix(in srgb, var(--accent) 60%, transparent);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 40%, transparent);
}

.btn--outline {
  color: var(--accent);
  background: transparent;
  border-color: color-mix(in srgb, var(--accent) 60%, transparent);
}

.btn--ghost {
  color: var(--text);
  background: var(--surface-subtle);
  border-color: var(--border);
}

.btn:hover {
  transform: translateY(-2px);
}
</style>
