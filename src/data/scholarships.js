export const FIELD_OPTIONS = [
  'Teknologi',
  'Bisnis',
  'Sosial & Humaniora',
  'Pendidikan',
  'Kesehatan',
  'Engineering',
  'Seni & Desain',
  'Pertanian',
]

/**
 * Dataset dummy beasiswa. Semua syarat dipakai untuk menghitung skor match
 * di stores/scholarship.js (tanpa backend).
 */
export const scholarships = [
  {
    id: 'agro-masa-depan',
    name: 'Beasiswa Agro Masa Depan',
    organizer: 'Konsorsium Agribisnis',
    level: 'D4',
    location: 'Dalam Negeri',
    city: 'Bogor',
    quota: 45,
    minGpa: 3.1,
    maxAge: 25,
    requiresSktm: false,
    deadline: '2026-11-18',
    fields: ['Pertanian', 'Teknologi', 'Engineering'],
    website: 'https://example.com/agro-masa-depan',
    highlight: 'Beasiswa unggulan vokasi agribisnis dengan pendampingan mentor.',
  },
  {
    id: 'diploma-unggul',
    name: 'Beasiswa Diploma Unggul',
    organizer: 'Konsorsium Industri Manufaktur',
    level: 'D4',
    location: 'Dalam Negeri',
    city: 'Bandung',
    quota: 30,
    minGpa: 3.0,
    maxAge: 25,
    requiresSktm: false,
    deadline: '2026-11-30',
    fields: ['Engineering', 'Teknologi'],
    website: 'https://example.com/diploma-unggul',
    highlight: 'Program talenta manufaktur dengan magang di mitra industri.',
  },
  {
    id: 'vokasi-terampil',
    name: 'Beasiswa Vokasi Terampil',
    organizer: 'Politeknik Negeri',
    level: 'D3',
    location: 'Dalam Negeri',
    city: 'Yogyakarta',
    quota: 60,
    minGpa: 2.75,
    maxAge: 21,
    requiresSktm: true,
    deadline: '2026-11-24',
    fields: [],
    website: 'https://example.com/vokasi-terampil',
    highlight: 'Bantuan biaya pendidikan untuk mahasiswa vokasi berprestasi.',
  },
  {
    id: 'unggulan-nusantara',
    name: 'Beasiswa Unggulan Nusantara',
    organizer: 'Yayasan Pendidikan Nusantara',
    level: 'S1',
    location: 'Dalam Negeri',
    city: 'Jakarta',
    quota: 120,
    minGpa: 3.25,
    maxAge: 23,
    requiresSktm: false,
    deadline: '2026-12-05',
    fields: ['Bisnis', 'Sosial & Humaniora', 'Teknologi'],
    website: 'https://example.com/unggulan-nusantara',
    highlight: 'Beasiswa penuh plus program pengembangan kepemimpinan.',
  },
  {
    id: 'magister-global',
    name: 'Beasiswa Magister Global',
    organizer: 'Global Futures Foundation',
    level: 'S2',
    location: 'Luar Negeri',
    city: 'Singapura',
    quota: 25,
    minGpa: 3.5,
    maxAge: 30,
    requiresSktm: false,
    deadline: '2026-12-20',
    fields: ['Bisnis', 'Teknologi', 'Sosial & Humaniora'],
    website: 'https://example.com/magister-global',
    highlight: 'Studi magister di Asia Tenggara dengan tunjangan riset.',
  },
  {
    id: 'bangkit-bersama',
    name: 'Beasiswa Bangkit Bersama',
    organizer: 'Kementerian Pendidikan Tinggi',
    level: 'S1',
    location: 'Dalam Negeri',
    city: 'Surabaya',
    quota: 200,
    minGpa: 3.0,
    maxAge: 22,
    requiresSktm: true,
    deadline: '2026-11-10',
    fields: [],
    website: 'https://example.com/bangkit-bersama',
    highlight: 'Beasiswa afirmasi untuk mahasiswa semester awal.',
  },
  {
    id: 'riset-unggul',
    name: 'Beasiswa Riset Unggul',
    organizer: 'Lembaga Riset Indonesia',
    level: 'S2',
    location: 'Dalam Negeri',
    city: 'Bandung',
    quota: 40,
    minGpa: 3.4,
    maxAge: 32,
    requiresSktm: false,
    deadline: '2026-12-01',
    fields: ['Kesehatan', 'Teknologi', 'Pertanian'],
    website: 'https://example.com/riset-unggul',
    highlight: 'Dukungan riset tesis dan publikasi ilmiah.',
  },
  {
    id: 'kreatif-muda',
    name: 'Beasiswa Kreatif Muda',
    organizer: 'Yayasan Seni Nusantara',
    level: 'S1',
    location: 'Dalam Negeri',
    city: 'Denpasar',
    quota: 35,
    minGpa: 2.9,
    maxAge: 24,
    requiresSktm: false,
    deadline: '2026-11-27',
    fields: ['Seni & Desain', 'Sosial & Humaniora'],
    website: 'https://example.com/kreatif-muda',
    highlight: 'Beasiswa untuk mahasiswa dengan portofolio kreatif.',
  },
  {
    id: 'doktoral-global',
    name: 'Beasiswa Doktoral Global',
    organizer: 'Erasmus Knowledge Network',
    level: 'S3',
    location: 'Luar Negeri',
    city: 'Belanda',
    quota: 12,
    minGpa: 3.6,
    maxAge: 35,
    requiresSktm: false,
    deadline: '2026-12-12',
    fields: [],
    website: 'https://example.com/doktoral-global',
    highlight: 'Program doktoral penuh dengan kolaborasi lintas universitas.',
  },
]

export function getScholarship(id) {
  return scholarships.find((item) => item.id === id) || null
}

/** Mengembalikan jumlah hari menuju deadline dari tanggal hari ini. */
export function daysUntil(dateString) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${dateString}T00:00:00`)
  const diff = Math.round((target - today) / 86_400_000)
  return diff
}

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(`${dateString}T00:00:00`)
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}
