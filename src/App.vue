<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

const route = useRoute()
const layout = computed(() => (route.meta.layout === 'public' ? PublicLayout : AppLayout))
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component, route: current }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="current.path" />
      </Transition>
    </RouterView>
  </component>
</template>
