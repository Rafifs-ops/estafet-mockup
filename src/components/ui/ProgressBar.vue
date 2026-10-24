<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  height: { type: [Number, String], default: 8 },
  tone: { type: String, default: 'gradient' },
  track: { type: String, default: 'surface-alt' },
})

const safeValue = computed(() => Math.max(0, Math.min(100, Number(props.value) || 0)))

const tones = {
  gradient: 'grad-primary',
  navy: 'bg-navy',
  success: 'bg-success',
  white: 'bg-white',
  goldDeep: 'bg-gold-deep',
}

const trackClass = computed(() => (props.track === 'dark' ? 'bg-white/15' : 'bg-surface-alt'))
const fillClass = computed(() => tones[props.tone] || tones.gradient)
</script>

<template>
  <div
    class="w-full overflow-hidden rounded-full"
    :class="trackClass"
    :style="{ height: `${height}px` }"
    role="progressbar"
    :aria-valuenow="safeValue"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="h-full rounded-full transition-[width] duration-500 ease-out"
      :class="fillClass"
      :style="{ width: `${safeValue}%` }"
    />
  </div>
</template>
