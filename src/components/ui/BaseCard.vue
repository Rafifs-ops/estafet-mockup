<script setup>
import { computed } from 'vue'

const props = defineProps({
  pad: { type: String, default: 'md' },
  tone: { type: String, default: 'surface' },
  bordered: { type: Boolean, default: true },
})

const pads = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

const tones = {
  surface: 'bg-surface text-body',
  background: 'bg-background text-body',
  navy: 'bg-navy-soft text-body',
  dark: 'grad-dark text-white/80',
}

const classes = computed(() => [
  'rounded-3xl',
  props.tone === 'dark' ? '' : 'shadow-[var(--shadow-card)]',
  props.bordered ? 'border' : '',
  props.bordered && props.tone !== 'dark' ? 'border-line' : '',
  props.bordered && props.tone === 'dark' ? 'border-navy-dark' : '',
  tones[props.tone] || tones.surface,
  pads[props.pad] ?? pads.md,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
