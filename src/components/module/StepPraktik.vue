<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AiFeedbackPanel from './AiFeedbackPanel.vue'
import AiMentorChat from './AiMentorChat.vue'
import IdeaPrompter from './IdeaPrompter.vue'
import { feedbackByRange } from '@/data/aiResponses'
import { feedbackRangeFor, useLearningStore } from '@/stores/learning'

const props = defineProps({
  moduleId: { type: Number, required: true },
  practice: { type: Object, required: true },
  state: { type: Object, required: true },
})

const emit = defineEmits(['back', 'next'])
const learning = useLearningStore()

const text = ref('')
const loading = ref(false)
const feedback = ref(null)
const textarea = ref(null)
const feedbackAnchor = ref(null)
let timer = null

const minChars = computed(() => props.practice.minChars || 50)
const canSubmit = computed(() => text.value.trim().length >= minChars.value && !loading.value)
const submitted = computed(() => props.state.practiceSubmitted)
const attempts = computed(() => props.state.history.length)

function formatStamp(date) {
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildFeedback(score, date) {
  const range = feedbackRangeFor(score)
  const set = feedbackByRange[range][Math.max(0, attempts.value - 1) % 2]
  return { ...set, score, at: formatStamp(date) }
}

onMounted(() => {
  const history = props.state.history
  if (history.length > 0) {
    text.value = history[history.length - 1].text
    feedback.value = {
      ...buildFeedback(props.state.score, new Date(history[history.length - 1].at)),
    }
  }
})

function submit() {
  if (!canSubmit.value) return
  loading.value = true
  timer = setTimeout(() => {
    const score = learning.submitPractice(props.moduleId, text.value.trim())
    feedback.value = buildFeedback(score, new Date())
    loading.value = false
    nextTick(() => {
      feedbackAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, 1600)
}

function insertDraft(draft) {
  const prefix = text.value.trim() ? `${text.value.trim()}\n\n` : ''
  text.value = `${prefix}${draft}`
  textarea.value?.focus()
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <BaseBadge variant="gradient" size="sm">Praktik</BaseBadge>
        <h2 class="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-[22px]">
          Latihan praktik
        </h2>
        <p class="mt-1 max-w-lg text-[11.5px] leading-relaxed text-body">
          Tulis jawabanmu sendiri. Setelah dikirim, AI akan memberi gambaran kekuatan dan bagian
          yang perlu diperbaiki.
        </p>
      </div>
      <BaseBadge :variant="submitted ? 'success' : 'neutral'" size="sm" :dot="submitted">
        {{ submitted ? 1 : 0 }}/1 latihan terkirim
      </BaseBadge>
    </div>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div class="min-w-0 space-y-4">
        <div class="card-surface p-4 sm:p-5">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 class="text-[14px] font-semibold text-ink">{{ practice.title }}</h3>
              <p class="mt-0.5 text-[11px] text-muted">Latihan · minimal {{ minChars }} karakter</p>
            </div>
            <BaseBadge v-if="submitted" variant="success" size="sm" icon="check">Selesai</BaseBadge>
          </div>

          <div class="mt-3 rounded-xl border border-line bg-background/70 p-3.5">
            <p class="text-[9.5px] font-semibold tracking-[0.12em] text-muted uppercase">Instruksi</p>
            <p class="mt-1 text-[11.5px] leading-relaxed text-ink">{{ practice.brief }}</p>
            <p class="mt-2 text-[11.5px] leading-relaxed font-medium text-ink">
              {{ practice.prompt }}
            </p>
          </div>

          <div class="mt-3.5">
            <div class="mb-1.5 flex items-center justify-between">
              <label for="practice-answer" class="text-[11px] font-medium text-ink">
                Jawabanmu <span class="text-danger">*</span>
              </label>
              <span
                class="text-[10px]"
                :class="text.trim().length >= minChars ? 'text-success' : 'text-muted'"
              >
                {{ text.trim().length }}/{{ minChars }} karakter minimum
              </span>
            </div>
            <textarea
              id="practice-answer"
              ref="textarea"
              v-model="text"
              rows="7"
              :placeholder="practice.placeholder"
              class="field-base resize-y text-[12px] leading-relaxed"
              :readonly="loading"
            />
            <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p class="flex items-center gap-1.5 text-[10px] text-muted">
                <AppIcon name="info" :size="12" /> {{ practice.hint }}
              </p>
              <BaseButton
                size="sm"
                :disabled="!canSubmit"
                :icon-left="loading ? 'loader' : 'sparkles'"
                @click="submit"
              >
                <span v-if="loading" class="flex items-center gap-1.5">
                  AI sedang menilai
                  <span class="flex gap-0.5">
                    <span class="size-1 animate-bounce rounded-full bg-ink/50" />
                    <span class="size-1 animate-bounce rounded-full bg-ink/50" style="animation-delay: 120ms" />
                    <span class="size-1 animate-bounce rounded-full bg-ink/50" style="animation-delay: 240ms" />
                  </span>
                </span>
                <template v-else>{{ submitted ? 'Submit ulang' : 'Kirim' }}</template>
              </BaseButton>
            </div>
          </div>

          <div class="mt-3 flex items-start gap-2 rounded-xl bg-surface-alt/70 p-2.5">
            <AppIcon name="shield" :size="13" class="mt-0.5 shrink-0 text-navy" />
            <p class="text-[10px] leading-relaxed text-body">
              Jangan menuliskan data sensitif seperti NIK, nomor rekening, atau alamat lengkap.
              Latihan ini hanya untuk melatih cara berpikir dan menulis.
            </p>
          </div>

          <div class="mt-3 border-t border-line pt-3">
            <p class="text-[9.5px] font-semibold tracking-[0.12em] text-muted uppercase">
              Yang dinilai AI
            </p>
            <ul class="mt-1.5 grid gap-1 sm:grid-cols-2">
              <li
                v-for="rubric in practice.rubric"
                :key="rubric"
                class="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-body"
              >
                <AppIcon name="check" :size="11" class="mt-0.5 shrink-0 text-success" />
                {{ rubric }}
              </li>
            </ul>
          </div>
        </div>

        <div ref="feedbackAnchor">
          <div v-if="loading" class="card-surface p-5">
            <div class="flex items-center gap-3">
              <span class="grad-primary grid size-10 place-items-center rounded-xl text-ink">
                <AppIcon name="loader" :size="19" class="animate-spin" />
              </span>
              <div>
                <p class="text-[12.5px] font-semibold text-ink">AI sedang menilai...</p>
                <p class="text-[10.5px] text-muted">Membaca kekuatan dan bagian yang perlu diperbaiki.</p>
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div class="h-2.5 w-full animate-pulse rounded-full bg-surface-alt" />
              <div class="h-2.5 w-11/12 animate-pulse rounded-full bg-surface-alt" />
              <div class="h-2.5 w-8/12 animate-pulse rounded-full bg-surface-alt" />
            </div>
          </div>

          <Transition v-else name="pop">
            <AiFeedbackPanel
              v-if="feedback"
              :feedback="feedback"
              :history="state.history"
            />
            <div v-else class="rounded-2xl border border-dashed border-line bg-background/40 p-5 text-center">
              <p class="text-[11.5px] text-body">
                Feedback AI akan muncul di sini setelah kamu mengirim jawaban.
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="min-w-0 space-y-3">
        <IdeaPrompter @insert="insertDraft" />
        <AiMentorChat />
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <BaseButton variant="ghost" size="sm" icon-left="arrow-left" @click="emit('back')">
        Kembali
      </BaseButton>
      <BaseButton :disabled="!submitted" icon-right="arrow-right" @click="emit('next')">
        Lanjut ke checkpoint
      </BaseButton>
    </div>
  </div>
</template>
