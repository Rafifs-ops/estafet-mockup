/**
 * Semua "kecerdasan" AI di prototype ini palsu: respons statis, dipilih
 * berdasarkan skor atau kata kunci, dengan delay buatan di komponen.
 */

export const feedbackByRange = {
  low: [
    {
      summary:
        'Jawabanmu sudah menunjukkan niat baik, tetapi masih terlalu umum. Pembaca belum bisa membayangkan pengalaman dan tujuan yang benar-benar milikmu.',
      strengths: [
        'Kamu sudah menuliskan alasan ingin mendaftar beasiswa.',
        'Arah tulisan sudah terasa, hanya perlu detail yang lebih konkret.',
      ],
      improvements: [
        'Ganti pernyataan umum dengan satu momen nyata yang bisa dijelaskan (kapan, di mana, apa peranmu).',
        'Tambahkan tujuan yang spesifik, misalnya bidang atau program yang ingin kamu tekuni.',
        'Panjang jawaban masih pendek; kembangkan menjadi minimal tiga kalimat utuh.',
      ],
      next: [
        'Tulis satu paragraf tentang pengalaman yang paling membentuk cara berpikirmu.',
        'Sebutkan satu hal konkret yang ingin kamu lakukan setelah lulus.',
        'Kirim ulang jawabanmu untuk melihat perubahannya.',
      ],
    },
    {
      summary:
        'Ide dasarnya sudah ada, namun hubungan antara pengalaman, tujuan, dan kontribusi belum terlihat. Coba rangkai ketiganya dalam satu alur.',
      strengths: [
        'Ada kesadaran bahwa beasiswa bukan hanya soal biaya.',
        'Kamu sudah menyebut bidang yang diminati.',
      ],
      improvements: [
        'Sertakan contoh pengalaman yang mendukung bidang tersebut.',
        'Hindari kalimat klise seperti "generasi unggul" tanpa penjelasan.',
        'Tutup dengan kontribusi yang realistis, bukan janji besar.',
      ],
      next: [
        'Buat kerangka empat kalimat: pengalaman, pelajaran, tujuan, kontribusi.',
        'Baca ulang dan tandai kalimat yang tidak bisa kamu buktikan.',
        'Kirim ulang setelah kerangka itu kamu kembangkan.',
      ],
    },
  ],
  mid: [
    {
      summary:
        'Jawabanmu sudah cukup jelas dan personal. Ada pengalaman nyata yang mendukung, hanya saja bagian kontribusi belum cukup meyakinkan.',
      strengths: [
        'Pengalaman pribadi disebutkan dan terasa relevan.',
        'Alasan memilih beasiswa dijelaskan dengan bahasa sendiri.',
        'Struktur tulisan mudah diikuti dari awal sampai akhir.',
      ],
      improvements: [
        'Pertegas kontribusi setelah lulus dengan contoh yang bisa diukur.',
        'Satu kalimat masih terlalu panjang; pecah agar lebih mudah dibaca.',
        'Sebutkan detail program beasiswa yang membuatmu tertarik, bukan hanya nama beasiswanya.',
      ],
      next: [
        'Tambahkan satu kalimat tentang dampak yang ingin kamu berikan.',
        'Cek apakah setiap klaim didukung contoh.',
        'Simpan versi ini sebagai draf kedua sebelum lanjut ke esai penuh.',
      ],
    },
    {
      summary:
        'Arah motivasimu sudah terbaca dan didukung contoh. Kekuatannya ada pada cerita pribadi; bagian tujuan jangka panjang masih bisa dipertajam.',
      strengths: [
        'Cerita pribadi membuat tulisan terasa autentik.',
        'Tujuan yang kamu tulis masuk akal untuk jenjang yang dipilih.',
      ],
      improvements: [
        'Hubungkan tujuan jangka pendek dengan rencana studi konkret.',
        'Tambahkan alasan mengapa beasiswa ini, bukan beasiswa lain.',
        'Perhatikan konsistensi kata ganti dan tanda baca.',
      ],
      next: [
        'Tulis satu kalimat "setelah lulus saya akan ...".',
        'Cocokkan jawabanmu dengan kriteria seleksi beasiswa.',
        'Lanjut ke latihan esai penuh di modul berikutnya.',
      ],
    },
  ],
  high: [
    {
      summary:
        'Jawabanmu kuat dan spesifik. Pengalaman, tujuan, dan kontribusi sudah terhubung dalam satu alur yang meyakinkan.',
      strengths: [
        'Ada detail konkret yang membuat ceritamu sulit ditiru pendaftar lain.',
        'Tujuan belajar dan kontribusi dijelaskan secara realistis.',
        'Bahasa runtut, personal, dan tidak berlebihan.',
      ],
      improvements: [
        'Rapikan satu kalimat yang masih mengandung dua ide sekaligus.',
        'Kurangi kata sifat yang tidak perlu agar klaim lebih kuat.',
        'Pastikan istilah teknis sesuai dengan panduan resmi beasiswa.',
      ],
      next: [
        'Simpan versi ini sebagai fondasi esai motivasi penuh.',
        'Minta pendapat satu orang yang mengenalmu untuk mengecek keasliannya.',
        'Lanjut ke modul Anatomi Esai Motivasi.',
      ],
    },
    {
      summary:
        'Tulisanmu sudah layak menjadi draf utama. Pembaca dapat memahami siapa dirimu, mengapa kamu memilih beasiswa ini, dan apa yang ingin kamu capai.',
      strengths: [
        'Momen nyata dipakai dengan tepat, bukan sekadar daftar prestasi.',
        'Hubungan antara kebutuhan pribadi dan kontribusi sosial terasa wajar.',
        'Kalimat penutup meninggalkan kesan yang jelas.',
      ],
      improvements: [
        'Tambahkan satu data atau angka untuk memperkuat dampak yang ingin dicapai.',
        'Periksa panjang paragraf agar tetap nyaman dibaca di layar.',
        'Cek ulang detail nama program sebelum dipakai di esai final.',
      ],
      next: [
        'Jadikan paragraf ini pembuka esai motivasi.',
        'Kembangkan dua paragraf pendukung dari kerangka yang sudah kamu buat.',
        'Kunci modul lalu lanjut ke modul berikutnya.',
      ],
    },
  ],
}

export const chatReplies = [
  {
    keywords: ['memahami instruksi', 'instruksi', 'tugasnya', 'apa yang diminta'],
    reply:
      'Instruksinya meminta **satu paragraf motivasi 50–150 kata**.\n\nIsi minimalnya:\n- satu pengalaman nyata,\n- pelajaran yang kamu ambil,\n- tujuanmu,\n- kontribusi setelah lulus.\n\nMulai dari satu momen yang paling kamu ingat, lalu tulis pelan-pelan. Tidak perlu langsung sempurna.',
  },
  {
    keywords: ['contoh', 'contoh motivasi', 'kuat', 'referensi'],
    reply:
      'Contoh arah yang kuat (bukan untuk disalin):\n\n"Saya pernah membantu ibu mencatat penjualan di pasar dengan spreadsheet sederhana. Dari situ saya sadar data bisa membuat keputusan usaha kecil lebih tepat. Saya ingin mendalami analisis data, dan setelah lulus saya berencana membangun pendampingan literasi data untuk pedagang di kampung saya."\n\nPerhatikan polanya: **momen → pelajaran → tujuan → kontribusi**.',
  },
  {
    keywords: ['salah', 'kurang', 'perbaiki', 'jawabanku', 'evaluasi'],
    reply:
      'Coba cek tiga hal ini pada jawabanmu:\n\n1. Apakah ada satu momen nyata, bukan pernyataan umum?\n2. Apakah tujuanmu spesifik untuk bidang yang kamu pilih?\n3. Apakah kamu menyebut kontribusi setelah lulus?\n\nKalau salah satunya belum ada, tambahkan dulu satu kalimat. Kirim ulang setelah itu, nanti skornya diperbarui.',
  },
  {
    keywords: ['panjang', 'jumlah kata', 'berapa kata', 'minimal'],
    reply:
      'Target latihan ini **50–150 kata**. Lebih penting padat dan jelas daripada panjang.\n\nKalau jawabanmu masih di bawah 50 karakter, tambahkan satu pengalaman dan satu tujuan. Kalau sudah lebih dari 150 kata, potong kalimat yang mengulang ide yang sama.',
  },
  {
    keywords: ['skor', 'nilai', 'bagaimana dinilai', 'rubrik'],
    reply:
      'Skor latihan dihitung dari panjang jawaban, adanya detail angka atau tahun, kata kunci personal seperti **"saya pernah"**, dan keterkaitan dengan motivasi atau beasiswa.\n\nRubrik lengkapnya:\n- pengalaman spesifik,\n- tujuan yang masuk akal,\n- kontribusi,\n- kejelasan bahasa.\n\nGunakan skor sebagai penanda, bukan patokan akhir.',
  },
  {
    keywords: ['mulai', 'bingung', 'tidak tahu', 'pemicu', 'ide'],
    reply:
      'Kalau bingung, buka bagian **"Butuh pemicu ide sebelum menulis?"** di bawah kolom jawaban. Jawab tiga pertanyaan singkat di sana, lalu tekan "Susun kerangka draf".\n\nAlternatifnya, ceritakan saja satu hal yang paling membuatmu ingin kuliah di bidang ini. Saya bantu rapikan.',
  },
  {
    keywords: ['deadline', 'waktu', 'kapan', 'tenggat'],
    reply:
      'Untuk latihan ini tidak ada tenggat ketat. Tapi biasakan menyelesaikan satu latihan per sesi, sekitar **15–20 menit**.\n\nKalau beasiswa yang kamu incar punya deadline dekat, prioritaskan modul Template terlebih dahulu.',
  },
  {
    keywords: ['lanjut', 'selanjutnya', 'checkpoint', 'selesai'],
    reply:
      'Setelah minimal satu kali submit latihan, tombol **Lanjut ke checkpoint** akan aktif.\n\nDi checkpoint kamu bisa menandai modul selesai. Setelah itu modul berikutnya di roadmap otomatis terbuka.',
  },
]

export const chatFallback =
  'Saya belum punya jawaban spesifik untuk itu. Coba tanyakan hal lain seputar modul ini, misalnya cara memahami instruksi, contoh motivasi yang kuat, atau cara memperbaiki jawabanmu.\n\nIngat: saya membantu kamu berpikir, bukan mengisi jawabanmu.'

export const ideaPrompts = [
  {
    id: 'moment',
    label: 'Momen apa yang membuatmu tertarik pada bidang ini?',
    placeholder: 'Contoh: membantu kelompok tani mencatat panen',
  },
  {
    id: 'lesson',
    label: 'Pelajaran apa yang kamu ambil dari momen itu?',
    placeholder: 'Contoh: data membuat keputusan lebih tepat',
  },
  {
    id: 'goal',
    label: 'Apa yang ingin kamu lakukan setelah lulus?',
    placeholder: 'Contoh: mendampingi pedagang kecil',
  },
]

export const quickChips = [
  'Bantu saya memahami instruksinya',
  'Beri contoh motivasi yang kuat',
  'Apa yang salah dari jawabanku?',
]
