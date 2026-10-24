<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  content: { type: Object, required: true },
})

const emit = defineEmits(['back', 'next'])
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-start gap-3">
      <span class="grad-primary grid size-10 shrink-0 place-items-center rounded-xl text-ink">
        <AppIcon name="book-open" :size="19" />
      </span>
      <div>
        <p class="label-xs">Pahami</p>
        <h2 class="mt-0.5 text-xl font-semibold tracking-tight text-ink">Materi utama</h2>
        <p class="mt-0.5 text-[11.5px] text-body">Baca pelan-pelan. Tidak perlu menghafal.</p>
      </div>
    </div>

    <div class="card-surface p-5 sm:p-6">
      <p class="text-[12px] font-semibold text-ink">Ringkasan materi</p>
      <blockquote class="mt-3 border-l-4 border-gold bg-background/70 py-2.5 pr-3 pl-4">
        <p class="text-[12.5px] leading-relaxed text-ink/85">{{ content.summary[0] }}</p>
      </blockquote>
      <p
        v-for="(paragraph, index) in content.summary.slice(1)"
        :key="index"
        class="mt-3 text-[12.5px] leading-relaxed text-body"
      >
        {{ paragraph }}
      </p>
    </div>

    <div>
      <p class="label-xs px-1">Insight penting</p>
      <div class="mt-2.5 grid gap-3 sm:grid-cols-3">
        <div
          v-for="(insight, index) in content.insights"
          :key="insight.title"
          class="card-surface p-4"
        >
          <span class="grad-primary grid size-7 place-items-center rounded-full text-[11px] font-bold text-ink">
            {{ index + 1 }}
          </span>
          <p class="mt-2.5 text-[12.5px] font-semibold leading-snug text-ink">{{ insight.title }}</p>
          <p class="mt-1 text-[11px] leading-relaxed text-body">{{ insight.text }}</p>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-navy/15 bg-navy-soft p-4 sm:p-5">
      <div class="flex items-center gap-2">
        <AppIcon name="lightbulb" :size="16" class="text-navy" />
        <p class="text-[10px] font-semibold tracking-[0.14em] text-navy uppercase">
          {{ content.core.title }}
        </p>
      </div>
      <p class="mt-2 text-[12.5px] leading-relaxed text-ink/80">{{ content.core.text }}</p>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <BaseButton variant="ghost" size="sm" icon-left="arrow-left" @click="emit('back')">
        Kembali
      </BaseButton>
      <BaseButton icon-right="arrow-right" @click="emit('next')">Lanjut ke Quick Question</BaseButton>
    </div>
  </div>
</template>
