<script setup>
import { formatDate } from '@/data/scholarships'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'

defineProps({
  scholarship: { type: Object, default: null },
  progress: { type: Number, default: 0 },
  modulesDone: { type: Number, default: 0 },
  totalModules: { type: Number, default: 11 },
  averageScore: { type: [Number, String], default: '-' },
  days: { type: Number, default: 0 },
})

defineEmits(['continue'])
</script>

<template>
  <div class="grad-dark relative overflow-hidden rounded-3xl border border-navy-dark p-5 text-white sm:p-6">
    <div class="pointer-events-none absolute -top-16 -right-10 size-52 rounded-full bg-gold/10 blur-2xl" />

    <div v-if="scholarship" class="relative">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-1.5">
            <BaseBadge variant="dark" size="sm" icon="award">Beasiswa aktif</BaseBadge>
            <BaseBadge variant="dark" size="sm">Dipilih</BaseBadge>
          </div>
          <h2 class="mt-2.5 text-lg leading-snug font-semibold text-white sm:text-xl">
            {{ scholarship.name }}
          </h2>
          <p class="mt-0.5 text-[11.5px] text-white/70">{{ scholarship.organizer }}</p>
        </div>
        <div class="hidden shrink-0 text-center sm:block">
          <ProgressRing :value="progress" :size="78" :stroke="7" tone="white">
            <div class="text-center">
              <p class="text-[15px] leading-none font-bold text-white">{{ progress }}%</p>
              <p class="mt-0.5 text-[8px] tracking-[0.12em] text-white/70 uppercase">siap</p>
            </div>
          </ProgressRing>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-white/80">
          <AppIcon name="calendar" :size="12" />
          Tutup {{ formatDate(scholarship.deadline) }}
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium"
          :class="days <= 7 ? 'bg-gold/20 text-gold' : 'bg-success/20 text-success-light'"
        >
          <AppIcon name="clock" :size="12" />
          {{ days < 0 ? 'Deadline lewat' : `${days} hari lagi` }}
        </span>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2">
        <div class="rounded-xl border border-white/10 bg-white/5 p-2.5">
          <p class="text-[9px] tracking-[0.1em] text-white/70 uppercase">Status</p>
          <p class="mt-1 text-[12px] font-medium text-white">Sedang dipelajari</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-2.5">
          <p class="text-[9px] tracking-[0.1em] text-white/70 uppercase">Progress belajar</p>
          <p class="mt-1 text-[12px] font-medium text-white">{{ modulesDone }}/{{ totalModules }} modul</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-2.5">
          <p class="text-[9px] tracking-[0.1em] text-white/70 uppercase">Hasil</p>
          <p class="mt-1 text-[12px] font-medium text-white">
            {{ averageScore === '-' ? 'Belum ada' : `${averageScore}/100` }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <BaseButton size="sm" icon-right="arrow-right" @click="$emit('continue')">
          Lanjutkan Persiapan
        </BaseButton>
        <BaseButton
          to="/rekomendasi"
          variant="outline"
          size="sm"
          class="border-white/20 bg-white/5 text-white hover:bg-white/10"
        >
          Detail beasiswa
        </BaseButton>
        <RouterLink
          to="/rekomendasi"
          class="ml-auto inline-flex items-center gap-1 text-[11px] text-white/60 underline-offset-4 hover:text-white hover:underline"
        >
          Kelola semua <AppIcon name="chevron-right" :size="12" />
        </RouterLink>
      </div>
    </div>

    <div v-else class="relative">
      <BaseBadge variant="dark" size="sm">Beasiswa aktif</BaseBadge>
      <h2 class="mt-3 text-xl font-semibold text-white">Belum ada beasiswa utama</h2>
      <p class="mt-2 max-w-sm text-[12.5px] leading-relaxed text-white/60">
        Pilih satu beasiswa dari rekomendasi agar roadmap dan modul Template bisa disesuaikan
        dengan targetmu.
      </p>
      <BaseButton to="/rekomendasi" size="sm" class="mt-4" icon-right="arrow-right">
        Jelajahi beasiswa
      </BaseButton>
    </div>
  </div>
</template>
