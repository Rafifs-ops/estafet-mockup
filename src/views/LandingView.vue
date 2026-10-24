<script setup>
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { user } from '@/data/user'

const mobileNav = ref(false)

const navLinks = [
  { label: 'Manfaat', href: '#manfaat' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Cek Kesiapan', href: '#cek-kesiapan' },
  { label: 'Persiapan', href: '#persiapan' },
]

const heroStats = [
  { value: '8', label: 'Langkah Profiling' },
  { value: '3', label: 'Fase Roadmap Belajar' },
  { value: '24/7', label: 'Feedback Latihan' },
]

const matchingChips = ['Jenjang', 'Usia', 'IPK', 'Bidang minat', 'Lokasi tujuan', 'Deadline']

const roadmapPhases = [
  { n: '01', title: 'Fondasi Diri', done: true },
  { n: '02', title: 'Menulis Dokumen', done: true },
  { n: '03', title: 'Persiapan Pendaftaran', done: false },
]

const workSteps = [
  {
    n: '01',
    title: 'Kenali dirimu',
    text: 'Jawab 8 pertanyaan singkat tentang jenjang, IPK, bidang, dan target studi.',
    progress: 1,
  },
  {
    n: '02',
    title: 'Temukan beasiswa',
    text: 'Lihat beasiswa yang paling cocok, lengkap dengan alasan kecocokannya.',
    progress: 2,
  },
  {
    n: '03',
    title: 'Belajar terarah',
    text: 'Ikuti roadmap 11 modul dari motivasi sampai berkas pendaftaran.',
    progress: 3,
  },
  {
    n: '04',
    title: 'Latih & kunci',
    text: 'Kirim latihan, baca feedback AI, lalu kunci progres modulmu.',
    progress: 4,
  },
]

const dailyCards = [
  {
    title: 'Roadmap yang menuntun',
    text: 'Setiap modul punya tujuan, materi, latihan, dan checkpoint yang jelas.',
  },
  {
    title: 'Feedback yang spesifik',
    text: 'Bukan sekadar skor. Kamu tahu bagian mana yang kuat dan mana yang perlu diperbaiki.',
  },
]

const quizQuestions = [
  {
    q: 'Saat ini kamu berada di posisi...',
    options: [
      { label: 'Siswa SMA / SMK', score: 1 },
      { label: 'Mahasiswa S1 aktif', score: 2 },
      { label: 'Fresh graduate', score: 3 },
      { label: 'Sudah bekerja', score: 2 },
    ],
  },
  {
    q: 'Sudah punya draf esai motivasi beasiswa?',
    options: [
      { label: 'Belum terpikir', score: 1 },
      { label: 'Baru kerangka', score: 2 },
      { label: 'Sudah ada draf', score: 3 },
      { label: 'Sudah ditinjau orang lain', score: 4 },
    ],
  },
  {
    q: 'Bagaimana kondisi CV-mu sekarang?',
    options: [
      { label: 'Belum punya', score: 1 },
      { label: 'Ada, tapi belum dirapikan', score: 2 },
      { label: 'Sudah rapi satu halaman', score: 3 },
      { label: 'Sudah disesuaikan per beasiswa', score: 4 },
    ],
  },
  {
    q: 'Seberapa tahu kamu tentang deadline beasiswa incaran?',
    options: [
      { label: 'Belum tahu sama sekali', score: 1 },
      { label: 'Tahu nama beasiswanya saja', score: 2 },
      { label: 'Tahu deadline-nya', score: 3 },
      { label: 'Sudah mencatat syarat lengkapnya', score: 4 },
    ],
  },
  {
    q: 'Persiapan wawancara seleksi beasiswamu?',
    options: [
      { label: 'Belum terpikir', score: 1 },
      { label: 'Pernah baca contoh pertanyaan', score: 2 },
      { label: 'Sudah latihan sendiri', score: 3 },
      { label: 'Sudah simulasi dengan orang lain', score: 4 },
    ],
  },
]

const quizIndex = ref(0)
const answers = ref([])
const quizDone = computed(() => answers.value.length === quizQuestions.length)
const currentQuestion = computed(() => quizQuestions[quizIndex.value] || null)
const quizScore = computed(() => {
  const total = answers.value.reduce((sum, value) => sum + value, 0)
  return Math.round((total / (quizQuestions.length * 4)) * 100)
})
const quizVerdict = computed(() => {
  if (quizScore.value >= 80) return 'Kamu sudah siap melangkah.'
  if (quizScore.value >= 60) return 'Kamu hampir siap.'
  return 'Masih ada ruang untuk bersiap.'
})
const quizNote = computed(() => {
  if (quizScore.value >= 80)
    return 'Pertahankan ritmemu. Rapikan dokumen dan kunci target beasiswa dalam 2 minggu ke depan.'
  if (quizScore.value >= 60)
    return 'Beberapa bagian sudah kuat. Susun roadmap belajar agar persiapanmu lebih terarah.'
  return 'Tidak perlu buru-buru. Mulai dari mengenal tujuan dan motivasimu lewat profiling.'
})

function answerQuestion(score) {
  answers.value = [...answers.value, score]
  if (quizIndex.value < quizQuestions.length - 1) {
    quizIndex.value += 1
  }
}

function restartQuiz() {
  answers.value = []
  quizIndex.value = 0
}
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- NAVBAR -->
    <header class="sticky top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <RouterLink to="/" aria-label="Skular - beranda"><BrandLogo /></RouterLink>

        <nav class="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-[13.5px] font-medium text-body transition-colors hover:text-navy"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <BaseButton
            to="/dashboard"
            variant="dark"
            size="sm"
            icon-right="arrow-right"
            class="hidden sm:inline-flex"
          >
            Dashboard
          </BaseButton>
          <button
            type="button"
            class="grid size-9 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
            :aria-expanded="mobileNav"
            aria-label="Buka navigasi"
            @click="mobileNav = !mobileNav"
          >
            <AppIcon :name="mobileNav ? 'x' : 'menu'" :size="19" />
          </button>
        </div>
      </div>

      <Transition name="pop">
        <div v-if="mobileNav" class="border-t border-line bg-background px-4 pt-3 pb-4 lg:hidden">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-alt"
            @click="mobileNav = false"
          >
            {{ link.label }}
          </a>
          <BaseButton to="/dashboard" variant="dark" size="sm" block class="mt-2">
            Buka Dashboard
          </BaseButton>
        </div>
      </Transition>
    </header>

    <!-- HERO -->
    <section class="relative">
      <div class="mx-auto max-w-[1240px] px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20 lg:pb-20">
        <div class="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <span
              class="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-navy uppercase"
            >
              <AppIcon name="sparkles" :size="13" />
              Perjalanan beasiswamu dimulai di sini
            </span>

            <h1
              class="font-display mt-5 text-[46px] leading-[0.94] font-extrabold tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[70px]"
            >
              <span class="block">Siapkan Dirimu.</span>
              <span class="block">Kejar</span>
              <span class="text-grad block">Beasiswamu.</span>
            </h1>

            <p class="mt-6 max-w-[30rem] text-[15px] leading-relaxed text-body sm:text-base">
              Skular membantumu menemukan beasiswa yang tepat, menyusun dokumen yang meyakinkan,
              dan berlatih dengan feedback AI — semuanya dalam satu ruang belajar.
            </p>

            <div class="mt-7 flex flex-wrap items-center gap-3">
              <BaseButton to="/profiling/1" size="lg" icon-right="arrow-right">
                Mulai Perjalananmu
              </BaseButton>
              <BaseButton href="#cek-kesiapan" variant="outline" size="lg" icon-left="target">
                Tes Kesiapan Beasiswa
              </BaseButton>
            </div>

            <dl class="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
              <div v-for="stat in heroStats" :key="stat.label">
                <dt class="sr-only">{{ stat.label }}</dt>
                <dd class="font-display text-2xl font-extrabold tracking-tight text-ink">
                  {{ stat.value }}
                </dd>
                <dd class="text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
                  {{ stat.label }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Hero illustration -->
          <div class="relative mx-auto w-full max-w-[520px]">
            <div class="grad-hero rounded-[34px] border border-line p-4 shadow-[var(--shadow-soft)] sm:p-6">
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <!-- Matching card -->
                <div class="col-span-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
                  <div class="flex items-center justify-between">
                    <span class="label-xs">Rekomendasi beasiswa</span>
                    <BaseBadge variant="success" size="sm" icon="check">96% match</BaseBadge>
                  </div>
                  <p class="mt-2.5 text-[15px] font-semibold text-ink">Beasiswa Agro Masa Depan</p>
                  <p class="text-[11.5px] text-muted">Konsorsium Agribisnis · D4 · Bogor</p>
                  <div class="mt-3.5 flex items-center gap-2">
                    <ProgressBar :value="88" :height="6" />
                    <span class="text-[11px] font-semibold text-navy">88</span>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span
                      v-for="chip in ['D4', 'Dalam Negeri', 'Kuota 45', '18 Nov 2026']"
                      :key="chip"
                      class="rounded-full border border-line bg-background px-2 py-0.5 text-[10px] text-body"
                    >
                      {{ chip }}
                    </span>
                  </div>
                </div>

                <!-- Progress ring -->
                <div class="rounded-2xl border border-line bg-white p-3.5">
                  <span class="label-xs text-[9px]">Progres belajar</span>
                  <div class="mt-2 flex items-center gap-3">
                    <ProgressRing :value="62" :size="66" :stroke="7">
                      <span class="text-[13px] font-bold text-ink">62%</span>
                    </ProgressRing>
                    <div class="text-[10.5px] leading-tight text-muted">
                      <p class="font-semibold text-ink">7 dari 11</p>
                      <p>modul selesai</p>
                    </div>
                  </div>
                </div>

                <!-- Feedback dark -->
                <div class="grad-dark rounded-2xl border border-navy-dark p-3.5 text-white">
                  <span class="text-[9px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                    Feedback latihan
                  </span>
                  <div class="mt-2 flex items-end gap-2">
                    <span class="font-display text-4xl leading-none font-extrabold">88</span>
                    <span class="pb-1 text-[10px] text-white/60">/100</span>
                  </div>
                  <p class="mt-2 text-[10px] leading-snug text-white/70">
                    “Pengalamanmu konkret. Pertegas bagian kontribusi.”
                  </p>
                </div>

                <!-- Roadmap -->
                <div class="col-span-2 rounded-2xl border border-line bg-white p-4">
                  <div class="flex items-center justify-between">
                    <span class="label-xs">Roadmap belajar</span>
                    <span class="text-[10px] font-semibold text-navy">3 fase</span>
                  </div>
                  <ul class="mt-2.5 space-y-1.5">
                    <li
                      v-for="phase in roadmapPhases"
                      :key="phase.n"
                      class="flex items-center gap-2 text-[11px]"
                    >
                      <span
                        class="grid size-5 place-items-center rounded-full text-[9px] font-semibold"
                        :class="
                          phase.done
                            ? 'grad-primary text-ink'
                            : 'border border-line bg-background text-muted'
                        "
                      >
                        <AppIcon v-if="phase.done" name="check" :size="10" :stroke-width="3" />
                        <template v-else>{{ phase.n }}</template>
                      </span>
                      <span :class="phase.done ? 'text-ink' : 'text-muted'">{{ phase.title }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              class="absolute -right-3 -bottom-4 hidden items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[11px] font-medium text-ink shadow-[var(--shadow-soft)] sm:flex"
            >
              <AppIcon name="sparkles" :size="14" class="text-gold-deep" />
              AI Mentor siap 24/7
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE 1 -->
    <div class="marquee grad-primary border-y border-gold-deep/30 py-3.5">
      <div class="marquee-track">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0 items-center gap-7 pr-7">
          <template v-for="(item, index) in ['Temukan Beasiswamu', 'Bangun Kemampuanmu', 'Persiapan yang Terarah']" :key="item">
            <span class="font-display text-[17px] font-extrabold tracking-tight text-ink uppercase sm:text-xl">
              {{ item }}
            </span>
            <span v-if="index < 2" class="text-ink/70">✦</span>
          </template>
        </div>
      </div>
    </div>

    <!-- MANFAAT -->
    <section id="manfaat" class="scroll-mt-24 py-16 sm:py-20">
      <div class="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="label-xs">Manfaat</span>
          <h2
            class="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-[42px] sm:leading-[1.05]"
          >
            Bukan sekadar daftar beasiswa. <span class="text-grad">Ini ruang latihanmu.</span>
          </h2>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-[15px]">
            Dari mencari beasiswa sampai mengunci persiapan, semua langkah punya tempatnya.
          </p>
        </div>

        <div class="mt-9 grid gap-4 lg:grid-cols-3">
          <!-- Matching -->
          <div class="card-surface p-6 lg:col-span-2">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <span class="grad-primary grid size-11 shrink-0 place-items-center rounded-xl text-ink">
                  <AppIcon name="compass" :size="21" />
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-ink">Scholarship matching</h3>
                  <p class="mt-1 max-w-md text-[13px] leading-relaxed text-body">
                    Beasiswa disaring dari profilmu: jenjang, usia, IPK, bidang, lokasi, dan
                    deadline. Lengkap dengan alasan kenapa cocok.
                  </p>
                </div>
              </div>
              <BaseBadge variant="navy" size="sm">Skor kecocokan</BaseBadge>
            </div>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="chip in matchingChips"
                :key="chip"
                class="rounded-full border border-line bg-background px-3 py-1.5 text-[11.5px] font-medium text-body"
              >
                {{ chip }}
              </span>
            </div>
            <div class="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-background/70 p-3">
              <div class="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-navy">
                <AppIcon name="graduation-cap" :size="18" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-[12.5px] font-semibold text-ink">
                  Beasiswa Agro Masa Depan
                </p>
                <p class="text-[11px] text-muted">D4 · Dalam Negeri · Bogor</p>
              </div>
              <BaseBadge variant="success" size="sm">Sangat cocok</BaseBadge>
            </div>
          </div>

          <!-- Roadmap -->
          <div class="card-surface p-6">
            <span class="grad-primary grid size-11 place-items-center rounded-xl text-ink">
              <AppIcon name="layers" :size="21" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-ink">Learning roadmap</h3>
            <p class="mt-1 text-[13px] leading-relaxed text-body">
              3 fase, 11 modul. Modul Inti dipakai bersama, modul Template mengikuti beasiswamu.
            </p>
            <ul class="mt-4 space-y-2.5">
              <li v-for="phase in roadmapPhases" :key="phase.n" class="flex items-center gap-2.5">
                <span
                  class="grid size-6 place-items-center rounded-full border text-[10px] font-semibold"
                  :class="
                    phase.done
                      ? 'border-transparent bg-success-soft text-success'
                      : 'border-line text-muted'
                  "
                >
                  <AppIcon v-if="phase.done" name="check" :size="12" :stroke-width="2.6" />
                  <template v-else>{{ phase.n }}</template>
                </span>
                <span class="text-[12.5px]" :class="phase.done ? 'text-ink' : 'text-muted'">
                  {{ phase.title }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Latihan -->
          <div class="card-surface p-6">
            <span class="grid size-11 place-items-center rounded-xl bg-navy-soft text-navy">
              <AppIcon name="pen" :size="21" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-ink">Latihan terarah</h3>
            <p class="mt-1 text-[13px] leading-relaxed text-body">
              Satu latihan kecil per modul, bukan tugas menumpuk di akhir.
            </p>
            <ul class="mt-4 space-y-2 text-[12.5px] text-body">
              <li class="flex gap-2">
                <AppIcon name="check" :size="15" class="mt-0.5 text-success" /> Rumusan motivasi
              </li>
              <li class="flex gap-2">
                <AppIcon name="check" :size="15" class="mt-0.5 text-success" /> Kerangka esai
              </li>
              <li class="flex gap-2">
                <AppIcon name="check" :size="15" class="mt-0.5 text-success" /> Jawaban wawancara
              </li>
            </ul>
          </div>

          <!-- Feedback dark -->
          <div class="grad-dark relative overflow-hidden rounded-3xl border border-navy-dark p-6 text-white">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                Feedback dari AI
              </span>
              <AppIcon name="sparkles" :size="18" class="text-gold" />
            </div>
            <div class="mt-4 flex items-end gap-2">
              <span class="font-display text-5xl leading-none font-extrabold">88</span>
              <span class="pb-1 text-xs text-white/70">/100</span>
            </div>
            <p class="mt-3 text-[13px] leading-relaxed text-white/75">
              “Ceritamu kuat dan spesifik. Tinggal pertegas kontribusi setelah lulus.”
            </p>
            <div class="mt-4 h-px bg-white/10" />
            <p class="mt-3 text-[10.5px] tracking-wide text-white/70 uppercase">
              Kekuatan · Perbaikan · Langkah berikutnya
            </p>
          </div>

          <!-- Progress -->
          <div class="card-surface p-6">
            <div class="flex items-center justify-between">
              <span class="grid size-11 place-items-center rounded-xl bg-gold-light text-navy-dark">
                <AppIcon name="trending-up" :size="21" />
              </span>
              <BaseBadge variant="success" size="sm" dot>On track</BaseBadge>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-ink">Progress tracking</h3>
            <p class="mt-1 text-[13px] leading-relaxed text-body">
              Setiap modul yang selesai membuka modul berikutnya. Tidak ada langkah yang terlewat.
            </p>
            <div class="mt-4 space-y-2.5">
              <div>
                <div class="mb-1 flex justify-between text-[10.5px] text-muted">
                  <span>Fase 1</span><span>2/3</span>
                </div>
                <ProgressBar :value="66" :height="6" />
              </div>
              <div>
                <div class="mb-1 flex justify-between text-[10.5px] text-muted">
                  <span>Fase 2</span><span>0/4</span>
                </div>
                <ProgressBar :value="0" :height="6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CARA KERJA -->
    <section id="cara-kerja" class="scroll-mt-24 border-y border-line bg-surface-alt/40 py-16 sm:py-20">
      <div class="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span class="label-xs">Cara kerja</span>
            <h2 class="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-[42px]">
              Empat tahap, satu perjalanan.
            </h2>
          </div>
          <p class="max-w-sm text-[13px] leading-relaxed text-body">
            Kamu tidak perlu menyelesaikan semuanya sekaligus. Satu tahap sehari sudah cukup.
          </p>
        </div>

        <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, index) in workSteps"
            :key="step.n"
            class="card-surface flex flex-col p-5"
            :class="index % 2 === 1 ? 'lg:mt-8' : ''"
          >
            <div class="flex items-start justify-between">
              <span class="font-display text-3xl leading-none font-extrabold text-ink/20">
                {{ step.n }}
              </span>
              <span class="grid size-7 place-items-center rounded-full bg-gold-light text-navy-dark">
                <AppIcon :name="['compass', 'award', 'book-open', 'check-circle'][index]" :size="14" />
              </span>
            </div>
            <h3 class="mt-4 text-[15px] font-semibold text-ink">{{ step.title }}</h3>
            <p class="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-body">{{ step.text }}</p>
            <div class="mt-4">
              <div class="mb-1.5 flex justify-between text-[10px] font-medium text-muted">
                <span>TAHAP {{ step.n }}</span>
                <span>{{ step.progress }}/4</span>
              </div>
              <ProgressBar :value="(step.progress / 4) * 100" :height="5" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CEK KESIAPAN -->
    <section id="cek-kesiapan" class="scroll-mt-24 py-16 sm:py-20">
      <div class="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="grad-dark relative overflow-hidden rounded-[32px] p-6 sm:p-10 lg:p-12">
          <div
            class="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-gold/10 blur-2xl"
          />
          <div class="relative grid gap-9 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
            <div class="text-white">
              <span class="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
                <AppIcon name="target" :size="13" /> Cek kesiapan
              </span>
              <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-[40px] sm:leading-[1.08]">
                Seberapa siap kamu mengejar beasiswa?
              </h2>
              <p class="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/70">
                Lima pertanyaan singkat untuk melihat posisi persiapanmu hari ini. Hasilnya
                langsung memberi rekomendasi langkah pertama.
              </p>
              <ul class="mt-6 space-y-2.5">
                <li
                  v-for="item in [
                    'Tahu beasiswa yang cocok dengan profilmu',
                    'Punya rencana belajar yang jelas',
                    'Dokumen tidak disiapkan mendadak',
                    'Latihan dengan feedback yang spesifik',
                  ]"
                  :key="item"
                  class="flex items-start gap-2.5 text-[13px] text-white/80"
                >
                  <span class="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
                    <AppIcon name="check" :size="10" :stroke-width="3" />
                  </span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-30px_rgba(23,43,70,0.45)] sm:p-6">
              <Transition name="page" mode="out-in">
                <div v-if="!quizDone" :key="`q-${quizIndex}`">
                  <div class="flex items-center justify-between">
                    <span class="label-xs">Kuis kesiapan</span>
                    <span class="text-[11px] font-semibold text-navy">
                      {{ quizIndex + 1 }} / {{ quizQuestions.length }}
                    </span>
                  </div>
                  <ProgressBar
                    class="mt-2.5"
                    :value="(quizIndex / quizQuestions.length) * 100"
                    :height="5"
                  />
                  <h3 class="mt-4 text-[17px] leading-snug font-semibold text-ink">
                    {{ currentQuestion.q }}
                  </h3>
                  <div class="mt-4 space-y-2">
                    <button
                      v-for="option in currentQuestion.options"
                      :key="option.label"
                      type="button"
                      class="flex w-full items-center gap-2.5 rounded-xl border border-line bg-background/60 px-3.5 py-2.5 text-left text-[12.5px] font-medium text-ink transition hover:border-gold-deep hover:bg-background"
                      @click="answerQuestion(option.score)"
                    >
                      <span class="grid size-5 shrink-0 place-items-center rounded-full border border-line bg-white text-[9px] text-muted">
                        <AppIcon name="chevron-right" :size="10" />
                      </span>
                      {{ option.label }}
                    </button>
                  </div>
                  <p class="mt-3 text-[10.5px] text-muted">Tidak ada jawaban benar atau salah.</p>
                </div>

                <div v-else key="result" class="text-center">
                  <span class="label-xs">Hasil kesiapanmu</span>
                  <div class="mt-3 flex items-center justify-center gap-5">
                    <ProgressRing :value="quizScore" :size="112" :stroke="9">
                      <div class="text-center">
                        <span class="font-display block text-2xl leading-none font-extrabold text-ink">
                          {{ quizScore }}%
                        </span>
                        <span class="text-[9px] tracking-wide text-muted uppercase">siap</span>
                      </div>
                    </ProgressRing>
                    <div class="text-left">
                      <p class="text-[15px] font-semibold text-ink">{{ quizVerdict }}</p>
                      <p class="mt-1 max-w-[11rem] text-[11.5px] leading-relaxed text-body">
                        {{ quizNote }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-6 space-y-2">
                    <BaseButton to="/profiling/1" block icon-right="arrow-right">
                      Mulai profiling 8 langkah
                    </BaseButton>
                    <BaseButton variant="ghost" size="sm" block @click="restartQuiz">
                      Ulangi kuis
                    </BaseButton>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PERSIAPAN -->
    <section id="persiapan" class="scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div class="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <span class="label-xs">Persiapan</span>
          <h2 class="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-[42px]">
            Yang kamu kerjakan setiap hari di Skular.
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-body">
            Bukan baca teori lalu lupa. Setiap sesi menghasilkan sesuatu yang bisa langsung
            dipakai di pendaftaran.
          </p>
        </div>

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <!-- roadmap visual -->
          <div class="card-surface p-5 sm:p-6">
            <div class="flex items-center justify-between">
              <span class="label-xs">Roadmap belajar</span>
              <span class="text-[11px] font-semibold text-navy">67%</span>
            </div>
            <div class="mt-3 space-y-2">
              <div
                v-for="(item, index) in [
                  { title: 'Mengenal Tujuan dan Motivasi', state: 'done' },
                  { title: 'Menyusun Personal Branding', state: 'done' },
                  { title: 'Anatomi Esai Motivasi', state: 'active' },
                  { title: 'CV yang ATS-Friendly', state: 'lock' },
                  { title: 'Simulasi Wawancara', state: 'lock' },
                ]"
                :key="item.title"
                class="flex items-center gap-2.5 rounded-xl border p-2.5"
                :class="
                  item.state === 'active'
                    ? 'border-gold-deep/50 bg-background'
                    : 'border-line bg-white'
                "
              >
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold"
                  :class="{
                    'bg-success-soft text-success': item.state === 'done',
                    'grad-primary text-ink': item.state === 'active',
                    'bg-surface-alt text-muted': item.state === 'lock',
                  }"
                >
                  <AppIcon
                    :name="item.state === 'done' ? 'check' : item.state === 'active' ? 'play' : 'lock'"
                    :size="12"
                    :stroke-width="2"
                  />
                </span>
                <span
                  class="flex-1 truncate text-[12px]"
                  :class="item.state === 'lock' ? 'text-muted' : 'text-ink'"
                >
                  {{ index + 1 }}. {{ item.title }}
                </span>
              </div>
            </div>
            <p class="mt-3 text-[10.5px] text-muted">Fase 1 · Fondasi Diri · 2/3 modul</p>
          </div>

          <!-- feedback visual -->
          <div class="card-surface flex flex-col p-5 sm:p-6">
            <div class="flex items-center justify-between">
              <span class="label-xs">Latihan & feedback</span>
              <BaseBadge variant="success" size="sm">Selesai</BaseBadge>
            </div>
            <div class="mt-3 rounded-xl border border-line bg-background/60 p-3">
              <p class="text-[11px] font-medium text-muted">Rumusan motivasi beasiswa</p>
              <p class="mt-1 text-[12px] leading-relaxed text-ink">
                “Saya pernah membantu kelompok tani mencatat hasil panen secara digital...”
              </p>
            </div>
            <div class="mt-3 flex items-center gap-3 rounded-xl bg-success-soft p-3">
              <span class="grid size-9 shrink-0 place-items-center rounded-full bg-white text-[12px] font-bold text-success">
                88
              </span>
              <div>
                <p class="text-[11.5px] font-semibold text-ink">Kekuatanmu</p>
                <p class="text-[10.5px] leading-snug text-body">
                  Pengalaman konkret dan alasan yang jelas.
                </p>
              </div>
            </div>
            <div class="mt-2.5 flex items-center gap-3 rounded-xl bg-warning-soft p-3">
              <span class="grid size-9 shrink-0 place-items-center rounded-full bg-white text-warning">
                <AppIcon name="pen" :size="15" />
              </span>
              <div>
                <p class="text-[11.5px] font-semibold text-ink">Yang perlu diperbaiki</p>
                <p class="text-[10.5px] leading-snug text-body">
                  Pertegas kontribusi setelah lulus.
                </p>
              </div>
            </div>
            <div class="mt-auto pt-3">
              <ProgressBar :value="67" :height="5" />
              <p class="mt-1.5 text-[10.5px] text-muted">Satu latihan lagi menuju checkpoint.</p>
            </div>
          </div>

          <!-- dark progress -->
          <div class="grad-dark flex flex-col justify-between rounded-3xl border border-navy-dark p-5 text-white sm:p-6">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                Progres hari ini
              </span>
              <AppIcon name="sparkles" :size="17" class="text-gold" />
            </div>
            <div class="my-5 flex items-center gap-4">
              <ProgressRing :value="67" :size="104" :stroke="9" tone="white">
                <span class="font-display text-2xl font-extrabold text-white">67%</span>
              </ProgressRing>
              <div class="space-y-2 text-[11.5px]">
                <p class="font-semibold text-white">Langkah kecil yang konsisten</p>
                <p class="leading-relaxed text-white/65">
                  15 menit sehari cukup untuk menyiapkan dokumen yang biasanya terasa berat.
                </p>
              </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-3.5">
              <p class="text-[10.5px] tracking-wide text-white/70 uppercase">Modul aktif</p>
              <p class="mt-1 text-[12.5px] font-medium text-white">
                Modul 3 · Anatomi Esai Motivasi
              </p>
              <div class="mt-2.5 flex items-center gap-2">
                <ProgressBar :value="50" :height="4" track="dark" />
                <span class="text-[10px] text-white/60">50%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div
            v-for="card in dailyCards"
            :key="card.title"
            class="flex items-start gap-3 rounded-2xl border border-line bg-white/60 p-4"
          >
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-gold-light text-navy-dark">
              <AppIcon name="sparkles" :size="16" />
            </span>
            <div>
              <p class="text-[13px] font-semibold text-ink">{{ card.title }}</p>
              <p class="mt-0.5 text-[12px] leading-relaxed text-body">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE 2 -->
    <div class="marquee bg-navy-dark py-3.5">
      <div class="marquee-track marquee-track--reverse">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0 items-center gap-7 pr-7">
          <template v-for="(word, index) in ['Belajar', 'Bersiap', 'Bertumbuh', 'Berprestasi']" :key="word">
            <span class="font-display text-[17px] font-extrabold tracking-tight text-white uppercase sm:text-xl">
              {{ word }}
            </span>
            <span v-if="index < 3" class="text-gold">✦</span>
          </template>
        </div>
      </div>
    </div>

    <!-- CTA FINAL -->
    <section class="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div class="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-navy px-6 py-12 sm:px-12 sm:py-16">
        <div class="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-gold/30 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-navy/30 blur-3xl" />
        <div class="relative max-w-2xl">
          <span class="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
            <AppIcon name="sparkles" :size="13" /> Mulai sekarang
          </span>
          <h2 class="font-display mt-4 text-[32px] leading-[1.02] font-extrabold tracking-tight text-white sm:text-[52px]">
            Kesempatan Tidak Harus Ditunggu. <span class="text-grad">Persiapkan Dirimu.</span>
          </h2>
          <p class="mt-4 max-w-lg text-[13.5px] leading-relaxed text-white/60">
            Profiling 8 langkah, rekomendasi beasiswa, dan roadmap belajar sudah menunggu. Gratis
            untuk dicoba.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <BaseButton to="/dashboard" size="lg" icon-right="arrow-right">Buka Dashboard</BaseButton>
            <BaseButton to="/profiling/1" variant="outline" size="lg" class="border-white/20 bg-white/5 text-white hover:bg-white/10">
              Mulai dari profiling
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-navy-dark px-4 pt-14 pb-8 text-white/60 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-[1240px]">
        <div class="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/estafet_horizontal_putih.png" alt="" class="h-12 w-auto">
            <p class="mt-4 max-w-xs text-[12.5px] leading-relaxed text-white/70">
              Ruang belajar beasiswa berbasis AI. Temukan beasiswa yang cocok, susun dokumen yang
              meyakinkan, dan siapkan dirimu dengan latihan terarah.
            </p>
            <p class="mt-5 text-[10px] tracking-[0.16em] text-white/70 uppercase">
              {{ user.tagline }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">Belajar</p>
            <ul class="mt-3 space-y-2 text-[12.5px]">
              <li><RouterLink to="/rekomendasi" class="hover:text-white">Rekomendasi</RouterLink></li>
              <li><RouterLink to="/modul/1" class="hover:text-white">Modul 1 · Tujuan & Motivasi</RouterLink></li>
              <li><RouterLink to="/perpustakaan" class="hover:text-white">Perpustakaan</RouterLink></li>
            </ul>
          </div>
          <div>
            <p class="text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">Akun</p>
            <ul class="mt-3 space-y-2 text-[12.5px]">
              <li><RouterLink to="/dashboard" class="hover:text-white">Dashboard</RouterLink></li>
              <li><RouterLink to="/profil" class="hover:text-white">Profil & Profiling</RouterLink></li>
              <li><RouterLink to="/cv" class="hover:text-white">CV Saya</RouterLink></li>
            </ul>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 pt-6 text-[11px] text-white/70">
          <p>© 2026 Skular. Prototype demo — seluruh data bersifat dummy.</p>
          <p class="tracking-[0.14em] uppercase">Belajar beasiswa dengan AI</p>
        </div>
      </div>
    </footer>
  </div>
</template>
