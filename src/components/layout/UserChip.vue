<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { user } from '@/data/user'

const emit = defineEmits(['reset'])
const open = ref(false)

function handleReset() {
  open.value = false
  emit('reset')
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="flex w-full items-center gap-3 rounded-2xl border border-line bg-white/80 p-2.5 text-left transition-colors hover:border-gold-deep/50"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
    >
      <span class="grid size-9 shrink-0 place-items-center rounded-full bg-navy-soft text-[12px] font-semibold text-navy">
        {{ user.initials }}
      </span>
      <span class="min-w-0 flex-1">
        <span class="block truncate text-[12.5px] font-semibold tracking-wide text-ink uppercase">
          {{ user.name }}
        </span>
        <span class="block text-[11px] text-muted">Siswa · Profil lengkap</span>
      </span>
      <AppIcon
        name="chevron-down"
        :size="16"
        class="shrink-0 text-muted transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <Transition name="pop">
      <div
        v-if="open"
        class="absolute bottom-full left-0 z-40 mb-2 w-full overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_20px_50px_-24px_rgba(23,43,70,0.4)]"
        role="menu"
      >
        <RouterLink
          to="/profil"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-ink hover:bg-background"
          @click="open = false"
        >
          <AppIcon name="user" :size="16" class="text-navy" />
          Profil & Profiling
        </RouterLink>
        <RouterLink
          to="/cv"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-ink hover:bg-background"
          @click="open = false"
        >
          <AppIcon name="file-text" :size="16" class="text-navy" />
          CV Saya
        </RouterLink>
        <button
          type="button"
          class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] text-danger hover:bg-danger-soft"
          @click="handleReset"
        >
          <AppIcon name="refresh" :size="16" />
          Reset demo
        </button>
      </div>
    </Transition>
  </div>
</template>
