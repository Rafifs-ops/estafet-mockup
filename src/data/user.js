export const DEMO_MODE = true

export const user = {
  name: 'Farhan Ar Raziq',
  shortName: 'Farhan',
  initials: 'FAR',
  email: 'farhanarraziq@gmail.com',
  phone: '0812 3456 7890',
  city: 'Bogor',
  tagline: 'SKULAR · BELAJAR BEASISWA DENGAN AI',
}

/**
 * Jawaban default profiling. Semua langkah sudah valid, sehingga demo bisa
 * dilalui hanya dengan menekan "Lanjut".
 */
export const demoProfile = {
  level: 'S1',
  age: '21',
  gpa: '3.45',
  sktm: 'ya',
  target: 'S1',
  location: 'Dalam Negeri',
  field: 'Teknologi',
  phone: '812 3456 7890',
}

/** Contoh jawaban latihan yang langsung terisi di langkah Praktik. */
export const demoPracticeAnswer =
  'Saya pernah membantu kelompok tani di desa saya mencatat hasil panen secara digital pada 2024. ' +
  'Dari pengalaman itu saya belajar bahwa data yang rapi membuat keputusan usaha kecil jadi lebih tepat. ' +
  'Saya ingin mendalami analisis data dan teknologi supaya bisa membantu lebih banyak pelaku usaha kecil. ' +
  'Setelah lulus, saya berencana membangun pendampingan literasi data untuk pedagang di kampung saya ' +
  'agar mereka bisa memakai data untuk meningkatkan penjualan.'

/** Jawaban default untuk pertanyaan pemicu ide sebelum menulis. */
export const demoIdeaAnswers = {
  moment: 'membantu kelompok tani di desa saya mencatat hasil panen secara digital',
  lesson: 'data yang rapi membuat keputusan usaha kecil lebih tepat',
  goal: 'membangun pendampingan literasi data untuk pedagang kecil di kampung saya',
}
