<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.7 },
})

const icons = {
  'arrow-right': '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
  'arrow-left': '<path d="M20 12H4"/><path d="m10 6-6 6 6 6"/>',
  'arrow-up': '<path d="M12 20V4"/><path d="m6 10 6-6 6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  'chevron-left': '<path d="m15 6-6 6 6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m4 12.5 5 5L20 6.5"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  play: '<path d="M8 5.5v13l10.5-6.5L8 5.5Z"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M19 18v3H6.5"/>',
  'book-open':
    '<path d="M12 6.5C10.5 5 8 4 4 4v14c4 0 6.5 1 8 2.5"/><path d="M12 6.5C13.5 5 16 4 20 4v14c-4 0-6.5 1-8 2.5V6.5Z"/>',
  library:
    '<path d="M4 8.5 12 4l8 4.5"/><path d="M6 9.5V20"/><path d="M10 9.5V20"/><path d="M14 9.5V20"/><path d="M18 9.5V20"/><path d="M4 20h16"/>',
  sparkles:
    '<path d="M12 3.5l1.6 4.6 4.6 1.6-4.6 1.6L12 16l-1.6-4.7L5.8 9.7l4.6-1.6L12 3.5Z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
  star: '<path d="m12 3.6 2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.9-5.3 2.9 1-6L3.3 10l6-.9L12 3.6Z"/>',
  'star-filled':
    '<path d="m12 3.6 2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.9-5.3 2.9 1-6L3.3 10l6-.9L12 3.6Z" fill="currentColor"/>',
  'external-link':
    '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3.5 10h17"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  users:
    '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.6"/><path d="M18 14.5a6 6 0 0 1 3 5.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  'map-pin': '<path d="M19 10.5c0 5-7 11-7 11s-7-6-7-11a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10.5" r="2.6"/>',
  'graduation-cap':
    '<path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z"/><path d="M6 11v4.5c0 1.7 2.7 3 6 3s6-1.3 6-3V11"/><path d="M21.5 9v5"/>',
  home: '<path d="m3.5 10.5 8.5-7 8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  award:
    '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1 7 4.5-2.5 4.5 2.5-1-7"/>',
  'file-text':
    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  send: '<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5L3 9.5 21 3Z"/>',
  'alert-triangle':
    '<path d="M12 4.5 2.8 20h18.4L12 4.5Z"/><path d="M12 10v4.5"/><path d="M12 17.5h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.8h.01"/>',
  'trending-up': '<path d="m3 17 6-6 4 4 7-8"/><path d="M15 7h5v5"/>',
  phone:
    '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
  layers:
    '<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
  'bar-chart': '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 20v-6"/><path d="M13 20V9"/><path d="M18 20v-9"/>',
  chat: '<path d="M20.5 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-5A7.5 7.5 0 1 1 20.5 11.5Z"/>',
  lightbulb:
    '<path d="M9 17h6"/><path d="M10 20h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3Z"/>',
  pen: '<path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m14.5 5.5 4 4"/>',
  refresh:
    '<path d="M20 11a8 8 0 0 0-13.7-5.3L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 13.7 5.3L21 15"/><path d="M21 20v-5h-5"/>',
  shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.9 7.5 9 4.3-1.1 7.5-4.5 7.5-9V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  briefcase:
    '<rect x="3" y="7.5" width="18" height="12" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17Z"/>',
  wallet:
    '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none"/>',
  edit: '<path d="M12 20h8"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/>',
  loader: '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M5 12H1"/><path d="M23 12h-4"/><path d="m6.3 6.3 2.8 2.8"/><path d="m14.9 14.9 2.8 2.8"/><path d="m17.7 6.3-2.8 2.8"/><path d="m9.1 14.9-2.8 2.8"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
}

const inner = computed(() => icons[props.name] || icons.circle)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
    v-html="inner"
  />
</template>
