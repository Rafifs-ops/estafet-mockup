import { getModuleMeta, moduleTitle } from './curriculum'

/**
 * Konten modul dummy. Modul 1 ditulis lengkap, modul lain memakai
 * struktur generik yang sama (agar semua modul tetap bisa diklik).
 */
const moduleOne = {
  opening: {
    banner: {
      eyebrow: 'PEMBUKAAN MODUL',
      title: 'Kenali dulu ya',
      text: 'Setiap beasiswa yang berhasil dimulai dari alasan yang jelas. Di modul ini kamu akan menggali motivasi yang paling jujur, lalu merumuskannya menjadi satu paragraf yang layak dibaca penyelenggara.',
    },
    intro:
      'Kamu tidak perlu langsung menulis esai. Cukup pahami dulu mengapa kamu ingin beasiswa ini, lalu susun kalimatnya pelan-pelan. AI Mentor akan menemanimu di setiap langkah.',
    cards: {
      goal: 'Merumuskan motivasi beasiswa yang personal dan konkret, bukan sekadar "butuh biaya".',
      time: '25 menit',
      learn: [
        'Perbedaan motivasi lemah dan kuat',
        'Cara menggali cerita dari pengalaman sehari-hari',
        'Pola paragraf motivasi yang runtut',
      ],
      output: ['Catatan tiga pengalaman pribadi', 'Paragraf motivasi 50–150 kata'],
    },
    howTo: [
      {
        title: 'Baca materi utama',
        text: 'Pahami ringkasan dan tiga insight penting di langkah Pahami.',
      },
      {
        title: 'Jawab quick question',
        text: 'Uji pemahamanmu dengan pernyataan benar atau salah.',
      },
      {
        title: 'Tulis latihan praktik',
        text: 'Rumuskan motivasimu, lalu kirim untuk mendapat feedback AI.',
      },
      {
        title: 'Kunci progresmu',
        text: 'Tandai modul selesai di checkpoint agar modul berikutnya terbuka.',
      },
    ],
  },
  understand: {
    summary: [
      'Motivasi beasiswa bukan daftar prestasi, melainkan penjelasan mengapa kamu memilih jalur ini dan apa yang ingin kamu ubah — pada dirimu, keluargamu, atau lingkunganmu. Penyelenggara ingin melihat alasan yang masuk akal, bukan kalimat yang terdengar mulia tetapi kosong.',
      'Motivasi yang kuat biasanya bergerak dari pengalaman konkret menuju tujuan yang lebih besar. Ceritakan satu momen nyata, jelaskan apa yang kamu pelajari dari momen itu, lalu hubungkan dengan bidang yang ingin kamu tekuni.',
    ],
    insights: [
      {
        title: 'Mulai dari momen, bukan dari gelar',
        text: 'Satu kejadian spesifik lebih meyakinkan daripada lima kalimat tentang "menjadi generasi unggul". Sebutkan waktu, tempat, dan peranmu.',
      },
      {
        title: 'Hubungkan dengan kontribusi',
        text: 'Setelah menjelaskan keinginan pribadi, lanjutkan dengan dampak yang ingin kamu berikan setelah lulus. Beasiswa adalah alat, bukan tujuan akhir.',
      },
      {
        title: 'Tunjukkan bahwa kamu sudah mencari tahu',
        text: 'Sebutkan hal spesifik dari beasiswa yang kamu incar — nilai, program pendampingan, atau jaringan alumni. Ini menandakan kamu serius.',
      },
    ],
    core: {
      title: 'Inti materi',
      text: 'Rumus sederhana: pengalaman nyata → pelajaran yang diambil → tujuan yang ingin dicapai → kontribusi yang ditawarkan. Empat bagian ini bisa menjadi empat kalimat, lalu dikembangkan menjadi satu paragraf 50–150 kata.',
    },
  },
  quick: {
    questions: [
      {
        id: 'q1',
        statement: 'Kalimat "saya butuh biaya kuliah" sudah cukup menjelaskan motivasi beasiswa.',
        answer: 'Salah',
        explanation:
          'Kebutuhan biaya boleh disebut, tetapi bukan alasan utama. Penyelenggara mencari tujuan belajar dan kontribusi yang lebih jelas.',
      },
      {
        id: 'q2',
        statement:
          'Motivasi yang kuat menghubungkan pengalaman pribadi dengan dampak bagi orang lain.',
        answer: 'Benar',
        explanation:
          'Pengalaman pribadi membuat ceritamu unik, sedangkan dampak menunjukkan bahwa beasiswa akan digunakan secara bertanggung jawab.',
      },
      {
        id: 'q3',
        statement: 'Meniru gaya bahasa penerima beasiswa sebelumnya membuat esaimu lebih meyakinkan.',
        answer: 'Salah',
        explanation:
          'Meniru gaya orang lain justru membuat tulisan terasa generik. Gunakan struktur yang rapi, tetapi tetap pakai suaramu sendiri.',
      },
      {
        id: 'q4',
        statement: 'Menyebut detail program beasiswa menunjukkan bahwa kamu sudah melakukan riset.',
        answer: 'Benar',
        explanation:
          'Detail seperti program pendampingan atau jaringan alumni menunjukkan ketertarikan yang serius dan spesifik.',
      },
    ],
  },
  practice: {
    title: 'Rumusan Motivasi Beasiswa',
    brief:
      'Tulis satu paragraf motivasi (50–150 kata). Mulai dari pengalaman nyata, lalu hubungkan dengan tujuan dan kontribusimu.',
    prompt:
      'Mengapa kamu ingin mendapatkan beasiswa ini, dan apa yang akan kamu lakukan setelah mendapatkannya?',
    hint: 'Gunakan bahasa yang jelas dan runtut. Sebut satu pengalaman nyata dan satu tujuan konkret.',
    minChars: 50,
    placeholder:
      'Contoh: Saya pernah membantu kelompok tani di desa saya mencatat hasil panen secara digital. Dari situ saya sadar...',
    rubric: [
      'Ada pengalaman atau momen nyata yang spesifik.',
      'Menjelaskan tujuan belajar atau karier yang masuk akal.',
      'Menyebut kontribusi setelah lulus.',
      'Bahasa runtut dan tidak berisi klise berlebihan.',
    ],
  },
}

/**
 * Membuat konten generik untuk modul 2–11 dari metadata kurikulum,
 * sehingga struktur tiap modul tetap sama.
 */
function buildGenericContent(meta, scholarshipName) {
  const title = moduleTitle(meta, scholarshipName)
  return {
    opening: {
      banner: {
        eyebrow: 'PEMBUKAAN MODUL',
        title: 'Siap mulai?',
        text: `Modul "${title}" membantumu menyiapkan satu bagian penting dari pendaftaran beasiswa. Kerjakan satu langkah setiap hari agar tidak menumpuk di akhir.`,
      },
      intro:
        'Ikuti alur modul dari pembukaan sampai checkpoint. Setiap langkah dirancang singkat agar kamu bisa langsung praktik.',
      cards: {
        goal: meta.description,
        time: meta.duration,
        learn: meta.objectives,
        output: [meta.output],
      },
      howTo: [
        { title: 'Pahami materi', text: 'Baca ringkasan dan tiga insight utama.' },
        { title: 'Uji pemahaman', text: 'Jawab quick question untuk mengecek materi.' },
        { title: 'Kerjakan latihan', text: 'Tulis jawaban dan minta feedback AI.' },
        { title: 'Kunci progres', text: 'Tandai modul selesai di checkpoint.' },
      ],
    },
    understand: {
      summary: [
        meta.description,
        'Bagian ini disusun bertahap: pahami prinsipnya, lihat contoh, lalu terapkan pada dokumenmu sendiri. Jangan mengejar sempurna di draf pertama — yang penting adalah bahan yang bisa diperbaiki.',
      ],
      insights: meta.objectives.map((objective, index) => ({
        title: `Fokus ${index + 1}`,
        text: objective,
      })),
      core: {
        title: 'Inti materi',
        text: `Satu langkah kecil hari ini lebih berguna daripada rencana besar yang tidak pernah ditulis. Untuk modul ini, target akhirnya adalah: ${meta.output}`,
      },
    },
    quick: {
      questions: [
        {
          id: 'q1',
          statement: `Modul "${meta.shortTitle}" sebaiknya dikerjakan setelah dokumen pendaftaran lain selesai.`,
          answer: 'Salah',
          explanation:
            'Modul ini disusun berurutan. Mengerjakannya lebih awal membuat dokumen lain lebih mudah disusun.',
        },
        {
          id: 'q2',
          statement: 'Draf pertama boleh belum sempurna, yang penting bisa ditinjau dan diperbaiki.',
          answer: 'Benar',
          explanation:
            'Perbaikan berulang adalah bagian normal dari proses menulis dokumen beasiswa.',
        },
        {
          id: 'q3',
          statement: 'Meminta feedback AI berarti jawabanmu tidak perlu kamu periksa lagi.',
          answer: 'Salah',
          explanation:
            'Feedback AI adalah bahan pertimbangan. Keputusan akhir dan kebenaran isi tetap milikmu.',
        },
      ],
    },
    practice: {
      title: `Latihan ${meta.shortTitle}`,
      brief: `Kerjakan latihan berikut sesuai target modul: ${meta.output}`,
      prompt: `Tulis draf pertamamu untuk "${title}". Jelaskan langkah yang kamu ambil dan alasan di baliknya.`,
      hint: 'Gunakan bahasa yang jelas dan runtut. Sebutkan satu contoh nyata yang relevan.',
      minChars: 50,
      placeholder: 'Tulis jawabanmu di sini. Mulai dari hal yang paling kamu yakini...',
      rubric: [
        'Menjawab pertanyaan latihan secara langsung.',
        'Memakai contoh nyata atau detail spesifik.',
        'Bahasa runtut dan mudah dipahami.',
        'Sesuai dengan target output modul.',
      ],
    },
  }
}

export function getModuleContent(id, scholarshipName) {
  const meta = getModuleMeta(id)
  if (!meta) return null
  if (Number(id) === 1) return moduleOne
  return buildGenericContent(meta, scholarshipName)
}
