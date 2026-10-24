<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ModuleFeedbackForm from './ModuleFeedbackForm.vue'
import { useLearningStore } from '@/stores/learning'

const props = defineProps({
  moduleId: { type: Number, required: true },
  moduleTitle: { type: String, default: '' },
  state: { type: Object, required: true },
  nextModuleId: { type: Number, default: null },
  nextModuleTitle: { type: String, default: '' },
})

const emit = defineEmits(['back', 'next'])

const learning = useLearningStore()
const showModal = ref(false)
const toast = ref(false)
let toastTimer = null

const checkpoint = computed(() => props.state.checkpoint)
const nextLabel = computed(() =>
  props.nextModuleId ? 'Lanjut ke modul berikutnya' : 'Kembali ke dashboard',
)

function confirmCheckpoint() {
  learning.completeCheckpoint(props.moduleId)
  showModal.value = false
  toast.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = false
  }, 9000)
}

function goNext() {
  toast.value = false
  emit('next')
}

onBeforeUnmount(() => clearTimeout(toastTimer))
</script>

<template>
  <div class="space-y-4">
    <div>
      <BaseBadge variant="navy" size="sm">Checkpoint</BaseBadge>
      <h2 class="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-[22px]">
        Kunci progresmu
      </h2>
      <p class="mt-1 max-w-lg text-[11.5px] leading-relaxed text-body">
        Setelah modul ini dikunci, halaman roadmap akan mencatat progresmu dan membuka modul
        berikutnya.
      </p>
    </div>

    <div class="grid gap-2.5 sm:grid-cols-3">
      <div class="card-surface p-4">
        <p class="label-xs">Latihan praktik</p>
        <p class="font-display mt-1.5 text-2xl leading-none font-extrabold text-ink">
          {{ state.practiceSubmitted ? 1 : 0 }}/1
        </p>
        <p class="mt-1 text-[10.5px] text-muted">
          {{ state.practiceSubmitted ? 'Terkirim untuk dinilai AI' : 'Belum ada latihan terkirim' }}
        </p>
      </div>
      <div class="card-surface p-4">
        <p class="label-xs">Rata-rata skor AI</p>
        <p class="font-display mt-1.5 text-2xl leading-none font-extrabold text-ink">
          {{ state.score ?? '-' }}
        </p>
        <p class="mt-1 text-[10.5px] text-muted">
          {{ state.score ? `Dari ${state.history.length} percobaan` : 'Belum ada skor' }}
        </p>
      </div>
      <div class="card-surface p-4">
        <p class="label-xs">Status checkpoint</p>
        <p
          class="font-display mt-1.5 flex items-center gap-1.5 text-[17px] leading-none font-extrabold"
          :class="checkpoint ? 'text-success' : 'text-ink'"
        >
          {{ checkpoint ? 'Terkunci' : 'Belum dikunci' }}
          <AppIcon v-if="checkpoint" name="check-circle" :size="17" />
        </p>
        <p class="mt-1 text-[10.5px] text-muted">
          {{ checkpoint ? 'Modul sudah selesai' : 'Selesaikan untuk membuka modul berikutnya' }}
        </p>
      </div>
    </div>

    <!-- Completion card -->
    <div
      class="relative overflow-hidden rounded-3xl border p-5"
      :class="checkpoint ? 'border-success/25 bg-success-soft' : 'border-line bg-background'"
    >
      <div class="pointer-events-none absolute -top-10 -right-6 size-32 rounded-full bg-gold/20 blur-xl" />
      <div class="relative flex flex-wrap items-center justify-between gap-4">
        <div class="max-w-lg">
          <p class="label-xs">{{ checkpoint ? 'Modul selesai' : 'Checkpoint modul' }}</p>
          <h3 class="mt-1.5 flex items-center gap-2 text-[15px] font-semibold text-ink">
            <AppIcon v-if="checkpoint" name="check-circle" :size="18" class="text-success" />
            {{
              checkpoint
                ? 'Progresmu sudah terkunci.'
                : 'Sudah puas dengan hasil praktikmu?'
            }}
          </h3>
          <p class="mt-1 text-[11.5px] leading-relaxed text-body">
            {{
              checkpoint
                ? nextModuleId
                  ? `Modul berikutnya sudah terbuka: ${nextModuleTitle}`
                  : 'Kamu sudah menyelesaikan seluruh modul di roadmap ini.'
                : 'Tandai modul selesai setelah kamu merasa jawaban dan pemahamanmu sudah cukup. Kamu tetap bisa membuka modul ini lagi nanti.'
            }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <BaseButton
            v-if="!checkpoint"
            size="sm"
            :disabled="!state.practiceSubmitted"
            icon-right="check"
            @click="showModal = true"
          >
            Tandai modul selesai
          </BaseButton>
          <BaseButton
            v-else
            size="sm"
            icon-right="arrow-right"
            @click="goNext"
          >
            {{ nextLabel }}
          </BaseButton>
          <BaseButton variant="ghost" size="sm" icon-left="arrow-left" @click="emit('back')">
            Kembali ke praktik
          </BaseButton>
        </div>
      </div>
    </div>

    <ModuleFeedbackForm :module-id="moduleId" :existing="state.feedbackForm" />

    <div class="flex items-center justify-between gap-2 pt-1">
      <BaseButton variant="ghost" size="sm" icon-left="arrow-left" @click="emit('back')">
        Kembali ke praktik
      </BaseButton>
      <BaseButton v-if="checkpoint" size="sm" icon-right="arrow-right" @click="goNext">
        {{ nextLabel }}
      </BaseButton>
    </div>

    <!-- Confirm modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-[70] grid place-items-center bg-ink/45 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkpoint-title"
          @click.self="showModal = false"
        >
          <div class="w-full max-w-sm rounded-3xl border border-line bg-white p-5 shadow-2xl">
            <span class="grad-primary grid size-11 place-items-center rounded-xl text-ink">
              <AppIcon name="check-circle" :size="21" />
            </span>
            <h3 id="checkpoint-title" class="mt-3 text-lg font-semibold text-ink">
              Tandai modul selesai?
            </h3>
            <p class="mt-1.5 text-[11.5px] leading-relaxed text-body">
              Progres modul akan menjadi 100%, modul berikutnya terbuka, dan skor terakhirmu
              tersimpan di dashboard.
            </p>
            <div class="mt-4 flex justify-end gap-2">
              <BaseButton variant="ghost" size="sm" @click="showModal = false">Batal</BaseButton>
              <BaseButton size="sm" icon-right="check" @click="confirmCheckpoint">
                Ya, tandai selesai
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Success toast -->
    <Teleport to="body">
      <Transition name="pop">
        <div
          v-if="toast"
          class="fixed right-4 bottom-4 z-[80] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-success/25 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(23,43,70,0.45)]"
        >
          <div class="flex items-start gap-2.5">
            <span class="grid size-8 shrink-0 place-items-center rounded-full bg-success-soft text-success">
              <AppIcon name="check" :size="16" :stroke-width="2.6" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[12.5px] font-semibold text-ink">Modul selesai! 🎉</p>
              <p class="mt-0.5 text-[11px] leading-relaxed text-body">
                {{
                  nextModuleId
                    ? 'Modul berikutnya sudah terbuka di roadmap.'
                    : 'Semua modul sudah kamu selesaikan.'
                }}
              </p>
              <BaseButton size="xs" class="mt-2.5" icon-right="arrow-right" @click="goNext">
                {{ nextLabel }}
              </BaseButton>
            </div>
            <button
              type="button"
              class="grid size-6 place-items-center rounded-md text-muted hover:bg-background"
              aria-label="Tutup notifikasi"
              @click="toast = false"
            >
              <AppIcon name="x" :size="14" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
