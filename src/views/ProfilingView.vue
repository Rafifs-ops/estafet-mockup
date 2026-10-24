<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StepHeader from '@/components/profiling/StepHeader.vue'
import OptionCard from '@/components/profiling/OptionCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { PROFILE_STEPS, useProfileStore } from '@/stores/profile'

const route = useRoute()
const router = useRouter()
const profile = useProfileStore()

const levels = ['SMA', 'SMK', 'D3', 'D4', 'S1', 'S2', 'S3']

const fields = [
  { name: 'Teknologi', icon: 'layers', description: 'Software, data, AI, dan produk digital.' },
  { name: 'Bisnis', icon: 'briefcase', description: 'Manajemen, keuangan, dan kewirausahaan.' },
  { name: 'Sosial & Humaniora', icon: 'users', description: 'Psikologi, hubungan internasional, hukum.' },
  { name: 'Pendidikan', icon: 'book-open', description: 'Keguruan, pendidikan luar sekolah, literasi.' },
  { name: 'Kesehatan', icon: 'shield', description: 'Kedokteran, keperawatan, gizi, farmasi.' },
  { name: 'Engineering', icon: 'target', description: 'Mesin, sipil, elektro, dan manufaktur.' },
  { name: 'Seni & Desain', icon: 'pen', description: 'Desain visual, film, musik, sastra.' },
  { name: 'Pertanian', icon: 'sparkles', description: 'Agribisnis, agroteknologi, kehutanan.' },
]

const subtitles = {
  1: 'Pilih jenjang pendidikan yang sedang kamu tempuh saat ini.',
  2: 'Usia dipakai untuk menyaring beasiswa yang punya batas maksimal.',
  3: 'Gunakan skala 0–4, contoh 3.45. Kalau belum ada IPK, isi rata-rata rapor terakhirmu.',
  4: 'Beasiswa tertentu mensyaratkan SKTM. Jawabanmu tidak mempengaruhi statusmu.',
  5: 'Target jenjang dipakai untuk mencocokkan program beasiswa.',
  6: 'Lokasi tujuan studi mempengaruhi daftar beasiswa yang muncul.',
  7: 'Pilih satu bidang yang paling dekat dengan rencana studimu.',
  8: 'Kami hanya memakainya untuk mengirim pengingat deadline beasiswamu.',
}

const current = computed(() => {
  const value = Number(route.params.step)
  if (!Number.isFinite(value)) return 1
  return Math.min(PROFILE_STEPS.length, Math.max(1, Math.trunc(value)))
})

const stepInfo = computed(
  () => PROFILE_STEPS.find((item) => item.n === current.value) || PROFILE_STEPS[0],
)
const canContinue = computed(() => profile.isCompleteAnswer(current.value))
const completedSteps = computed(() =>
  PROFILE_STEPS.filter(
    (item) => item.n < current.value && profile.isCompleteAnswer(item.n),
  ).map((item) => item.n),
)
const form = computed(() => profile.form)
const ageValid = computed(() => {
  const age = Number(form.value.age)
  return form.value.age === '' || (age >= 14 && age <= 60)
})
const gpaValid = computed(() => {
  if (form.value.gpa === '') return true
  const gpa = Number(form.value.gpa)
  return Number.isFinite(gpa) && gpa >= 0 && gpa <= 4
})
const phoneValid = computed(
  () => form.value.phone === '' || form.value.phone.replace(/\D/g, '').length >= 9,
)

watch(
  current,
  (value) => {
    profile.step = value
    if (String(value) !== String(route.params.step)) {
      router.replace(`/profiling/${value}`)
    }
  },
  { immediate: true },
)

function goNext() {
  if (!canContinue.value) return
  if (current.value === PROFILE_STEPS.length) {
    if (profile.finishProfiling()) router.push('/rekomendasi')
    return
  }
  router.push(`/profiling/${current.value + 1}`)
}

function goBack() {
  if (current.value <= 1) return
  router.push(`/profiling/${current.value - 1}`)
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <StepHeader :current="current" :completed="completedSteps" />

    <section class="card-surface mt-4 p-5 sm:p-7">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="label-xs">Langkah {{ current }}</p>
          <h2 class="mt-1.5 text-xl font-semibold tracking-tight text-ink sm:text-[22px]">
            {{ stepInfo.title }}
          </h2>
          <p class="mt-1.5 max-w-lg text-[12.5px] leading-relaxed text-body">
            {{ subtitles[current] }}
          </p>
        </div>
        <BaseBadge variant="neutral" size="sm" class="mt-1 shrink-0">
          {{ stepInfo.name }}
        </BaseBadge>
      </div>

      <form class="mt-6" @submit.prevent="goNext">
        <Transition name="page" mode="out-in">
          <!-- STEP 1 -->
          <div v-if="current === 1" key="step-1" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <OptionCard
              v-for="level in levels"
              :key="level"
              :title="level"
              icon="graduation-cap"
              :selected="form.level === level"
              @select="profile.setAnswer('level', level)"
            />
          </div>

          <!-- STEP 2 -->
          <div v-else-if="current === 2" key="step-2" class="max-w-sm">
            <label for="age" class="mb-1.5 block text-[12px] font-medium text-ink">
              Usia saat ini
            </label>
            <div class="relative">
              <input
                id="age"
                :value="form.age"
                type="number"
                min="14"
                max="60"
                inputmode="numeric"
                placeholder="Contoh: 21"
                class="field-base pr-16 text-[17px] font-semibold"
                :class="ageValid ? '' : 'border-danger'"
                autocomplete="off"
                @input="profile.setAnswer('age', $event.target.value)"
              />
              <span class="absolute top-1/2 right-4 -translate-y-1/2 text-[11px] text-muted">tahun</span>
            </div>
            <p
              class="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed"
              :class="ageValid ? 'text-muted' : 'text-danger'"
            >
              <AppIcon :name="ageValid ? 'info' : 'alert-triangle'" :size="13" class="mt-px" />
              {{ ageValid ? 'Boleh antara 14 sampai 60 tahun.' : 'Usia harus antara 14 sampai 60 tahun.' }}
            </p>
          </div>

          <!-- STEP 3 -->
          <div v-else-if="current === 3" key="step-3" class="max-w-sm">
            <label for="gpa" class="mb-1.5 block text-[12px] font-medium text-ink">IPK terakhir</label>
            <div class="relative">
              <input
                id="gpa"
                :value="form.gpa"
                type="number"
                min="0"
                max="4"
                step="0.01"
                inputmode="decimal"
                placeholder="3.45"
                class="field-base pr-20 text-[17px] font-semibold"
                :class="gpaValid ? '' : 'border-danger'"
                autocomplete="off"
                @input="profile.setAnswer('gpa', $event.target.value)"
              />
              <span class="absolute top-1/2 right-4 -translate-y-1/2 text-[11px] text-muted">
                dari 4.00
              </span>
            </div>
            <p
              class="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed"
              :class="gpaValid ? 'text-muted' : 'text-danger'"
            >
              <AppIcon :name="gpaValid ? 'info' : 'alert-triangle'" :size="13" class="mt-px" />
              {{
                gpaValid
                  ? 'Gunakan skala 0–4. Kalau belum punya IPK, isi rata-rata nilai terakhirmu.'
                  : 'IPK harus berupa angka antara 0 dan 4.'
              }}
            </p>
          </div>

          <!-- STEP 4 -->
          <div v-else-if="current === 4" key="step-4" class="grid gap-2.5 sm:grid-cols-2">
            <OptionCard
              title="Ya, saya punya"
              description="SKTM dari kelurahan atau desa masih berlaku."
              icon="file-text"
              :selected="form.sktm === 'ya'"
              @select="profile.setAnswer('sktm', 'ya')"
            />
            <OptionCard
              title="Belum / tidak ada"
              description="Tetap bisa lanjut. Beasiswa tanpa SKTM akan tetap muncul."
              icon="x"
              :selected="form.sktm === 'tidak'"
              @select="profile.setAnswer('sktm', 'tidak')"
            />
            <p class="sm:col-span-2 mt-1 flex items-start gap-2 rounded-xl bg-surface-alt/60 p-3 text-[11.5px] leading-relaxed text-body">
              <AppIcon name="shield" :size="15" class="mt-0.5 shrink-0 text-navy" />
              Jawabanmu tidak mempengaruhi statusmu. Data ini hanya dipakai untuk menyaring
              beasiswa yang mensyaratkan SKTM.
            </p>
          </div>

          <!-- STEP 5 -->
          <div v-else-if="current === 5" key="step-5" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <OptionCard
              v-for="level in levels"
              :key="level"
              :title="level"
              icon="arrow-up"
              :selected="form.target === level"
              @select="profile.setAnswer('target', level)"
            />
          </div>

          <!-- STEP 6 -->
          <div v-else-if="current === 6" key="step-6" class="grid gap-2.5 sm:grid-cols-2">
            <OptionCard
              title="Dalam Negeri"
              description="Kampus dan program di Indonesia."
              icon="home"
              :selected="form.location === 'Dalam Negeri'"
              @select="profile.setAnswer('location', 'Dalam Negeri')"
            />
            <OptionCard
              title="Luar Negeri"
              description="Program studi di luar Indonesia."
              icon="globe"
              :selected="form.location === 'Luar Negeri'"
              @select="profile.setAnswer('location', 'Luar Negeri')"
            />
          </div>

          <!-- STEP 7 -->
          <div v-else-if="current === 7" key="step-7" class="grid gap-2.5 sm:grid-cols-2">
            <OptionCard
              v-for="field in fields"
              :key="field.name"
              :title="field.name"
              :description="field.description"
              :icon="field.icon"
              :selected="form.field === field.name"
              @select="profile.setAnswer('field', field.name)"
            />
          </div>

          <!-- STEP 8 -->
          <div v-else key="step-8" class="max-w-sm">
            <label for="phone" class="mb-1.5 block text-[12px] font-medium text-ink">
              Nomor HP aktif
            </label>
            <div class="relative">
              <span
                class="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-1.5 border-r border-line pr-2.5 text-[12px] font-medium text-ink"
              >
                <AppIcon name="phone" :size="14" class="text-muted" /> +62
              </span>
              <input
                id="phone"
                :value="form.phone"
                type="tel"
                inputmode="tel"
                placeholder="812 3456 7890"
                class="field-base pl-[5.4rem] text-[15px] font-medium"
                :class="phoneValid ? '' : 'border-danger'"
                autocomplete="tel"
                @input="profile.setAnswer('phone', $event.target.value)"
              />
            </div>
            <p
              class="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed"
              :class="phoneValid ? 'text-muted' : 'text-danger'"
            >
              <AppIcon :name="phoneValid ? 'shield' : 'alert-triangle'" :size="13" class="mt-px" />
              {{
                phoneValid
                  ? 'Kami hanya memakainya untuk mengirim pengingat deadline beasiswamu.'
                  : 'Masukkan minimal 9 digit angka.'
              }}
            </p>

            <div class="mt-5 rounded-2xl border border-line bg-background p-4">
              <div class="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                <AppIcon name="check-circle" :size="16" class="text-success" />
                Profilmu hampir lengkap
              </div>
              <p class="mt-1 text-[11.5px] leading-relaxed text-body">
                Setelah ini Skular akan menghitung kecocokan beasiswa dari jawabanmu. Kamu bisa
                mengubahnya kapan saja.
              </p>
            </div>
          </div>
        </Transition>

        <div class="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
          <BaseButton
            v-if="current > 1"
            type="button"
            variant="ghost"
            size="sm"
            icon-left="arrow-left"
            @click="goBack"
          >
            Kembali
          </BaseButton>
          <span v-else />

          <BaseButton
            type="submit"
            :disabled="!canContinue"
            :icon-right="current === 8 ? 'sparkles' : 'arrow-right'"
          >
            {{ current === 8 ? 'Lihat rekomendasi beasiswa' : 'Lanjut' }}
          </BaseButton>
        </div>
      </form>
    </section>

    <p class="mt-4 text-center text-[11px] text-muted">
      Jawaban tersimpan otomatis di perangkat ini. Tidak ada data yang dikirim ke server.
    </p>
  </div>
</template>
