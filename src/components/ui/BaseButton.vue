<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: Boolean,
  block: Boolean,
  iconLeft: { type: String, default: '' },
  iconRight: { type: String, default: '' },
})

const tag = computed(() => {
  if (props.disabled && (props.to || props.href)) return 'button'
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const variants = {
  primary:
    'grad-primary text-ink shadow-[0_12px_26px_-14px_rgba(23,43,70,0.5)] hover:brightness-[1.04] active:brightness-[0.98]',
  dark: 'bg-navy-dark text-white hover:bg-navy',
  navy: 'bg-navy text-white hover:bg-navy-dark',
  outline: 'border border-line bg-white text-ink hover:border-gold-deep/60 hover:bg-background',
  ghost: 'text-ink hover:bg-surface-alt',
  soft: 'bg-surface-alt text-ink hover:bg-line',
  danger: 'bg-danger-soft text-danger hover:bg-danger/10',
}

const sizes = {
  xs: 'px-3 py-1.5 text-[12px] gap-1.5',
  sm: 'px-3.5 py-2 text-[13px] gap-1.5',
  md: 'px-4.5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-[15px] gap-2.5',
}

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-xl font-medium whitespace-nowrap select-none',
  'transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40',
  variants[props.variant] || variants.primary,
  sizes[props.size] || sizes.md,
  props.block ? 'w-full' : '',
])
</script>

<template>
  <component
    :is="tag"
    :to="disabled ? undefined : to || undefined"
    :href="disabled ? undefined : href || undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    :class="classes"
  >
    <AppIcon v-if="iconLeft" :name="iconLeft" :size="17" />
    <slot />
    <AppIcon v-if="iconRight" :name="iconRight" :size="17" />
  </component>
</template>
