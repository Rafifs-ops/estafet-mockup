<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  sub: { type: String, default: '' },
  icon: { type: String, default: 'trending-up' },
  tone: { type: String, default: 'background' },
})

const tones = {
  background: 'bg-gold-light text-navy-dark',
  navy: 'bg-navy-soft text-navy',
  success: 'bg-success-soft text-success',
  gradient: 'grad-primary text-ink',
}
</script>

<template>
  <div class="card-surface p-4 sm:p-5">
    <div class="flex items-start justify-between gap-2">
      <p class="label-xs">{{ label }}</p>
      <span class="grid size-8 shrink-0 place-items-center rounded-lg" :class="tones[tone] || tones.background">
        <AppIcon :name="icon" :size="16" />
      </span>
    </div>
    <p class="font-display mt-2 text-[28px] leading-none font-extrabold tracking-tight text-ink sm:text-[32px]">
      {{ value }}
    </p>
    <p v-if="sub" class="mt-1.5 text-[11px] leading-tight text-muted">{{ sub }}</p>
  </div>
</template>
