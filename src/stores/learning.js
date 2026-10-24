import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { modules, phases, totalModules } from '@/data/curriculum'

const STORAGE_KEY = 'skular.learning.v1'

export const MODULE_STEPS = ['Pembukaan', 'Pahami', 'Quick Question', 'Praktik', 'Checkpoint']
export const MODULE_STEP_KEYS = ['pembukaan', 'pahami', 'quick', 'praktik', 'checkpoint']

function blankModule() {
  return {
    maxStep: 1,
    practiceSubmitted: false,
    score: null,
    history: [],
    checkpoint: false,
    feedback: null,
    feedbackForm: null,
  }
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
    /* abaikan */
  }
}

/**
 * Skor dummy: panjang teks + angka/tahun + kata kunci personal,
 * lalu di-clamp ke 35–92.
 */
export function scorePractice(text) {
  const clean = (text || '').trim()
  if (clean.length < 20) return 35
  const words = clean.split(/\s+/).filter(Boolean).length
  let score = 38
  score += Math.min(26, Math.round(words * 0.55))
  if (/\d/.test(clean)) score += 5
  if (/\b20\d{2}\b/.test(clean)) score += 4
  if (/\b(saya|aku)\s+(pernah|ingin|bermimpi|percaya|mulai|membantu|belajar)\b/i.test(clean)) {
    score += 9
  }
  if (/\b(beasiswa|motivasi|tujuan|masa depan|kontribusi)\b/i.test(clean)) score += 5
  const sentences = clean.split(/[.!?]+/).filter((part) => part.trim().length > 0).length
  if (sentences >= 3) score += 5
  return Math.max(35, Math.min(92, score))
}

export function feedbackRangeFor(score) {
  if (score === null || score === undefined) return 'mid'
  if (score < 60) return 'low'
  if (score < 80) return 'mid'
  return 'high'
}

export const useLearningStore = defineStore('learning', () => {
  const saved = loadState()

  const states = ref(saved?.states && typeof saved.states === 'object' ? saved.states : {})
  const openModuleId = ref(Number(saved?.openModuleId) || 1)

  function ensure(id) {
    const key = Number(id)
    if (!states.value[key]) {
      states.value[key] = blankModule()
    }
    return states.value[key]
  }

  function stateFor(id) {
    return states.value[Number(id)] || blankModule()
  }

  function isCompleted(id) {
    return Boolean(states.value[Number(id)]?.checkpoint)
  }

  function isUnlocked(id) {
    const index = modules.findIndex((module) => module.id === Number(id))
    if (index <= 0) return index === 0
    return isCompleted(modules[index - 1].id)
  }

  function progressFor(id) {
    const state = states.value[Number(id)]
    if (!state) return 0
    if (state.checkpoint) return 100
    return Math.min(75, Math.max(0, (state.maxStep - 1) * 25))
  }

  function statusFor(id) {
    if (isCompleted(id)) return 'selesai'
    if (isUnlocked(id) && activeModuleId.value === Number(id)) return 'berjalan'
    if (isUnlocked(id)) return 'berjalan'
    return 'terkunci'
  }

  const completedCount = computed(
    () => modules.filter((module) => isCompleted(module.id)).length,
  )
  const intiCompleted = computed(
    () => modules.filter((module) => module.type === 'inti' && isCompleted(module.id)).length,
  )
  const templateCompleted = computed(
    () => modules.filter((module) => module.type === 'template' && isCompleted(module.id)).length,
  )
  const averageScore = computed(() => {
    const scores = Object.values(states.value)
      .map((state) => state.score)
      .filter((score) => typeof score === 'number')
    if (scores.length === 0) return null
    return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
  })
  const totalProgress = computed(() =>
    Math.round((completedCount.value / totalModules) * 100),
  )

  const activeModuleId = computed(() => {
    const next = modules.find((module) => !isCompleted(module.id) && isUnlocked(module.id))
    return next ? next.id : modules[modules.length - 1].id
  })

  function phaseStats(phaseId) {
    const phase = phases.find((item) => item.id === phaseId)
    if (!phase) return { done: 0, total: 0 }
    return {
      done: phase.moduleIds.filter((id) => isCompleted(id)).length,
      total: phase.moduleIds.length,
    }
  }

  function startModule(id) {
    openModuleId.value = Number(id)
    ensure(id)
  }

  function openStep(id, stepIndex) {
    const state = ensure(id)
    const next = Math.max(1, Math.min(MODULE_STEPS.length, stepIndex))
    state.maxStep = Math.max(state.maxStep, next)
  }

  function submitPractice(id, text) {
    const state = ensure(id)
    const score = scorePractice(text)
    state.practiceSubmitted = true
    state.score = score
    state.history = [
      ...state.history,
      {
        score,
        text,
        at: new Date().toISOString(),
      },
    ]
    state.maxStep = Math.max(state.maxStep, 4)
    return score
  }

  function completeCheckpoint(id) {
    const state = ensure(id)
    state.checkpoint = true
    state.maxStep = MODULE_STEPS.length
    return nextModuleIdFor(id)
  }

  function nextModuleIdFor(id) {
    const index = modules.findIndex((module) => module.id === Number(id))
    return modules[index + 1]?.id || null
  }

  function saveModuleFeedback(id, payload) {
    const state = ensure(id)
    state.feedbackForm = { ...payload, at: new Date().toISOString() }
  }

  function reset() {
    states.value = {}
    openModuleId.value = 1
  }

  watch(
    [states, openModuleId],
    () => saveState({ states: states.value, openModuleId: openModuleId.value }),
    { deep: true },
  )

  return {
    states,
    openModuleId,
    totalModules,
    completedCount,
    intiCompleted,
    templateCompleted,
    averageScore,
    totalProgress,
    activeModuleId,
    stateFor,
    ensure,
    isCompleted,
    isUnlocked,
    progressFor,
    statusFor,
    phaseStats,
    startModule,
    openStep,
    submitPractice,
    completeCheckpoint,
    nextModuleIdFor,
    saveModuleFeedback,
    reset,
  }
})
