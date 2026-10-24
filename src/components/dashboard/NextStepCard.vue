<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  to: { type: [String, Object], default: '/dashboard' },
  phase: { type: String, default: '' },
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-line bg-background p-5">
    <div class="pointer-events-none absolute -top-10 -right-8 size-32 rounded-full bg-gold/20 blur-xl" />
    <div class="relative flex flex-wrap items-center justify-between gap-4">
      <div class="min-w-0 max-w-md">
        <p class="label-xs">Langkah berikutnya</p>
        <h3 class="mt-1.5 text-[15px] leading-snug font-semibold text-ink sm:text-base">
          {{ title }}
        </h3>
        <p class="mt-1 text-[11.5px] leading-relaxed text-body">{{ description }}</p>
        <BaseButton :to="to" size="sm" icon-right="arrow-right" class="mt-3">
          Lanjutkan belajar
        </BaseButton>
      </div>
      <div class="hidden shrink-0 sm:block">
        <div class="grad-primary grid size-14 place-items-center rounded-2xl text-ink">
          <AppIcon name="book-open" :size="26" />
        </div>
        <p v-if="phase" class="mt-2 text-center text-[9px] tracking-[0.1em] text-muted uppercase">
          {{ phase }}
        </p>
      </div>
    </div>
  </div>
</template>
