<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useLearningStore } from '@/stores/learning'

const props = defineProps({
  moduleId: { type: Number, required: true },
  existing: { type: Object, default: null },
})

const learning = useLearningStore()

const options = [
  'Materi mudah dipahami',
  'Materi relevan',
  'AI feedback membantu',
  'Durasi sesuai',
  'Praktik membantu',
]

const selected = ref(props.existing?.tags ? [...props.existing.tags] : [])
const note = ref(props.existing?.note || '')
const submitted = ref(Boolean(props.existing))

function toggle(option) {
  if (submitted.value) return
  selected.value = selected.value.includes(option)
    ? selected.value.filter((item) => item !== option)
    : [...selected.value, option]
}

function submit() {
  if (selected.value.length === 0) return
  learning.saveModuleFeedback(props.moduleId, {
    tags: [...selected.value],
    note: note.value.trim(),
  })
  submitted.value = true
}
</script>

<template>
  <div class="card-surface p-4 sm:p-5">
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="label-xs">Feedback modul</p>
        <h3 class="mt-1 text-[15px] font-semibold text-ink">Gimana modulnya?</h3>
        <p class="mt-0.5 text-[11px] text-body">
          Bantu kami membuat modul berikutnya lebih berguna.
        </p>
      </div>
      <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-gold-light text-navy-dark">
        <AppIcon name="chat" :size="16" />
      </span>
    </div>

    <Transition name="page" mode="out-in">
      <div v-if="submitted" key="thanks" class="mt-4 rounded-2xl border border-success/20 bg-success-soft p-4">
        <p class="flex items-center gap-2 text-[12.5px] font-semibold text-success">
          <AppIcon name="check-circle" :size="16" /> Terima kasih!
        </p>
        <p class="mt-1 text-[11px] leading-relaxed text-body">
          Masukanmu sudah kami simpan secara anonim.
          <template v-if="selected.length">Topik yang kamu pilih: {{ selected.join(', ') }}.</template>
        </p>
      </div>

      <div v-else key="form" class="mt-3">
        <div class="grid gap-2 sm:grid-cols-2">
          <button
            v-for="option in options"
            :key="option"
            type="button"
            role="checkbox"
            :aria-checked="selected.includes(option)"
            class="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[11.5px] font-medium transition"
            :class="
              selected.includes(option)
                ? 'border-gold-deep bg-background text-ink'
                : 'border-line bg-white text-body hover:border-gold-deep/50'
            "
            @click="toggle(option)"
          >
            <span
              class="grid size-4 shrink-0 place-items-center rounded border transition"
              :class="
                selected.includes(option)
                  ? 'grad-primary border-transparent text-ink'
                  : 'border-line bg-white text-transparent'
              "
            >
              <AppIcon name="check" :size="10" :stroke-width="3" />
            </span>
            {{ option }}
          </button>
        </div>

        <label for="module-note" class="mt-3 block text-[11px] font-medium text-ink">
          Saran untuk modul ini (opsional)
        </label>
        <textarea
          id="module-note"
          v-model="note"
          rows="2"
          placeholder="Contoh: bagian contoh esai bisa ditambah satu lagi."
          class="field-base mt-1 resize-y text-[11.5px]"
        />

        <div class="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <p class="flex items-center gap-1.5 text-[10px] text-muted">
            <AppIcon name="shield" :size="12" /> Masukanmu bersifat anonim di laporan admin.
          </p>
          <BaseButton size="sm" :disabled="selected.length === 0" @click="submit">
            Kirim feedback modul
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>
