<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  content: { type: Object, required: true },
})

const emit = defineEmits(['start', 'back'])
</script>

<template>
  <div class="space-y-4">
    <!-- Banner -->
    <div class="grad-primary relative overflow-hidden rounded-3xl border border-gold-deep/30 p-5 sm:p-6">
      <div class="pointer-events-none absolute -top-10 -right-6 size-32 rounded-full bg-white/25 blur-xl" />
      <div class="relative">
        <div class="flex flex-wrap items-center gap-2">
          <span class="rounded-full bg-ink/10 px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.16em] text-ink uppercase">
            {{ content.banner.eyebrow }}
          </span>
          <BaseBadge variant="dark" size="sm" class="bg-white/30 text-ink">Pengantar</BaseBadge>
        </div>
        <h2 class="font-display mt-2.5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {{ content.banner.title }}
        </h2>
        <p class="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-ink/90">
          {{ content.banner.text }}
        </p>
      </div>
    </div>

    <p class="px-1 text-[12.5px] leading-relaxed text-body">{{ content.intro }}</p>

    <!-- Info cards -->
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="card-surface p-4">
        <span class="grid size-9 place-items-center rounded-xl bg-gold-light text-navy-dark">
          <AppIcon name="target" :size="17" />
        </span>
        <p class="mt-2.5 text-[12.5px] font-semibold text-ink">Tujuan modul</p>
        <p class="mt-1 text-[11.5px] leading-relaxed text-body">{{ content.cards.goal }}</p>
      </div>

      <div class="card-surface p-4">
        <span class="grid size-9 place-items-center rounded-xl bg-navy-soft text-navy">
          <AppIcon name="clock" :size="17" />
        </span>
        <p class="mt-2.5 text-[12.5px] font-semibold text-ink">Estimasi waktu</p>
        <p class="font-display mt-1 text-2xl font-extrabold text-ink">{{ content.cards.time }}</p>
        <p class="mt-0.5 text-[11px] text-muted">Bisa dicicil 5–10 menit per sesi.</p>
      </div>

      <div class="card-surface p-4">
        <span class="grid size-9 place-items-center rounded-xl bg-gold-light text-navy-dark">
          <AppIcon name="book-open" :size="17" />
        </span>
        <p class="mt-2.5 text-[12.5px] font-semibold text-ink">Apa yang akan dipelajari</p>
        <ul class="mt-1.5 space-y-1.5">
          <li
            v-for="item in content.cards.learn"
            :key="item"
            class="flex items-start gap-2 text-[11.5px] leading-relaxed text-body"
          >
            <span class="mt-1.5 size-1 shrink-0 rounded-full bg-gold-deep" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="card-surface p-4">
        <span class="grid size-9 place-items-center rounded-xl bg-success-soft text-success">
          <AppIcon name="check-circle" :size="17" />
        </span>
        <p class="mt-2.5 text-[12.5px] font-semibold text-ink">Output yang harus dibuat</p>
        <ul class="mt-1.5 space-y-1.5">
          <li
            v-for="item in content.cards.output"
            :key="item"
            class="flex items-start gap-2 text-[11.5px] leading-relaxed text-body"
          >
            <AppIcon name="check" :size="12" class="mt-0.5 shrink-0 text-success" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- How to -->
    <div class="card-surface p-4 sm:p-5">
      <p class="label-xs">Cara menggunakan modul</p>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(item, index) in content.howTo" :key="item.title" class="flex gap-2.5">
          <span class="grid size-6 shrink-0 place-items-center rounded-full border border-line bg-background text-[10px] font-semibold text-ink">
            {{ index + 1 }}
          </span>
          <div>
            <p class="text-[11.5px] font-semibold text-ink">{{ item.title }}</p>
            <p class="mt-0.5 text-[10.5px] leading-relaxed text-body">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2 pt-1">
      <BaseButton icon-right="arrow-right" @click="emit('start')">Mulai Modul</BaseButton>
      <BaseButton variant="ghost" size="sm" @click="emit('back')">Kembali ke dashboard</BaseButton>
    </div>
  </div>
</template>
