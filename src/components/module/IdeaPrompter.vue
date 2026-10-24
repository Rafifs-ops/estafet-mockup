<script setup>
import { computed, reactive, ref } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { ideaPrompts } from '@/data/aiResponses'

const emit = defineEmits(['insert'])

const open = ref(false)
const answers = reactive({})
const draft = ref('')

const filled = computed(() =>
  ideaPrompts.every((prompt) => (answers[prompt.id] || '').trim().length > 2),
)

function generate() {
  if (!filled.value) return
  const moment = answers.moment.trim().replace(/[.]+$/, '')
  const lesson = answers.lesson.trim().replace(/[.]+$/, '')
  const goal = answers.goal.trim().replace(/[.]+$/, '')
  draft.value =
    `Saya pernah ${moment}. Dari pengalaman itu saya belajar bahwa ${lesson}. ` +
    'Hal ini membuat saya ingin mendalami bidang yang saya pilih dan melanjutkan studi di jenjang yang lebih tinggi. ' +
    `Setelah lulus, saya berencana ${goal}.`
}

function insert() {
  if (!draft.value) return
  emit('insert', draft.value)
}
</script>

<template>
  <div class="card-surface overflow-hidden">
    <button
      type="button"
      class="flex w-full items-center gap-2.5 p-4 text-left"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-gold-light text-navy-dark">
        <AppIcon name="lightbulb" :size="16" />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-[12px] leading-snug font-semibold text-ink">
          Butuh pemicu ide sebelum menulis?
        </span>
        <span class="mt-0.5 block">
          <BaseBadge variant="neutral" size="sm">Pertanyaan pemancing</BaseBadge>
        </span>
      </span>
      <AppIcon
        name="chevron-down"
        :size="16"
        class="shrink-0 text-muted transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <Transition name="pop">
      <div v-if="open" class="border-t border-line bg-background/40 p-4">
        <div class="space-y-2.5">
          <div v-for="prompt in ideaPrompts" :key="prompt.id">
            <label :for="`idea-${prompt.id}`" class="block text-[10.5px] font-medium text-ink">
              {{ prompt.label }}
            </label>
            <input
              :id="`idea-${prompt.id}`"
              v-model="answers[prompt.id]"
              type="text"
              :placeholder="prompt.placeholder"
              class="field-base mt-1 py-2 text-[11.5px]"
            />
          </div>
        </div>

        <BaseButton
          variant="outline"
          size="sm"
          class="mt-3 w-full"
          icon-left="sparkles"
          :disabled="!filled"
          @click="generate"
        >
          Susun kerangka draf
        </BaseButton>

        <Transition name="pop">
          <div v-if="draft" class="mt-3 rounded-xl border border-gold-deep/30 bg-white p-3">
            <p class="label-xs text-[9px]">Kerangka draf</p>
            <p class="mt-1.5 text-[11px] leading-relaxed text-body">{{ draft }}</p>
            <BaseButton size="xs" class="mt-2.5" icon-left="arrow-right" @click="insert">
              Sisipkan ke jawaban
            </BaseButton>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
