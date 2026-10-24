<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'circle' },
  selected: Boolean,
})

defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    class="relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200"
    :class="
      selected
        ? 'border-gold-deep bg-background shadow-[0_8px_24px_-18px_rgba(23,43,70,0.5)] ring-1 ring-gold-deep/25'
        : 'border-line bg-white hover:border-gold-deep/50 hover:bg-background/40'
    "
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span
      class="grid size-10 shrink-0 place-items-center rounded-xl transition-colors"
      :class="selected ? 'grad-primary text-ink' : 'bg-surface-alt text-navy'"
    >
      <AppIcon :name="icon" :size="19" />
    </span>
    <span class="min-w-0 flex-1 pr-5">
      <span class="block text-[13.5px] font-medium" :class="selected ? 'text-navy' : 'text-ink'">
        {{ title }}
      </span>
      <span v-if="description" class="mt-1 block text-[11.5px] leading-relaxed text-body">
        {{ description }}
      </span>
    </span>
    <span
      v-if="selected"
      class="grad-primary absolute top-3 right-3 grid size-5 place-items-center rounded-full text-ink"
    >
      <AppIcon name="check" :size="12" :stroke-width="3" />
    </span>
    <span
      v-else
      class="absolute top-3 right-3 size-4 rounded-full border border-line bg-white"
      aria-hidden="true"
    />
  </button>
</template>
