<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  total: { type: Number, default: 8 },
  current: { type: Number, default: 1 },
  completed: { type: Array, default: () => [] },
})

const items = computed(() => Array.from({ length: props.total }, (_, index) => index + 1))

function stateOf(n) {
  if (props.completed.includes(n)) return 'done'
  if (n === props.current) return 'current'
  return 'todo'
}
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="n in items"
      :key="n"
      class="flex min-w-0 items-center"
      :class="n < total ? 'flex-1' : ''"
    >
      <div
        class="grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold transition-colors duration-300 sm:size-8 sm:text-xs"
        :class="{
          'grad-primary border-transparent text-ink': stateOf(n) === 'done',
          'border-2 border-gold-deep bg-white text-ink': stateOf(n) === 'current',
          'border-line bg-surface-alt/70 text-muted':
            stateOf(n) === 'todo',
        }"
      >
        <AppIcon v-if="stateOf(n) === 'done'" name="check" :size="14" :stroke-width="2.4" />
        <template v-else>{{ String(n).padStart(2, '0') }}</template>
      </div>
      <div
        v-if="n < total"
        class="mx-1 h-px flex-1 transition-colors duration-300 sm:mx-1.5"
        :class="stateOf(n) === 'done' ? 'bg-gold-deep/60' : 'bg-line'"
      />
    </div>
  </div>
</template>
