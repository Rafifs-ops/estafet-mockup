<script setup>
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  phase: { type: Object, required: true },
  stats: { type: Object, default: () => ({ done: 0, total: 0 }) },
  modules: { type: Array, default: () => [] },
})

const emit = defineEmits(['open'])

const stateStyles = {
  selesai: 'bg-success-soft text-success',
  berjalan: 'grad-primary text-ink',
  terkunci: 'bg-surface-alt text-muted',
}

const statusText = {
  selesai: 'Selesai · Ulangi modul',
  berjalan: 'Sedang Berjalan · Lanjutkan modul',
  terkunci: 'Terkunci · Selesaikan modul sebelumnya untuk membuka',
}
</script>

<template>
  <div class="rounded-2xl border border-line bg-white/80 p-4 sm:p-5">
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 items-start gap-3">
        <span class="font-display text-lg leading-none font-extrabold text-ink/25">
          {{ phase.number }}
        </span>
        <div class="min-w-0">
          <h3 class="text-[13.5px] font-semibold text-ink">{{ phase.title }}</h3>
          <p class="mt-0.5 text-[11px] leading-relaxed text-muted">{{ phase.description }}</p>
        </div>
      </div>
      <BaseBadge variant="neutral" size="sm" class="shrink-0">
        {{ stats.done }}/{{ stats.total }} modul
      </BaseBadge>
    </div>

    <ul class="mt-3 space-y-1.5">
      <li v-for="mod in modules" :key="mod.id">
        <button
          type="button"
          class="flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-200"
          :class="[
            mod.status === 'terkunci'
              ? 'cursor-not-allowed border-line/70 bg-background/40'
              : 'border-line bg-white hover:border-gold-deep/50',
            mod.status === 'berjalan' ? 'border-gold-deep/40 bg-background/70' : '',
          ]"
          :disabled="mod.status === 'terkunci'"
          @click="emit('open', mod.id)"
        >
          <span
            class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"
            :class="stateStyles[mod.status]"
          >
            <AppIcon
              :name="mod.status === 'selesai' ? 'check' : mod.status === 'berjalan' ? 'play' : 'lock'"
              :size="12"
              :stroke-width="2.2"
            />
          </span>

          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-1.5">
              <span class="text-[9.5px] font-semibold tracking-[0.08em] text-muted uppercase">
                Modul {{ mod.id }}
              </span>
              <span
                class="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                :class="mod.type === 'inti' ? 'bg-navy-soft text-navy' : 'grad-primary text-ink'"
              >
                {{ mod.type === 'inti' ? 'Inti' : 'Template Beasiswa' }}
              </span>
              <span
                v-if="mod.type === 'inti'"
                class="hidden text-[9.5px] text-muted sm:inline"
              >
                · Dipakai bersama
              </span>
            </span>
            <span
              class="mt-1 block text-[12.5px] leading-snug font-medium"
              :class="mod.status === 'terkunci' ? 'text-body/70' : 'text-ink'"
            >
              {{ mod.title }}
            </span>
            <span class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted">
              <span class="inline-flex items-center gap-1">
                <AppIcon name="clock" :size="11" /> {{ mod.duration }}
              </span>
              <span v-if="mod.status === 'selesai'" class="text-success">
                {{ mod.progress }}% selesai
              </span>
            </span>
            <span
              class="mt-2 flex items-center gap-1 text-[10.5px] font-medium"
              :class="
                mod.status === 'selesai'
                  ? 'text-success'
                  : mod.status === 'berjalan'
                    ? 'text-gold-deep'
                    : 'text-muted'
              "
            >
              {{ statusText[mod.status] }}
              <AppIcon
                v-if="mod.status !== 'terkunci'"
                name="arrow-right"
                :size="11"
                :stroke-width="2"
              />
            </span>
          </span>

          <AppIcon
            :name="mod.status === 'terkunci' ? 'lock' : 'chevron-right'"
            :size="15"
            class="mt-1 shrink-0"
            :class="mod.status === 'terkunci' ? 'text-muted/60' : 'text-muted'"
          />
        </button>
      </li>
    </ul>
  </div>
</template>
