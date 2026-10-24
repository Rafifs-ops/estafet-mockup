<script setup>
import { computed } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { formatDate } from '@/data/scholarships'

const props = defineProps({
  item: { type: Object, required: true },
  selected: Boolean,
  primary: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['toggle', 'primary'])

const urgencyVariant = computed(() => (props.item.days <= 7 ? 'warning' : 'success'))
const scoreVariant = computed(() =>
  props.item.score >= 95 ? 'gradient' : props.item.score >= 80 ? 'navy' : 'neutral',
)
</script>

<template>
  <article
    class="card-surface overflow-hidden transition-colors duration-200"
    :class="selected ? 'border-gold-deep/60' : ''"
  >
    <div class="p-4 sm:p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div class="flex min-w-0 flex-1 items-start gap-3">
          <button
            type="button"
            role="checkbox"
            :aria-checked="selected"
            :aria-label="`Pilih ${item.name}`"
            class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition"
            :class="
              selected
                ? 'grad-primary border-transparent text-ink'
                : 'border-line bg-white text-transparent hover:border-gold-deep'
            "
            @click="emit('toggle')"
          >
            <AppIcon name="check" :size="12" :stroke-width="3" />
          </button>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <BaseBadge :variant="scoreVariant" size="sm">{{ item.score }}% cocok</BaseBadge>
              <BaseBadge variant="success" size="sm" dot>Aktif</BaseBadge>
              <BaseBadge v-if="primary" variant="outline" size="sm" icon="star-filled">
                Utama
              </BaseBadge>
              <span class="text-[11px] font-medium" :class="item.eligible ? 'text-success' : 'text-muted'">
                {{ item.label }}
              </span>
            </div>

            <h3 class="mt-2 text-[15px] leading-snug font-semibold text-ink sm:text-base">
              {{ item.name }}
            </h3>
            <p class="mt-0.5 text-[11.5px] text-muted">{{ item.organizer }}</p>

            <div class="mt-2.5 flex flex-wrap gap-1.5">
              <span
                v-for="chip in [`Jenjang ${item.level}`, item.location, item.city, `Kuota ${item.quota}`]"
                :key="chip"
                class="rounded-full border border-line bg-background px-2.5 py-0.5 text-[10.5px] font-medium text-body"
              >
                {{ chip }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-line pt-3 sm:w-[186px] sm:flex-col sm:items-stretch sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4"
        >
          <div class="flex items-center gap-2 text-[11px] sm:block">
            <p class="text-muted">Deadline</p>
            <p class="font-medium text-ink">{{ formatDate(item.deadline) }}</p>
          </div>
          <div class="flex items-center gap-2 sm:flex-col sm:items-stretch">
            <BaseBadge :variant="urgencyVariant" size="sm">
              {{ item.days < 0 ? 'Ditutup' : `${item.days} hari lagi` }}
            </BaseBadge>
            <BaseButton
              :variant="primary ? 'soft' : 'outline'"
              size="xs"
              :icon-left="primary ? 'star-filled' : 'star'"
              :disabled="disabled && !selected"
              @click="emit('primary')"
            >
              {{ primary ? 'Beasiswa utama' : 'Jadikan utama' }}
            </BaseButton>
            <BaseButton
              :href="item.website"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="xs"
              icon-right="external-link"
              class="justify-start px-2 text-navy hover:bg-navy-soft"
            >
              Situs resmi
            </BaseButton>
          </div>
        </div>
      </div>

      <div class="mt-4 grid gap-x-6 gap-y-2 border-t border-line pt-3.5 sm:grid-cols-2">
        <div
          v-for="reason in item.reasons"
          :key="reason.label"
          class="flex items-start gap-2 text-[11.5px] leading-relaxed"
        >
          <span
            class="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full"
            :class="reason.ok ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'"
          >
            <AppIcon
              :name="reason.ok ? 'check' : 'alert-triangle'"
              :size="10"
              :stroke-width="2.5"
            />
          </span>
          <p class="min-w-0" :class="'text-body'">
            <span class="font-medium text-ink">{{ reason.label }}:</span>
            {{ reason.text }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
