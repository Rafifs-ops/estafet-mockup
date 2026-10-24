<script setup>
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'

defineProps({
  feedback: { type: Object, required: true },
  history: { type: Array, default: () => [] },
})

const columns = [
  {
    key: 'strengths',
    title: 'Kekuatanmu',
    icon: 'check-circle',
    box: 'bg-success-soft border-success/15',
    accent: 'text-success',
  },
  {
    key: 'improvements',
    title: 'Yang perlu diperbaiki',
    icon: 'pen',
    box: 'bg-warning-soft border-warning/20',
    accent: 'text-warning',
  },
  {
    key: 'next',
    title: 'Langkah berikutnya',
    icon: 'arrow-right',
    box: 'bg-navy-soft border-navy/15',
    accent: 'text-navy',
  },
]
</script>

<template>
  <div class="card-surface overflow-hidden">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-background/50 p-4 sm:p-5">
      <div class="flex items-center gap-3">
        <ProgressRing :value="feedback.score" :size="66" :stroke="6">
          <span class="text-[15px] font-bold text-ink">{{ feedback.score }}</span>
        </ProgressRing>
        <div>
          <p class="label-xs">Feedback AI</p>
          <p class="text-[12.5px] font-semibold text-ink">Skor latihanmu</p>
          <p class="text-[10px] text-muted">{{ feedback.at }}</p>
        </div>
      </div>
      <BaseBadge variant="navy" size="sm" icon="sparkles">Dari evaluasi AI</BaseBadge>
    </div>

    <div class="p-4 sm:p-5">
      <p class="text-[12px] leading-relaxed text-body">{{ feedback.summary }}</p>

      <div class="mt-3.5 grid gap-2.5 sm:grid-cols-3">
        <div
          v-for="column in columns"
          :key="column.key"
          class="rounded-xl border p-3"
          :class="column.box"
        >
          <p class="flex items-center gap-1.5 text-[11px] font-semibold" :class="column.accent">
            <AppIcon :name="column.icon" :size="13" />
            {{ column.title }}
          </p>
          <ul class="mt-2 space-y-1.5">
            <li
              v-for="item in feedback[column.key]"
              :key="item"
              class="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-body"
            >
              <span class="mt-1.5 size-1 shrink-0 rounded-full bg-current opacity-40" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="history.length > 1"
        class="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-line pt-3"
      >
        <span class="text-[9.5px] font-semibold tracking-[0.1em] text-muted uppercase">
          Riwayat skor
        </span>
        <span
          v-for="(item, index) in history"
          :key="index"
          class="rounded-full border border-line bg-background px-2 py-0.5 text-[10px] font-medium text-body"
        >
          {{ item.score }}
        </span>
        <span class="ml-auto flex items-center gap-1 text-[10px] text-success">
          <AppIcon name="trending-up" :size="12" />
          {{ history[history.length - 1].score - history[0].score >= 0 ? '+' : '' }}{{
            history[history.length - 1].score - history[0].score
          }}
          dari percobaan pertama
        </span>
      </div>

      <p class="mt-3 flex items-start gap-1.5 text-[9.5px] leading-relaxed text-muted">
        <AppIcon name="info" :size="12" class="mt-px shrink-0" />
        Feedback dibuat otomatis dari latihanmu di prototype ini. Selalu periksa kembali sebelum
        dipakai di dokumen resmi.
      </p>
    </div>
  </div>
</template>
