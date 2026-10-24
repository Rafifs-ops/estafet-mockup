<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' },
  icon: { type: String, default: '' },
  dot: Boolean,
})

const variants = {
  neutral: 'bg-surface-alt text-body border-line',
  navy: 'bg-navy-soft text-navy border-navy/15',
  success: 'bg-success-soft text-success border-success/20',
  warning: 'bg-warning-soft text-warning border-warning/20',
  danger: 'bg-danger-soft text-danger border-danger/15',
  gradient: 'grad-primary text-ink border-transparent',
  dark: 'bg-white/10 text-white border-white/15',
  outline: 'bg-white text-ink border-line',
}

const sizes = {
  sm: 'text-[10.5px] px-2 py-0.5 gap-1',
  md: 'text-[11.5px] px-2.5 py-1 gap-1.5',
  lg: 'text-[13px] px-3.5 py-1.5 gap-2',
}

const classes = computed(() => [
  'inline-flex items-center rounded-full border font-medium leading-tight',
  variants[props.variant] || variants.neutral,
  sizes[props.size] || sizes.md,
])
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="size-1.5 rounded-full bg-current" />
    <AppIcon v-if="icon" :name="icon" :size="13" />
    <slot />
  </span>
</template>
