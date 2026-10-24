<script setup>
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import UserChip from './UserChip.vue'
import { useProfileStore } from '@/stores/profile'
import { useScholarshipStore } from '@/stores/scholarship'
import { useLearningStore } from '@/stores/learning'
import { user } from '@/data/user'

const emit = defineEmits(['close'])
const route = useRoute()
const router = useRouter()
const profile = useProfileStore()
const scholarship = useScholarshipStore()
const learning = useLearningStore()

const groups = [
  {
    label: 'Ruang belajar',
    items: [
      { to: '/dashboard', label: 'Beranda', icon: 'home', match: ['/dashboard', '/modul'] },
      { to: '/perpustakaan', label: 'Perpustakaan', icon: 'library' },
    ],
  },
  {
    label: 'Beasiswa',
    items: [
      { to: '/rekomendasi', label: 'Rekomendasi', icon: 'compass' },
      { to: '/beasiswa', label: 'Semua Beasiswa', icon: 'award' },
      { to: '/beasiswa-saya', label: 'Beasiswa Saya', icon: 'star' },
    ],
  },
  {
    label: 'Akun',
    items: [
      { to: '/profil', label: 'Profil & Profiling', icon: 'user' },
      { to: '/cv', label: 'CV Saya', icon: 'file-text' },
    ],
  },
]

function isActive(item) {
  const paths = item.match || [item.to]
  return paths.some((path) => route.path === path || route.path.startsWith(`${path}/`))
}

function resetDemo() {
  const ok = window.confirm('Reset seluruh progres demo? Data profiling, beasiswa, dan modul akan dihapus.')
  if (!ok) return
  profile.reset()
  scholarship.reset()
  learning.reset()
  emit('close')
  router.push('/')
}
</script>

<template>
  <aside
    class="flex h-full w-[312px] shrink-0 flex-col border-r border-line bg-background px-4 pt-5 pb-4 xl:w-[350px] xl:px-5"
  >
    <div class="flex items-center justify-between px-1">
      <RouterLink to="/" aria-label="Skular - beranda" @click="emit('close')">
        <BrandLogo />
      </RouterLink>
      <button
        type="button"
        class="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-alt lg:hidden"
        aria-label="Tutup menu"
        @click="emit('close')"
      >
        <AppIcon name="x" :size="18" />
      </button>
    </div>

    <nav class="no-scrollbar mt-7 flex-1 space-y-6 overflow-y-auto pb-4">
      <div v-for="group in groups" :key="group.label">
        <p class="label-xs mb-2 px-3">{{ group.label }}</p>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-200"
              :class="
                isActive(item)
                  ? 'grad-primary text-ink shadow-[0_10px_22px_-14px_rgba(23,43,70,0.5)]'
                  : 'text-body hover:bg-surface-alt hover:text-ink'
              "
              :aria-current="isActive(item) ? 'page' : undefined"
              @click="emit('close')"
            >
              <AppIcon
                :name="item.icon"
                :size="17"
                :stroke-width="isActive(item) ? 2 : 1.7"
                :class="isActive(item) ? 'text-ink' : 'text-muted group-hover:text-navy'"
              />
              <span class="flex-1 truncate">{{ item.label }}</span>
              <AppIcon
                v-if="isActive(item)"
                name="chevron-right"
                :size="15"
                class="text-ink/70"
              />
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="border-t border-line pt-3">
      <UserChip @reset="resetDemo" />
      <div class="mt-2 flex items-center justify-between px-1.5">
        <p class="text-[9px] leading-tight font-medium tracking-[0.12em] text-muted uppercase">
          {{ user.tagline }}
        </p>
        <button
          type="button"
          class="grid size-6 place-items-center rounded-md text-muted/60 transition hover:bg-surface-alt hover:text-danger"
          title="Reset demo"
          aria-label="Reset demo"
          @click="resetDemo"
        >
          <AppIcon name="refresh" :size="12" />
        </button>
      </div>
    </div>
  </aside>
</template>
