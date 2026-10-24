<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

const tiles = [
  { label: 'Semua Beasiswa', icon: 'award', to: '/beasiswa' },
  { label: 'Beasiswa Saya', icon: 'star', to: '/beasiswa-saya' },
  { label: 'Perpustakaan', icon: 'library', to: '/perpustakaan' },
  { label: 'CV Saya', icon: 'file-text', to: '/cv' },
]
</script>

<template>
  <div class="card-surface p-4">
    <p class="label-xs">Akses cepat</p>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <RouterLink
        v-for="tile in tiles"
        :key="tile.label"
        :to="tile.to"
        class="group flex flex-col gap-2 rounded-xl border border-line bg-background/60 p-3 transition hover:border-gold-deep/50 hover:bg-background"
      >
        <span class="grid size-8 place-items-center rounded-lg bg-white text-navy transition group-hover:text-gold-deep">
          <AppIcon :name="tile.icon" :size="16" />
        </span>
        <span class="text-[11.5px] leading-tight font-medium text-ink">{{ tile.label }}</span>
      </RouterLink>
    </div>
    <RouterLink
      to="/profil"
      class="mt-2 flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2.5 text-[11.5px] font-medium text-ink transition hover:border-gold-deep/50"
    >
      <span class="flex items-center gap-2">
        <span class="grid size-6 place-items-center rounded-full bg-navy-soft text-navy">
          <AppIcon name="user" :size="13" />
        </span>
        Profil & Akun
      </span>
      <AppIcon name="chevron-right" :size="14" class="text-muted" />
    </RouterLink>
  </div>
</template>
