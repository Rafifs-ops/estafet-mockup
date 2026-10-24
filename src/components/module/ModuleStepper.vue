<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps({
  steps: { type: Array, required: true },
  activeIndex: { type: Number, default: 1 },
  maxStep: { type: Number, default: 1 },
})

const emit = defineEmits(['select'])

const items = computed(() =>
  props.steps.map((label, index) => {
    const number = index + 1
    let state = 'locked'
    if (number === props.activeIndex) state = 'active'
    else if (number < props.activeIndex) state = 'done'
    else if (number <= props.maxStep) state = 'open'
    return { label, number, state }
  }),
)
</script>

<template>
  <nav class="card-surface flex gap-1.5 overflow-x-auto p-2 no-scrollbar" aria-label="Langkah modul">
    <button
      v-for="item in items"
      :key="item.label"
      type="button"
      class="flex min-w-[7.2rem] flex-1 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-[11.5px] font-medium whitespace-nowrap transition-colors duration-200"
      :class="[
        item.state === 'active'
          ? 'grad-primary border-transparent text-ink shadow-[0_8px_18px_-12px_rgba(23,43,70,0.5)]'
          : '',
        item.state === 'done'
          ? 'border-success/20 bg-success-soft text-success hover:bg-success/10'
          : '',
        item.state === 'open'
          ? 'border-line bg-white text-ink hover:border-gold-deep/50'
          : '',
        item.state === 'locked'
          ? 'cursor-not-allowed border-line bg-background/40 text-muted/70'
          : '',
      ]"
      :disabled="item.state === 'locked'"
      :aria-current="item.state === 'active' ? 'step' : undefined"
      @click="emit('select', item.number)"
    >
      <span
        class="grid size-5 shrink-0 place-items-center rounded-full text-[9.5px] font-semibold"
        :class="
          item.state === 'active'
            ? 'bg-ink/10 text-ink'
            : item.state === 'done'
              ? 'bg-success text-white'
              : 'bg-surface-alt text-muted'
        "
      >
        <AppIcon v-if="item.state === 'done'" name="check" :size="10" :stroke-width="3" />
        <AppIcon v-else-if="item.state === 'locked'" name="lock" :size="9" />
        <template v-else>{{ item.number }}</template>
      </span>
      {{ item.label }}
    </button>
  </nav>
</template>
