import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'skular.profile.v1'

export const PROFILE_STEPS = [
  { n: 1, key: 'level', name: 'Jenjang', title: 'Jenjang pendidikanmu sekarang' },
  { n: 2, key: 'age', name: 'Usia', title: 'Berapa usiamu saat ini?' },
  { n: 3, key: 'gpa', name: 'IPK', title: 'Bagaimana performa akademikmu?' },
  { n: 4, key: 'sktm', name: 'SKTM', title: 'Apakah kamu punya SKTM?' },
  { n: 5, key: 'target', name: 'Target', title: 'Jenjang apa yang ingin kamu kejar?' },
  { n: 6, key: 'location', name: 'Lokasi', title: 'Di mana kamu ingin belajar?' },
  { n: 7, key: 'field', name: 'Bidang', title: 'Bidang apa yang paling kamu minati?' },
  { n: 8, key: 'phone', name: 'Telepon', title: 'Nomor HP untuk pengingat deadline' },
]

const defaults = {
  level: '',
  age: '',
  gpa: '',
  sktm: '',
  target: '',
  location: '',
  field: '',
  phone: '',
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* localStorage bisa tidak tersedia (mode privat) — abaikan. */
  }
}

export function isStepValid(step, form) {
  switch (step) {
    case 1:
      return Boolean(form.level)
    case 2: {
      const age = Number(form.age)
      return Number.isFinite(age) && form.age !== '' && age >= 14 && age <= 60
    }
    case 3: {
      if (form.gpa === '') return false
      const gpa = Number(form.gpa)
      return Number.isFinite(gpa) && gpa >= 0 && gpa <= 4
    }
    case 4:
      return form.sktm === 'ya' || form.sktm === 'tidak'
    case 5:
      return Boolean(form.target)
    case 6:
      return Boolean(form.location)
    case 7:
      return Boolean(form.field)
    case 8:
      return form.phone.replace(/\D/g, '').length >= 9
    default:
      return false
  }
}

export const useProfileStore = defineStore('profile', () => {
  const saved = loadState()

  const form = ref({ ...defaults, ...(saved?.form || {}) })
  const completed = ref(Boolean(saved?.completed))
  const step = ref(1)

  const isComplete = computed(() => completed.value)
  const canContinue = computed(() => isStepValid(step.value, form.value))

  function setAnswer(key, value) {
    form.value[key] = value
  }

  function isCompleteAnswer(stepNumber) {
    return isStepValid(stepNumber, form.value)
  }

  function goNext() {
    if (step.value >= PROFILE_STEPS.length) return
    if (!isStepValid(step.value, form.value)) return
    step.value += 1
  }

  function goBack() {
    if (step.value <= 1) return
    step.value -= 1
  }

  function finishProfiling() {
    if (!PROFILE_STEPS.every((item) => isStepValid(item.n, form.value))) return false
    completed.value = true
    return true
  }

  function reset() {
    form.value = { ...defaults }
    completed.value = false
    step.value = 1
  }

  watch(
    [form, completed],
    () => saveState({ form: form.value, completed: completed.value }),
    { deep: true },
  )

  return {
    form,
    completed,
    step,
    isComplete,
    canContinue,
    setAnswer,
    isCompleteAnswer,
    goNext,
    goBack,
    finishProfiling,
    reset,
  }
})
