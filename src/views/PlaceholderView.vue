<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  title: { type: String, default: 'Segera hadir' },
  description: { type: String, default: 'Fitur ini sedang kami siapkan.' },
  icon: { type: String, default: 'sparkles' },
  ctaLabel: { type: String, default: '' },
  ctaTo: { type: String, default: '' },
})
</script>

<template>
  <div class="mx-auto flex max-w-xl flex-col items-center py-10 text-center sm:py-20">
    <div class="relative mb-5">
      <div class="grad-primary grid size-16 place-items-center rounded-2xl text-ink">
        <AppIcon :name="icon" :size="28" :stroke-width="1.6" />
      </div>
      <span class="absolute -top-2 -right-3">
        <BaseBadge variant="navy" size="sm">Segera</BaseBadge>
      </span>
    </div>
    <h1 class="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
      {{ title }}
    </h1>
    <p class="mt-3 max-w-md text-sm leading-relaxed text-body">{{ description }}</p>

    <div class="mt-7 flex flex-wrap items-center justify-center gap-2.5">
      <BaseButton to="/dashboard" icon-left="arrow-left">Kembali ke dashboard</BaseButton>
      <BaseButton v-if="ctaTo" :to="ctaTo" variant="outline" icon-right="arrow-right">
        {{ ctaLabel }}
      </BaseButton>
    </div>

    <p class="mt-8 text-[11px] tracking-[0.12em] text-muted uppercase">
      Skular · prototype demo
    </p>
  </div>
</template>
