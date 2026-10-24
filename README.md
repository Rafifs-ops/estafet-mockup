# Skular — Prototype Website Persiapan Beasiswa

Prototype klikabel untuk **Skular**, platform persiapan beasiswa berbasis AI. Seluruh data
hardcode, tanpa backend, tanpa API, dan tanpa autentikasi. Fitur "AI" disimulasikan dengan
respons statis dan delay buatan.

## Menjalankan

```sh
npm install
npm run dev
```

Buka `http://localhost:5173`.

```sh
npm run build     # build produksi
npm run preview   # pratinjau hasil build
```

Tech stack: Vue 3 (`<script setup>`), Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), Pinia,
Vue Router 5. Ikon dibuat sendiri sebagai komponen SVG inline — tanpa library ikon tambahan.

## Alur demo

1. `/` — landing page (navbar, hero, marquee, manfaat, cara kerja, kuis kesiapan, persiapan, CTA, footer).
2. `/profiling/1` … `/profiling/8` — profiling 8 langkah dengan validasi per langkah.
3. `/rekomendasi` — skor kecocokan dihitung di frontend, pilih maksimal 5 beasiswa dan satu beasiswa utama.
4. `/dashboard` — hero, 4 statistik, beasiswa aktif, langkah berikutnya, antrean, roadmap 3 fase.
5. `/modul/:id?step=pembukaan|pahami|quick|praktik|checkpoint` — 5 langkah modul, latihan dengan
   feedback AI palsu, AI Mentor, dan checkpoint yang membuka modul berikutnya.
6. Menu lain (Perpustakaan, Semua Beasiswa, Beasiswa Saya, Profil, CV) menuju halaman "Segera hadir".

Tombol **Reset demo** ada di bagian bawah sidebar (ikon kecil di samping tagline) dan di menu chip
user. Reset menghapus seluruh state demo, termasuk `localStorage`.

## Struktur folder

```
src/
  main.js, App.vue
  router/index.js              # routing, guard, scroll behavior, judul halaman
  assets/main.css              # token @theme, base style, marquee, transisi
  data/
    user.js                    # user dummy + flag DEMO_MODE
    scholarships.js            # 9 beasiswa dummy, syarat, deadline, util tanggal
    curriculum.js              # 3 fase, 11 modul (9 Inti + 2 Template)
    modules.js                 # konten modul 1 lengkap + konten generik modul lain
    aiResponses.js             # set feedback per rentang skor, balasan chat, prompt ide
  stores/
    profile.js                 # jawaban profiling + validasi, persist localStorage
    scholarship.js             # skor match, pilihan, beasiswa utama, persist
    learning.js                # progres modul, skor latihan, checkpoint, persist
  layouts/
    AppLayout.vue              # sidebar desktop + drawer mobile
    PublicLayout.vue           # wrapper landing
  components/
    ui/                        # BaseButton, BaseBadge, BaseCard, ProgressBar, ProgressRing,
                               # StepDots, AppIcon (set ikon SVG), BrandLogo
    layout/                    # AppSidebar, UserChip
    profiling/                 # OptionCard, StepHeader
    scholarship/               # ScholarshipMatchCard
    dashboard/                 # StatCard, ActiveScholarshipCard, NextStepCard,
                               # ScholarshipQueue, RoadmapPhase, QuickAccess
    module/                    # ModuleHero, ModuleStepper, StepPembukaan, StepPahami,
                               # StepQuickQuestion, StepPraktik, StepCheckpoint,
                               # AiFeedbackPanel, AiMentorChat, IdeaPrompter,
                               # ModuleFeedbackForm
  views/                       # Landing, Profiling, Recommendation, Dashboard, Module, Placeholder
```

## Data dummy & state

- Data beasiswa, kurikulum, pengguna, dan respons AI berada di `src/data/`.
- Skor kecocokan dihitung di `src/stores/scholarship.js` (IPK, usia, SKTM, jenjang, lokasi,
  bidang, deadline) lalu dilabeli **Sangat Cocok** (≥95), **Cocok** (≥80), atau **Kurang Cocok**.
- Skor latihan dihitung di `src/stores/learning.js` dari panjang jawaban, angka/tahun, dan kata
  kunci personal, lalu di-clamp ke 35–92. Feedback dipilih dari `aiResponses.js`.
- State Pinia disimpan ke `localStorage` (`skular.profile.v1`, `skular.scholarship.v1`,
  `skular.learning.v1`) agar refresh tidak mereset progres.
- Route guard `DEMO_MODE` (di `src/data/user.js`) mengalihkan `/dashboard`, `/rekomendasi`, dan
  `/modul/*` ke `/profiling/1` bila profiling belum selesai. Set `DEMO_MODE = false` untuk
  mematikannya.

## Catatan

- Seluruh tautan "Situs resmi" memakai URL contoh (`example.com`).
- Animasi marquee, progress, dan transisi halaman menghormati `prefers-reduced-motion`.
- Layout dioptimalkan untuk desktop 1440px dan tetap rapi pada 375px (sidebar menjadi drawer,
  grid menjadi satu kolom).
