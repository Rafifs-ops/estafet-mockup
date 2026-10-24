<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ActiveScholarshipCard from '@/components/dashboard/ActiveScholarshipCard.vue'
import NextStepCard from '@/components/dashboard/NextStepCard.vue'
import ScholarshipQueue from '@/components/dashboard/ScholarshipQueue.vue'
import RoadmapPhase from '@/components/dashboard/RoadmapPhase.vue'
import QuickAccess from '@/components/dashboard/QuickAccess.vue'
import { useProfileStore } from '@/stores/profile'
import { useScholarshipStore } from '@/stores/scholarship'
import { useLearningStore } from '@/stores/learning'
import { user } from '@/data/user'
import {
  getModuleMeta,
  getPhaseOfModule,
  moduleTitle,
  phases,
} from '@/data/curriculum'

const router = useRouter()
const profile = useProfileStore()
const scholarship = useScholarshipStore()
const learning = useLearningStore()

const primary = computed(() => scholarship.primary)
const scholarshipName = computed(() => primary.value?.name || 'Beasiswa Pilihanmu')
const activeModule = computed(() => getModuleMeta(learning.activeModuleId))
const activePhase = computed(() => getPhaseOfModule(learning.activeModuleId))
const activeTitle = computed(() =>
  activeModule.value ? moduleTitle(activeModule.value, scholarshipName.value) : 'Modul',
)
const days = computed(() => primary.value?.days ?? 0)

const queue = computed(() =>
  [...scholarship.selectedMatches]
    .sort((a, b) => a.days - b.days)
    .map((item) => ({
      id: item.id,
      name: item.name,
      deadline: item.deadline,
      days: item.days,
      primary: item.id === primary.value?.id,
    })),
)

const roadmapData = computed(() =>
  phases.map((phase) => ({
    ...phase,
    stats: learning.phaseStats(phase.id),
    modules: phase.moduleIds.map((id) => {
      const meta = getModuleMeta(id)
      return {
        id,
        title: moduleTitle(meta, scholarshipName.value),
        type: meta.type,
        duration: meta.duration,
        status: learning.statusFor(id),
        progress: learning.progressFor(id),
      }
    }),
  })),
)

const allDone = computed(() => learning.completedCount === learning.totalModules)

function openModule(id) {
  if (!learning.isUnlocked(id)) return
  learning.startModule(id)
  router.push(`/modul/${id}`)
}

function continueLearning() {
  openModule(learning.activeModuleId)
}
</script>

<template>
  <div class="space-y-4">
    <!-- HERO -->
    <section class="grad-hero relative overflow-hidden rounded-[30px] border border-line p-5 sm:p-7">
      <div class="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-white/40 blur-2xl" />
      <div class="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-navy uppercase">
            <AppIcon name="book-open" :size="13" /> Ruang belajar
          </span>
          <h1 class="font-display mt-3 text-[32px] leading-none font-extrabold tracking-tight text-ink sm:text-[40px]">
            Hai, {{ user.shortName }} 👋
          </h1>
          <p class="mt-2.5 max-w-md text-[13px] leading-relaxed text-body">
            <template v-if="primary">
              Kamu sedang menyiapkan <span class="font-medium text-ink">{{ primary.name }}</span
              >. Lanjutkan langkah kecilmu hari ini.
            </template>
            <template v-else>
              Kamu belum memilih beasiswa utama. Temukan yang paling cocok dengan profilmu, lalu
              mulai belajar.
            </template>
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <BaseButton size="sm" icon-right="arrow-right" @click="continueLearning">
              Lanjutkan belajar
            </BaseButton>
            <BaseButton to="/rekomendasi" variant="outline" size="sm" icon-left="compass">
              Jelajahi beasiswa
            </BaseButton>
          </div>
        </div>

        <div class="flex items-center gap-4 rounded-2xl border border-line bg-white/90 p-4 shadow-sm lg:w-[252px]">
          <ProgressRing :value="learning.totalProgress" :size="86" :stroke="8">
            <div class="text-center">
              <p class="text-[17px] leading-none font-bold text-ink">{{ learning.totalProgress }}%</p>
              <p class="mt-0.5 text-[8px] tracking-[0.1em] text-muted uppercase">selesai</p>
            </div>
          </ProgressRing>
          <div class="min-w-0">
            <p class="label-xs text-[9px]">Progress belajar</p>
            <p class="mt-1 text-[12.5px] font-semibold text-ink">
              {{ learning.completedCount }} / {{ learning.totalModules }} modul
            </p>
            <p class="mt-1.5 text-[10px] leading-snug text-muted">
              Sedang di:
              <span class="font-medium text-navy">{{ activeTitle }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Progress Belajar"
        :value="`${learning.totalProgress}%`"
        :sub="`${learning.completedCount} dari ${learning.totalModules} modul selesai`"
        icon="trending-up"
        tone="gradient"
      />
      <StatCard
        label="Modul Selesai"
        :value="learning.completedCount"
        :sub="`Inti ${learning.intiCompleted}/9 · Template ${learning.templateCompleted}/2`"
        icon="book-open"
        tone="navy"
      />
      <StatCard
        label="Rata-rata Skor"
        :value="learning.averageScore === null ? '-' : learning.averageScore"
        sub="Dari feedback AI latihan praktik"
        icon="sparkles"
        tone="background"
      />
      <StatCard
        label="Beasiswa Dipilih"
        :value="`${scholarship.selectedCount}/${scholarship.maxSelected}`"
        :sub="primary ? `Utama: ${primary.name}` : 'Belum ada beasiswa utama'"
        icon="star"
        tone="success"
      />
    </div>

    <!-- MAIN GRID -->
    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_278px]">
      <div class="min-w-0 space-y-4">
        <ActiveScholarshipCard
          :scholarship="primary"
          :progress="learning.totalProgress"
          :modules-done="learning.completedCount"
          :total-modules="learning.totalModules"
          :average-score="learning.averageScore === null ? '-' : learning.averageScore"
          :days="days"
          @continue="continueLearning"
        />

        <NextStepCard
          :title="allDone ? 'Semua modul selesai. Saatnya unggah berkas!' : `Lanjutkan modul ${activeTitle}`"
          :description="
            allDone
              ? 'Periksa kembali seluruh dokumen sebelum menekan tombol kirim pendaftaran.'
              : activeModule?.description
          "
          :phase="activePhase ? `Fase ${activePhase.number} · ${activePhase.title}` : ''"
          :to="`/modul/${learning.activeModuleId}`"
        />

        <ScholarshipQueue :items="queue" />
      </div>

      <aside class="min-w-0">
        <div class="lg:sticky lg:top-6">
          <QuickAccess />
          <div class="mt-3 rounded-2xl border border-line bg-surface-alt/50 p-4">
            <div class="flex items-center gap-2">
              <span class="grid size-7 place-items-center rounded-lg bg-white text-gold-deep">
                <AppIcon name="lightbulb" :size="15" />
              </span>
              <p class="text-[11.5px] font-semibold text-ink">Tips hari ini</p>
            </div>
            <p class="mt-2 text-[11px] leading-relaxed text-body">
              Tulis satu paragraf motivasi sebelum melihat contoh. Suaramu sendiri yang paling
              meyakinkan.
            </p>
          </div>
          <p class="mt-3 px-1 text-center text-[10px] text-muted">
            Profil: {{ profile.form.target || profile.form.level || '-' }} ·
            {{ profile.form.field || 'bidang belum dipilih' }}
          </p>
        </div>
      </aside>
    </div>

    <!-- ROADMAP -->
    <section class="card-surface p-5 sm:p-6">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="max-w-2xl">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-lg font-semibold text-ink">Roadmap belajar</h2>
            <BaseBadge variant="success" size="sm">{{ learning.totalProgress }}% selesai</BaseBadge>
          </div>
          <p class="mt-1.5 text-[11.5px] leading-relaxed text-body">
            Modul Inti dipakai bersama semua beasiswa. Modul Template mengikuti beasiswa aktif,
            jadi judulnya menyesuaikan pilihanmu.
          </p>
        </div>
        <BaseButton to="/rekomendasi" variant="ghost" size="xs" icon-right="chevron-right">
          Kelola beasiswa
        </BaseButton>
      </div>

      <div class="mt-4 space-y-3">
        <RoadmapPhase
          v-for="phase in roadmapData"
          :key="phase.id"
          :phase="phase"
          :stats="phase.stats"
          :modules="phase.modules"
          @open="openModule"
        />
      </div>
    </section>

    <p class="pb-2 text-center text-[10.5px] text-muted">
      Prototype demo · progres disimpan lokal di browser ini.
    </p>
  </div>
</template>
