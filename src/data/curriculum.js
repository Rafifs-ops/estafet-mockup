/**
 * Roadmap belajar: 3 fase, 11 modul (9 Inti + 2 Template).
 * Judul modul Template memakai placeholder {Beasiswa} yang diganti
 * dengan nama beasiswa aktif di stores/learning.js.
 */
export const phases = [
  {
    id: 1,
    number: '01',
    title: 'Fondasi Diri',
    description: 'Kenali tujuan, kekuatan, dan ceritamu sebagai calon penerima beasiswa.',
    moduleIds: [1, 2, 3],
  },
  {
    id: 2,
    number: '02',
    title: 'Menulis Dokumen',
    description: 'Susun esai, CV, dan dokumen pendaftaran yang meyakinkan.',
    moduleIds: [4, 5, 6, 7],
  },
  {
    id: 3,
    number: '03',
    title: 'Persiapan Pendaftaran',
    description: 'Selesaikan berkas khusus beasiswa dan bersiap menghadapi seleksi.',
    moduleIds: [8, 9, 10, 11],
  },
]

export const modules = [
  {
    id: 1,
    phaseId: 1,
    type: 'inti',
    title: 'Mengenal Tujuan dan Motivasi Beasiswa',
    shortTitle: 'Tujuan & Motivasi',
    description: 'Merumuskan alasan personal yang kuat sebelum menulis dokumen apa pun.',
    duration: '25 menit',
    objectives: [
      'Menjelaskan perbedaan motivasi beasiswa yang lemah dan yang kuat.',
      'Menggali pengalaman pribadi yang bisa menjadi bahan cerita.',
      'Merumuskan satu paragraf motivasi beasiswa versi pertamamu.',
    ],
    output: 'Paragraf motivasi beasiswa (50–150 kata).',
  },
  {
    id: 2,
    phaseId: 1,
    type: 'inti',
    title: 'Menyusun Personal Branding',
    shortTitle: 'Personal Branding',
    description: 'Menemukan tiga kekuatan utama yang membedakan dirimu dari pendaftar lain.',
    duration: '30 menit',
    objectives: [
      'Memetakan pengalaman, keterampilan, dan nilai yang kamu miliki.',
      'Memilih tiga kekuatan utama untuk digunakan di esai dan wawancara.',
      'Menyusun kalimat positioning diri yang singkat.',
    ],
    output: 'Rumusan personal branding tiga kekuatan.',
  },
  {
    id: 3,
    phaseId: 1,
    type: 'inti',
    title: 'Anatomi Esai Motivasi',
    shortTitle: 'Anatomi Esai',
    description: 'Membedah struktur esai motivasi dari pembuka hingga penutup.',
    duration: '35 menit',
    objectives: [
      'Mengenali struktur esai motivasi yang diterima penyelenggara.',
      'Menghindari klise dan kalimat generik.',
      'Menyusun kerangka esai sendiri.',
    ],
    output: 'Kerangka esai motivasi 4 paragraf.',
  },
  {
    id: 4,
    phaseId: 2,
    type: 'inti',
    title: 'Menyusun CV yang ATS-Friendly',
    shortTitle: 'CV ATS-Friendly',
    description: 'Menulis CV yang mudah dibaca mesin dan tetap enak dibaca manusia.',
    duration: '30 menit',
    objectives: [
      'Memahami cara kerja ATS dalam seleksi berkas.',
      'Menulis pengalaman dengan pola tindakan–hasil.',
      'Merapikan format CV tanpa ornamen yang mengganggu.',
    ],
    output: 'CV satu halaman siap unggah.',
  },
  {
    id: 5,
    phaseId: 2,
    type: 'inti',
    title: 'Video: Memulai Cerita Motivasi',
    shortTitle: 'Video Motivasi',
    description: 'Merekam cerita motivasi singkat dengan struktur yang jelas.',
    duration: '20 menit',
    objectives: [
      'Menyusun naskah video 60 detik.',
      'Berlatih intonasi dan bahasa tubuh di depan kamera.',
      'Merekam video perkenalan yang layak dinilai.',
    ],
    output: 'Draf video motivasi 60 detik.',
  },
  {
    id: 6,
    phaseId: 2,
    type: 'inti',
    title: 'Checklist Dokumen Pendaftaran',
    shortTitle: 'Checklist Dokumen',
    description: 'Mengumpulkan dan memeriksa berkas agar tidak ada yang tertinggal.',
    duration: '15 menit',
    objectives: [
      'Membuat daftar dokumen wajib dan opsional.',
      'Memeriksa konsistensi nama, tanggal, dan tanda tangan.',
      'Menetapkan tenggat pribadi sebelum deadline resmi.',
    ],
    output: 'Checklist berkas terverifikasi.',
  },
  {
    id: 7,
    phaseId: 2,
    type: 'inti',
    title: 'Simulasi Wawancara Beasiswa',
    shortTitle: 'Simulasi Wawancara',
    description: 'Berlatih menjawab pertanyaan wawancara dengan contoh konkret.',
    duration: '40 menit',
    objectives: [
      'Memprediksi pertanyaan yang sering muncul.',
      'Menjawab dengan struktur situasi–tindakan–hasil.',
      'Mengelola gugup dan menjaga alur cerita.',
    ],
    output: 'Catatan jawaban untuk 5 pertanyaan inti.',
  },
  {
    id: 8,
    phaseId: 3,
    type: 'template',
    title: 'Esai Khusus {Beasiswa}',
    shortTitle: 'Esai Khusus',
    description: 'Menyesuaikan esai motivasi dengan visi dan kriteria beasiswa pilihanmu.',
    duration: '45 menit',
    objectives: [
      'Membaca ulang kriteria seleksi beasiswa pilihanmu.',
      'Menyesuaikan cerita tanpa kehilangan suaramu sendiri.',
      'Menyelesaikan draf esai khusus yang siap ditinjau.',
    ],
    output: 'Draf esai khusus beasiswa.',
  },
  {
    id: 9,
    phaseId: 3,
    type: 'template',
    title: 'Berkas dan Seleksi {Beasiswa}',
    shortTitle: 'Berkas & Seleksi',
    description: 'Merapikan berkas dan menyiapkan tahap seleksi khusus beasiswa pilihanmu.',
    duration: '30 menit',
    objectives: [
      'Mencocokkan berkas dengan panduan resmi beasiswa.',
      'Menyiapkan jawaban untuk seleksi tahap kedua.',
      'Menyusun jadwal unggah berkas.',
    ],
    output: 'Berkas final dan jadwal seleksi.',
  },
  {
    id: 10,
    phaseId: 3,
    type: 'inti',
    title: 'Menulis Rencana Studi',
    shortTitle: 'Rencana Studi',
    description: 'Menyusun rencana studi yang masuk akal dan selaras dengan tujuan beasiswa.',
    duration: '35 menit',
    objectives: [
      'Memetakan rencana belajar per semester.',
      'Menghubungkan rencana studi dengan kontribusi setelah lulus.',
      'Menulis rencana studi dua halaman.',
    ],
    output: 'Rencana studi dua halaman.',
  },
  {
    id: 11,
    phaseId: 3,
    type: 'inti',
    title: 'Persiapan Administrasi Akhir',
    shortTitle: 'Administrasi Akhir',
    description: 'Pemeriksaan akhir sebelum tombol kirim pendaftaran ditekan.',
    duration: '20 menit',
    objectives: [
      'Memeriksa ulang seluruh berkas dan format nama file.',
      'Menyiapkan cadangan dokumen.',
      'Menetapkan rencana tindak lanjut setelah mendaftar.',
    ],
    output: 'Berkas final terunggah dengan aman.',
  },
]

export const totalModules = modules.length

export function getModuleMeta(id) {
  return modules.find((module) => module.id === Number(id)) || null
}

export function getPhaseOfModule(id) {
  const mod = getModuleMeta(id)
  if (!mod) return null
  return phases.find((phase) => phase.id === mod.phaseId) || null
}

/** Mengganti placeholder {Beasiswa} pada modul Template. */
export function moduleTitle(module, scholarshipName) {
  return module.title.replace('{Beasiswa}', scholarshipName || 'Beasiswa Pilihanmu')
}

