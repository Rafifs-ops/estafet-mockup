<script setup>
import { computed } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import StepDots from '@/components/ui/StepDots.vue'
import { PROFILE_STEPS } from '@/stores/profile'

const props = defineProps({
  current: { type: Number, default: 1 },
  completed: { type: Array, default: () => [] },
})

const stepInfo = computed(
  () => PROFILE_STEPS.find((item) => item.n === props.current) || PROFILE_STEPS[0],
)
const progress = computed(() => Math.round((props.current / PROFILE_STEPS.length) * 100))
</script>

<template>
  <section class="card-surface overflow-hidden">
    <div class="relative p-5 sm:p-7">
      <div class="flex items-start justify-between gap-4">
        <div class="max-w-lg">
          <BaseBadge variant="navy" size="sm">Profiling</BaseBadge>
          <h1 class="font-display mt-3 text-[28px] leading-tight font-extrabold tracking-tight text-ink sm:text-[34px]">
            Kenalan dulu, yuk
          </h1>
          <p class="mt-2 text-[12.5px] leading-relaxed text-body sm:text-[13.5px]">
            Jawab 8 pertanyaan singkat agar Skular bisa merekomendasikan beasiswa yang paling
            cocok untukmu.
          </p>
        </div>
        <div
          class="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-background text-right sm:size-16"
        >
          <span class="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {{ String(current).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <div class="mt-6 flex items-end justify-between gap-3">
        <div>
          <p class="label-xs">Langkah {{ current }} dari {{ PROFILE_STEPS.length }}</p>
          <p class="mt-1 text-[13.5px] font-medium text-ink">{{ stepInfo.name }}</p>
        </div>
        <span class="text-[11px] font-medium text-muted">{{ progress }}%</span>
      </div>
      <ProgressBar class="mt-2.5" :value="progress" :height="7" />
    </div>

    <div class="border-t border-line bg-background/50 px-5 py-4 sm:px-7">
      <StepDots :total="PROFILE_STEPS.length" :current="current" :completed="completed" />
    </div>
  </section>
</template>
