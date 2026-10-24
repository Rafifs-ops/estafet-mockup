<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ScholarshipMatchCard from '@/components/scholarship/ScholarshipMatchCard.vue'
import { useProfileStore } from '@/stores/profile'
import { useScholarshipStore } from '@/stores/scholarship'
import { useLearningStore } from '@/stores/learning'

const router = useRouter()
const profile = useProfileStore()
const scholarship = useScholarshipStore()
const learning = useLearningStore()

const limitNotice = ref('')
let noticeTimer = null

const profileSummary = computed(() => {
  const form = profile.form
  return [
    form.target ? `Target ${form.target}` : form.level ? `Jenjang ${form.level}` : null,
    form.gpa !== '' ? `IPK ${Number(form.gpa).toFixed(2)}` : null,
    form.age !== '' ? `${form.age} tahun` : null,
    form.location || null,
    form.field || null,
    form.sktm === 'ya' ? 'Punya SKTM' : null,
  ].filter(Boolean)
})

function showLimit() {
  limitNotice.value = `Maksimal ${scholarship.maxSelected} beasiswa bisa dipilih. Hapus salah satu untuk menambahkan yang lain.`
  clearTimeout(noticeTimer)
  noticeTimer = setTimeout(() => {
    limitNotice.value = ''
  }, 3500)
}

function toggle(id) {
  const ok = scholarship.toggleSelection(id)
  if (!ok) showLimit()
}

function setPrimary(id) {
  const ok = scholarship.setPrimary(id)
  if (!ok) showLimit()
}

function startLearning() {
  if (!scholarship.selectedCount) return
  if (!scholarship.commitSelection()) return
  learning.startModule(1)
  router.push('/dashboard')
}

onBeforeUnmount(() => clearTimeout(noticeTimer))
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div class="max-w-xl">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy-soft px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-navy uppercase"
        >
          <AppIcon name="sparkles" :size="13" /> Scholarship matching
        </span>
        <h1 class="font-display mt-3 text-[30px] leading-tight font-extrabold tracking-tight text-ink sm:text-[38px]">
          Beasiswa yang cocok untukmu
        </h1>
        <p class="mt-2 text-[13px] leading-relaxed text-body sm:text-[13.5px]">
          {{ scholarship.matches.length }} beasiswa diurutkan dari skor kecocokan tertinggi.
          Centang yang ingin kamu kejar, lalu jadikan satu sebagai beasiswa utama.
        </p>
      </div>
      <BaseButton to="/profiling/1" variant="outline" size="sm" icon-left="edit">
        Edit profil
      </BaseButton>
    </header>

    <div class="mt-4 flex flex-wrap items-center gap-1.5">
      <span class="mr-1 text-[10.5px] font-semibold tracking-[0.12em] text-muted uppercase">
        Profilmu
      </span>
      <span
        v-for="item in profileSummary"
        :key="item"
        class="rounded-full border border-line bg-white px-2.5 py-1 text-[10.5px] font-medium text-body"
      >
        {{ item }}
      </span>
      <span
        v-if="profileSummary.length === 0"
        class="rounded-full border border-line bg-white px-2.5 py-1 text-[10.5px] text-muted"
      >
        Belum lengkap
      </span>
    </div>

    <div
      v-if="!profile.isComplete"
      class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-warning/25 bg-warning-soft p-3.5 text-[12px] text-warning"
    >
      <p class="flex items-center gap-2">
        <AppIcon name="alert-triangle" :size="16" />
        Profiling belum selesai. Skor kecocokan belum akurat.
      </p>
      <BaseButton to="/profiling/1" variant="soft" size="xs">Lengkapi profil</BaseButton>
    </div>

    <Transition name="pop">
      <div
        v-if="limitNotice"
        class="mt-4 flex items-center gap-2 rounded-xl border border-danger/20 bg-danger-soft px-3.5 py-2.5 text-[12px] text-danger"
      >
        <AppIcon name="info" :size="15" /> {{ limitNotice }}
      </div>
    </Transition>

    <div class="mt-5 space-y-3">
      <ScholarshipMatchCard
        v-for="item in scholarship.matches"
        :key="item.id"
        :item="item"
        :selected="scholarship.isSelected(item.id)"
        :primary="scholarship.primaryId === item.id"
        :disabled="!scholarship.canSelectMore && !scholarship.isSelected(item.id)"
        @toggle="toggle(item.id)"
        @primary="setPrimary(item.id)"
      />
    </div>

    <div class="sticky bottom-3 z-20 mt-5">
      <div
        class="card-surface flex flex-wrap items-center gap-3 border-gold-deep/30 p-4 shadow-[0_20px_50px_-28px_rgba(23,43,70,0.45)] backdrop-blur"
      >
        <div class="flex items-center gap-3">
          <span class="grad-primary grid size-10 shrink-0 place-items-center rounded-xl text-[13px] font-bold text-ink">
            {{ scholarship.selectedCount }}
          </span>
          <div>
            <p class="text-[13px] font-semibold text-ink">
              {{ scholarship.selectedCount }} beasiswa dipilih
              <span class="font-normal text-muted">· maks. {{ scholarship.maxSelected }}</span>
            </p>
            <p class="text-[11px] text-muted">
              {{
                scholarship.selectedCount
                  ? 'Beasiswa utama akan dipakai untuk modul Template di roadmap.'
                  : 'Pilih minimal satu beasiswa untuk mulai belajar.'
              }}
            </p>
          </div>
        </div>
        <div class="flex flex-1 flex-wrap items-center justify-end gap-2">
          <BaseBadge v-if="scholarship.primary" variant="navy" size="sm" icon="star-filled">
            Utama: {{ scholarship.primary.name }}
          </BaseBadge>
          <BaseButton
            :disabled="scholarship.selectedCount === 0"
            icon-right="arrow-right"
            class="w-full sm:w-auto"
            @click="startLearning"
          >
            Simpan & mulai belajar
          </BaseButton>
        </div>
      </div>
    </div>

    <p class="mt-4 text-center text-[11px] text-muted">
      Skor kecocokan dihitung di perangkatmu dari syarat beasiswa. Selalu cek situs resmi sebelum
      mendaftar.
    </p>
  </div>
</template>
