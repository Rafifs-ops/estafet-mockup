<script setup>
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { formatDate } from '@/data/scholarships'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="card-surface p-5">
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="label-xs">Antrean</p>
        <h2 class="mt-1 text-base font-semibold text-ink">Antrean beasiswamu</h2>
      </div>
      <RouterLink
        to="/rekomendasi"
        class="inline-flex items-center gap-1 text-[11px] font-medium text-navy hover:underline"
      >
        Kelola semua <AppIcon name="chevron-right" :size="12" />
      </RouterLink>
    </div>

    <ul v-if="items.length" class="mt-3.5 divide-y divide-line">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
      >
        <span
          class="grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-background text-[11px] font-semibold text-body"
        >
          {{ index + 1 }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-[12.5px] font-medium text-ink">{{ item.name }}</p>
          <p class="text-[10.5px] text-muted">Tutup {{ formatDate(item.deadline) }}</p>
        </div>
        <BaseBadge :variant="item.primary ? 'gradient' : 'neutral'" size="sm">
          {{ item.primary ? 'Sedang dipelajari' : 'Antre' }}
        </BaseBadge>
        <span class="hidden items-center gap-1 text-[10px] font-medium text-success sm:inline-flex">
          <AppIcon name="check" :size="11" :stroke-width="3" /> Dipilih
        </span>
      </li>
    </ul>

    <div v-else class="mt-3 rounded-2xl border border-dashed border-line bg-background/60 p-4 text-center">
      <p class="text-[12px] text-body">Belum ada beasiswa yang dipilih.</p>
      <RouterLink to="/rekomendasi" class="mt-1 inline-block text-[11.5px] font-medium text-navy hover:underline">
        Cari beasiswa yang cocok
      </RouterLink>
    </div>
  </div>
</template>
