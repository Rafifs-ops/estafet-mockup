import { createRouter, createWebHistory } from 'vue-router'
import { DEMO_MODE } from '@/data/user'
import { useProfileStore } from '@/stores/profile'

import LandingView from '@/views/LandingView.vue'
import ProfilingView from '@/views/ProfilingView.vue'
import RecommendationView from '@/views/RecommendationView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ModuleView from '@/views/ModuleView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
    meta: { layout: 'public', title: 'Skular — Belajar Beasiswa dengan AI' },
  },
  { path: '/profiling', redirect: '/profiling/1' },
  {
    path: '/profiling/:step',
    name: 'profiling',
    component: ProfilingView,
    meta: { title: 'Profiling · Skular' },
  },
  {
    path: '/rekomendasi',
    name: 'recommendation',
    component: RecommendationView,
    meta: { title: 'Rekomendasi Beasiswa · Skular' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Beranda · Skular' },
  },
  {
    path: '/modul/:id',
    name: 'module',
    component: ModuleView,
    meta: { title: 'Modul · Skular' },
  },
  {
    path: '/perpustakaan',
    name: 'library',
    component: PlaceholderView,
    props: {
      title: 'Perpustakaan',
      description:
        'Kumpulan materi bacaan, contoh esai, dan panduan beasiswa akan tersedia di sini.',
      icon: 'library',
    },
    meta: { title: 'Perpustakaan · Skular' },
  },
  {
    path: '/beasiswa',
    name: 'all-scholarships',
    component: PlaceholderView,
    props: {
      title: 'Semua Beasiswa',
      description: 'Katalog lengkap beasiswa dalam dan luar negeri sedang kami kurasi.',
      icon: 'award',
    },
    meta: { title: 'Semua Beasiswa · Skular' },
  },
  {
    path: '/beasiswa-saya',
    name: 'my-scholarships',
    component: PlaceholderView,
    props: {
      title: 'Beasiswa Saya',
      description: 'Halaman untuk mengelola beasiswa pilihan dan berkas pendaftaran.',
      icon: 'star',
    },
    meta: { title: 'Beasiswa Saya · Skular' },
  },
  {
    path: '/profil',
    name: 'profile',
    component: PlaceholderView,
    props: {
      title: 'Profil & Profiling',
      description: 'Kelola data profil dan ulangi profiling kapan saja dari halaman ini.',
      icon: 'user',
      ctaLabel: 'Ulangi profiling',
      ctaTo: '/profiling/1',
    },
    meta: { title: 'Profil & Profiling · Skular' },
  },
  {
    path: '/cv',
    name: 'cv',
    component: PlaceholderView,
    props: {
      title: 'CV Saya',
      description: 'Penyusun CV ATS-friendly dengan bantuan AI akan segera hadir.',
      icon: 'file-text',
    },
    meta: { title: 'CV Saya · Skular' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 96 }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (!DEMO_MODE) return true
  const needsProfile = ['dashboard', 'module', 'recommendation']
  if (needsProfile.includes(to.name)) {
    const profile = useProfileStore()
    if (!profile.isComplete) {
      return { name: 'profiling', params: { step: 1 } }
    }
  }
  return true
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
