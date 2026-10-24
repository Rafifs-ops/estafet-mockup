<script setup>
import { ref, watch } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const mobileOpen = ref(false)

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="flex min-h-screen">
      <div class="sticky top-0 hidden h-screen lg:block">
        <AppSidebar />
      </div>

      <div class="flex min-w-0 flex-1 flex-col">
        <header
          class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-background/90 px-4 py-3 backdrop-blur lg:hidden"
        >
          <button
            type="button"
            class="grid size-9 place-items-center rounded-xl border border-line bg-white text-ink"
            aria-label="Buka menu"
            @click="mobileOpen = true"
          >
            <AppIcon name="menu" :size="19" />
          </button>
          <RouterLink to="/" aria-label="Skular - beranda"><BrandLogo /></RouterLink>
          <RouterLink
            to="/dashboard"
            class="grid size-9 place-items-center rounded-full bg-navy-soft text-[11px] font-semibold text-navy"
            aria-label="Profil"
          >
            RS
          </RouterLink>
        </header>

        <main class="flex-1">
          <div class="mx-auto w-full max-w-[1140px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
            <slot />
          </div>
        </main>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px] lg:hidden"
        @click="mobileOpen = false"
      />
    </Transition>
    <Transition name="slide">
      <div v-if="mobileOpen" class="fixed inset-y-0 left-0 z-50 max-w-[86vw] shadow-2xl lg:hidden">
        <AppSidebar @close="mobileOpen = false" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.24s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
