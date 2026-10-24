<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  size: { type: Number, default: 104 },
  stroke: { type: Number, default: 9 },
  tone: { type: String, default: 'gradient' },
  trackColor: { type: String, default: '#EAEF6' },
})

const uid = useId()
const gradientId = computed(() => `ring-grad-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`)

const safeValue = computed(() => Math.max(0, Math.min(100, Number(props.value) || 0)))
const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - safeValue.value / 100))

const strokeColor = computed(() => {
  if (props.tone === 'white') return '#ffffff'
  if (props.tone === 'navy') return '#1E3658'
  if (props.tone === 'success') return '#15803D'
  return `url(#${gradientId.value})`
})
</script>

<template>
  <div
    class="relative inline-flex shrink-0 items-center justify-center"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F8B638" />
          <stop offset="100%" stop-color="#E8A526" />
        </linearGradient>
      </defs>
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="tone === 'white' ? 'rgba(255,255,255,0.18)' : trackColor"
        :stroke-width="stroke"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="strokeColor"
        :stroke-width="stroke"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        class="transition-[stroke-dashoffset] duration-700 ease-out"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
      <slot>
        <span class="text-xl font-semibold text-ink">{{ safeValue }}%</span>
      </slot>
    </div>
  </div>
</template>
