<script setup lang="ts">
import styles from './scoped-card.module.css'

defineProps<{
  title: string
  eyebrow: string
  points: string[]
  note?: string
  elevated?: boolean
}>()
</script>

<template>
  <section :class="[styles.card, elevated !== false && styles.elevated]">
    <p :class="styles.eyebrow">{{ eyebrow }}</p>
    <h2 :class="styles.title">{{ title }}</h2>
    <ul :class="styles.list">
      <li v-for="item in points" :key="item">{{ item }}</li>
    </ul>
    <p v-if="note" :class="styles.note">{{ note }}</p>
    <slot />
  </section>
</template>
