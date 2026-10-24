<script setup>
import { computed, reactive } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'

const props = defineProps({
  content: { type: Object, required: true },
})

const emit = defineEmits(['back', 'next'])

const answers = reactive({})
const questions = computed(() => props.content.questions)
const answeredCount = computed(
  () => questions.value.filter((question) => answers[question.id]).length,
)
const correctCount = computed(
  () =>
    questions.value.filter((question) => answers[question.id]).filter(
      (question) => answers[question.id] === question.answer,
    ).length,
)
const allAnswered = computed(() => answeredCount.value === questions.value.length)
const percent = computed(() =>
  questions.value.length ? Math.round((correctCount.value / questions.value.length) * 100) : 0,
)

function choose(question, choice) {
  if (answers[question.id]) return
  answers[question.id] = choice
}

function choiceClass(question, choice) {
  const answered = answers[question.id]
  if (!answered) {
    return 'border-line bg-white text-body hover:border-gold-deep hover:text-ink'
  }
  if (choice === question.answer) return 'border-success bg-success-soft text-success'
  if (answered === choice) return 'border-danger bg-danger-soft text-danger'
  return 'border-line bg-white text-muted/70'
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <BaseBadge variant="gradient" size="sm">Quick Question</BaseBadge>
        <h2 class="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-[22px]">
          Uji pemahamanmu
        </h2>
        <p class="mt-1 text-[11.5px] text-body">
          Pilih <span class="font-medium text-ink">Benar</span> atau
          <span class="font-medium text-ink">Salah</span>. Feedback muncul langsung.
        </p>
      </div>
      <span class="text-[10.5px] font-medium text-muted">
        {{ answeredCount }}/{{ questions.length }} dijawab
      </span>
    </div>

    <div class="card-surface flex flex-wrap items-center gap-4 p-4 sm:p-5">
      <ProgressRing :value="percent" :size="82" :stroke="7">
        <div class="text-center">
          <p class="text-[17px] leading-none font-bold text-ink">{{ correctCount }}</p>
          <p class="text-[8px] tracking-[0.1em] text-muted uppercase">benar</p>
        </div>
      </ProgressRing>
      <div class="min-w-0 flex-1">
        <p class="text-[13px] font-semibold text-ink">
          {{ correctCount }} dari {{ questions.length }} benar
        </p>
        <p class="mt-1 max-w-md text-[11.5px] leading-relaxed text-body">
          <template v-if="!allAnswered">
            Jawab semua pernyataan untuk melihat rangkuman. Tidak apa-apa kalau ada yang salah.
          </template>
          <template v-else-if="correctCount === questions.length">
            Pemahamanmu sudah kuat. Lanjut ke praktik dan tuliskan versimu sendiri.
          </template>
          <template v-else>
            Baca lagi penjelasannya, lalu lanjut ke praktik.
          </template>
        </p>
      </div>
      <BaseBadge v-if="allAnswered" :variant="correctCount === questions.length ? 'success' : 'warning'" size="sm">
        {{ correctCount === questions.length ? 'Sempurna' : 'Perlu ditinjau' }}
      </BaseBadge>
    </div>

    <div class="space-y-2.5">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="card-surface overflow-hidden p-4 transition-colors duration-200 sm:p-5"
        :class="
          answers[question.id]
            ? answers[question.id] === question.answer
              ? 'border-success/50'
              : 'border-danger/40'
            : ''
        "
      >
        <div class="flex items-start gap-3">
          <span
            class="grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold"
            :class="
              answers[question.id]
                ? answers[question.id] === question.answer
                  ? 'bg-success text-white'
                  : 'bg-danger text-white'
                : 'border border-line bg-background text-muted'
            "
          >
            {{ index + 1 }}
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[12.5px] leading-relaxed font-medium text-ink sm:text-[13px]">
              {{ question.statement }}
            </p>

            <div class="mt-3 flex gap-2">
              <button
                v-for="choice in ['Benar', 'Salah']"
                :key="choice"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg border px-4 py-1.5 text-[11.5px] font-medium transition disabled:cursor-default"
                :class="choiceClass(question, choice)"
                :disabled="Boolean(answers[question.id])"
                @click="choose(question, choice)"
              >
                <AppIcon
                  :name="choice === 'Benar' ? 'check' : 'x'"
                  :size="12"
                  :stroke-width="2.4"
                />
                {{ choice }}
              </button>
            </div>

            <Transition name="pop">
              <div
                v-if="answers[question.id]"
                class="mt-3 rounded-xl p-3"
                :class="
                  answers[question.id] === question.answer
                    ? 'bg-success-soft'
                    : 'bg-danger-soft'
                "
              >
                <p
                  class="flex items-center gap-1.5 text-[11.5px] font-semibold"
                  :class="
                    answers[question.id] === question.answer ? 'text-success' : 'text-danger'
                  "
                >
                  <AppIcon
                    :name="answers[question.id] === question.answer ? 'check-circle' : 'alert-triangle'"
                    :size="14"
                  />
                  {{
                    answers[question.id] === question.answer
                      ? 'Benar!'
                      : `Belum tepat. Jawaban yang tepat: ${question.answer}.`
                  }}
                </p>
                <p class="mt-1 text-[11px] leading-relaxed text-body">{{ question.explanation }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <BaseButton variant="ghost" size="sm" icon-left="arrow-left" @click="emit('back')">
        Kembali
      </BaseButton>
      <div class="flex items-center gap-3">
        <span class="hidden text-[10.5px] text-muted sm:inline">{{ questions.length }} pernyataan</span>
        <BaseButton :disabled="!allAnswered" icon-right="arrow-right" @click="emit('next')">
          Lanjut ke Praktik
        </BaseButton>
      </div>
    </div>
  </div>
</template>
