import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { scholarships, daysUntil, formatDate } from '@/data/scholarships'
import { useProfileStore } from './profile'

const STORAGE_KEY = 'skular.scholarship.v1'
const MAX_SELECTED = 5

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
 * Skor match frontend: mulai dari 96 lalu dikurangi untuk setiap syarat
 * yang tidak terpenuhi.
 */
export function matchScholarship(scholarship, form) {
  const reasons = []
  let score = 96
  const target = form.target || form.level
  const gpa = form.gpa === '' ? null : Number(form.gpa)
  const age = form.age === '' ? null : Number(form.age)
  const days = daysUntil(scholarship.deadline)

  if (target) {
    const ok = target === scholarship.level
    if (!ok) score -= 22
    reasons.push({
      ok,
      label: 'Jenjang',
      text: ok
        ? `Target ${target} kamu sesuai dengan program ${scholarship.level}.`
        : `Program ini untuk ${scholarship.level}, sedangkan targetmu ${target}.`,
    })
  } else {
    reasons.push({
      ok: false,
      label: 'Jenjang',
      text: 'Lengkapi jenjang targetmu agar kecocokan bisa dihitung.',
    })
  }

  if (gpa !== null) {
    const ok = gpa >= scholarship.minGpa
    if (!ok) score -= 18
    reasons.push({
      ok,
      label: 'IPK',
      text: ok
        ? `IPK kamu (${gpa.toFixed(2)}) memenuhi syarat minimum (${scholarship.minGpa.toFixed(2)}).`
        : `IPK kamu (${gpa.toFixed(2)}) masih di bawah syarat minimum (${scholarship.minGpa.toFixed(2)}).`,
    })
  } else {
    reasons.push({ ok: false, label: 'IPK', text: 'IPK belum diisi pada profilmu.' })
  }

  if (age !== null) {
    const ok = age <= scholarship.maxAge
    if (!ok) score -= 14
    reasons.push({
      ok,
      label: 'Usia',
      text: ok
        ? `Usia kamu (${age} tahun) masih dalam batas maksimal ${scholarship.maxAge} tahun.`
        : `Usia kamu (${age} tahun) melewati batas maksimal ${scholarship.maxAge} tahun.`,
    })
  } else {
    reasons.push({ ok: false, label: 'Usia', text: 'Usia belum diisi pada profilmu.' })
  }

  if (scholarship.requiresSktm) {
    const ok = form.sktm === 'ya'
    if (!ok) score -= 12
    reasons.push({
      ok,
      label: 'SKTM',
      text: ok
        ? 'Dokumen SKTM yang kamu miliki dibutuhkan untuk beasiswa ini.'
        : 'Beasiswa ini membutuhkan SKTM, sedangkan kamu belum memilikinya.',
    })
  } else {
    reasons.push({
      ok: true,
      label: 'SKTM',
      text: 'Beasiswa ini tidak mewajibkan SKTM.',
    })
  }

  if (form.location) {
    const ok = form.location === scholarship.location
    if (!ok) score -= 10
    reasons.push({
      ok,
      label: 'Lokasi',
      text: ok
        ? `Lokasi tujuanmu (${form.location}) sesuai dengan penawaran beasiswa.`
        : `Beasiswa ini untuk ${scholarship.location}, sedangkan pilihanmu ${form.location}.`,
    })
  } else {
    reasons.push({ ok: false, label: 'Lokasi', text: 'Lokasi tujuan belum diisi pada profilmu.' })
  }

  const fieldOpen = !scholarship.fields || scholarship.fields.length === 0
  if (fieldOpen) {
    reasons.push({
      ok: true,
      label: 'Bidang',
      text: 'Beasiswa ini terbuka untuk semua bidang studi.',
    })
  } else {
    const ok = scholarship.fields.includes(form.field)
    if (!ok) score -= 6
    reasons.push({
      ok,
      label: 'Bidang',
      text: ok
        ? `Bidang ${form.field} termasuk dalam rumpun yang diprioritaskan.`
        : `Bidang ${form.field || 'pilihanmu'} tidak termasuk prioritas beasiswa ini.`,
    })
  }

  const deadlineOk = days >= 7
  if (days < 0) score -= 30
  else if (!deadlineOk) score -= 4
  reasons.push({
    ok: days >= 0 && deadlineOk,
    label: 'Deadline',
    text:
      days < 0
        ? `Deadline ${formatDate(scholarship.deadline)} sudah lewat.`
        : `Deadline ${formatDate(scholarship.deadline)} — ${days} hari lagi.`,
  })

  return {
    score: Math.max(30, Math.min(99, score)),
    reasons,
    days,
    label: score >= 95 ? 'Sangat Cocok' : score >= 80 ? 'Cocok' : 'Kurang Cocok',
    eligible: score >= 80,
  }
}

export const useScholarshipStore = defineStore('scholarship', () => {
  const profile = useProfileStore()
  const saved = loadState()

  const selectedIds = ref(Array.isArray(saved?.selectedIds) ? saved.selectedIds : [])
  const primaryId = ref(saved?.primaryId || null)

  const matches = computed(() =>
    scholarships
      .map((item) => ({ ...item, ...matchScholarship(item, profile.form) }))
      .sort((a, b) => b.score - a.score || a.days - b.days),
  )

  const selectedMatches = computed(() =>
    matches.value.filter((item) => selectedIds.value.includes(item.id)),
  )

  const primary = computed(() => {
    const chosen = matches.value.find(
      (item) => item.id === primaryId.value && selectedIds.value.includes(item.id),
    )
    return chosen || selectedMatches.value[0] || null
  })

  const selectedCount = computed(() => selectedIds.value.length)
  const canSelectMore = computed(() => selectedIds.value.length < MAX_SELECTED)

  function isSelected(id) {
    return selectedIds.value.includes(id)
  }

  function toggleSelection(id) {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter((item) => item !== id)
      if (primaryId.value === id) {
        primaryId.value = selectedIds.value[0] || null
      }
      return true
    }
    if (!canSelectMore.value) return false
    selectedIds.value = [...selectedIds.value, id]
    return true
  }

  function setPrimary(id) {
    if (!selectedIds.value.includes(id)) {
      if (!canSelectMore.value) return false
      selectedIds.value = [...selectedIds.value, id]
    }
    primaryId.value = id
    return true
  }

  function commitSelection() {
    if (selectedIds.value.length === 0) return false
    if (!primaryId.value || !selectedIds.value.includes(primaryId.value)) {
      primaryId.value = selectedIds.value[0]
    }
    return true
  }

  function reset() {
    selectedIds.value = []
    primaryId.value = null
  }

  watch(
    [selectedIds, primaryId],
    () => saveState({ selectedIds: selectedIds.value, primaryId: primaryId.value }),
    { deep: true },
  )

  return {
    maxSelected: MAX_SELECTED,
    selectedIds,
    primaryId,
    matches,
    selectedMatches,
    primary,
    selectedCount,
    canSelectMore,
    isSelected,
    toggleSelection,
    setPrimary,
    commitSelection,
    reset,
  }
})
