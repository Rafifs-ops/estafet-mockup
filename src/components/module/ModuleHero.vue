<script setup>
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'

defineProps({
  title: { type: String, required: true },
  module: { type: Object, required: true },
  phase: { type: Object, default: null },
  progress: { type: Number, default: 0 },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 5 },
})
</script>

<template>
  <section class="grad-hero relative overflow-hidden rounded-[30px] border border-line p-5 sm:p-7">
    <div class="flex flex-wrap items-center gap-1.5">
      <BaseButton
        to="/dashboard"
        variant="ghost"
        size="xs"
        icon-left="arrow-left"
        class="border border-line bg-white/70 text-ink hover:bg-white"
      >
        Dashboard
      </BaseButton>
      <BaseBadge v-if="phase" variant="neutral" size="sm">
        Fase {{ phase.number }} · {{ phase.title }}
      </BaseBadge>
      <BaseBadge variant="outline" size="sm" icon="book-open">Materi Bacaan</BaseBadge>
      <BaseBadge :variant="module.type === 'inti' ? 'navy' : 'gradient'" size="sm">
        {{ module.type === 'inti' ? 'Modul Inti · dipakai bersama' : 'Template Beasiswa' }}
      </BaseBadge>
      <BaseBadge variant="outline" size="sm" icon="clock">{{ module.duration }}</BaseBadge>
    </div>

    <div class="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_186px] lg:items-start">
      <div>
        <p class="label-xs">Modul {{ module.id }}</p>
        <h1 class="font-display mt-1.5 max-w-2xl text-[25px] leading-[1.12] font-extrabold tracking-tight text-ink sm:text-[32px]">
          {{ title }}
        </h1>
        <p class="mt-2 max-w-xl text-[12.5px] leading-relaxed text-body">
          {{ module.description }}
        </p>

        <div class="mt-4">
          <p class="text-[9.5px] font-semibold tracking-[0.14em] text-muted uppercase">Tujuan modul</p>
          <ul class="mt-1.5 space-y-1">
            <li
              v-for="objective in module.objectives"
              :key="objective"
              class="flex items-start gap-2 text-[11.5px] leading-relaxed text-body"
            >
              <AppIcon name="check-circle" :size="13" class="mt-0.5 shrink-0 text-success" />
              {{ objective }}
            </li>
          </ul>
        </div>
      </div>

      <div class="rounded-2xl border border-line bg-white/85 p-3.5">
        <div class="flex items-center justify-center">
          <ProgressRing :value="progress" :size="92" :stroke="8">
            <div class="text-center">
              <p class="text-[17px] leading-none font-bold text-ink">{{ progress }}%</p>
              <p class="mt-0.5 text-[8px] tracking-[0.1em] text-muted uppercase">modul</p>
            </div>
          </ProgressRing>
        </div>
        <p class="mt-2.5 text-center text-[9.5px] font-semibold tracking-[0.12em] text-muted uppercase">
          Progress modul
        </p>
        <ProgressBar class="mt-1.5" :value="progress" :height="5" />
        <p class="mt-1.5 text-center text-[10px] text-muted">
          Langkah {{ currentStep }} dari {{ totalSteps }}
        </p>
      </div>
    </div>
  </section>
</template>
