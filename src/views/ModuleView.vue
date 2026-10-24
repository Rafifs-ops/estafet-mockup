<script setup>
import { computed, onMounted, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ModuleHero from '@/components/module/ModuleHero.vue'
import ModuleStepper from '@/components/module/ModuleStepper.vue'
import StepPembukaan from '@/components/module/StepPembukaan.vue'
import StepPahami from '@/components/module/StepPahami.vue'
import StepQuickQuestion from '@/components/module/StepQuickQuestion.vue'
import StepPraktik from '@/components/module/StepPraktik.vue'
import StepCheckpoint from '@/components/module/StepCheckpoint.vue'
import { useLearningStore, MODULE_STEPS, MODULE_STEP_KEYS } from '@/stores/learning'
import { useScholarshipStore } from '@/stores/scholarship'
import {
  getModuleMeta,
  getPhaseOfModule,
  moduleTitle,
} from '@/data/curriculum'
import { getModuleContent } from '@/data/modules'

const route = useRoute()
const router = useRouter()
const learning = useLearningStore()
const scholarship = useScholarshipStore()

const id = computed(() => Number(route.params.id))
const meta = computed(() => getModuleMeta(id.value))
const phase = computed(() => getPhaseOfModule(id.value))
const scholarshipName = computed(() => scholarship.primary?.name || 'Beasiswa Pilihanmu')
const title = computed(() => (meta.value ? moduleTitle(meta.value, scholarshipName.value) : ''))
const content = computed(() =>
  meta.value ? getModuleContent(id.value, scholarshipName.value) : null,
)
const moduleState = computed(() => learning.stateFor(id.value))
const progress = computed(() => learning.progressFor(id.value))
const maxStep = computed(() => moduleState.value.maxStep)

const activeKey = computed(() => {
  const query = String(route.query.step || 'pembukaan')
  return MODULE_STEP_KEYS.includes(query) ? query : 'pembukaan'
})
const stepIndex = computed(() => MODULE_STEP_KEYS.indexOf(activeKey.value) + 1)

const nextMeta = computed(() => {
  const nextId = learning.nextModuleIdFor(id.value)
  return nextId ? getModuleMeta(nextId) : null
})
const nextTitle = computed(() =>
  nextMeta.value ? moduleTitle(nextMeta.value, scholarshipName.value) : '',
)

onMounted(() => {
  if (!meta.value) {
    router.replace('/dashboard')
    return
  }
  if (!learning.isUnlocked(id.value)) {
    router.replace(`/modul/${learning.activeModuleId}`)
  }
})

watch(
  [id, activeKey],
  () => {
    if (!meta.value) return
    learning.startModule(id.value)
    learning.openStep(id.value, stepIndex.value)
  },
  { immediate: true },
)

watchEffect(() => {
  if (title.value) document.title = `${title.value} · Skular`
})

function pushStep(number) {
  if (number < 1 || number > MODULE_STEPS.length) return
  const key = MODULE_STEP_KEYS[number - 1]
  if (key === activeKey.value) return
  router.push({ query: { ...route.query, step: key } })
}

/** Navigasi lewat stepper: hanya langkah yang sudah terbuka. */
function goStep(number) {
  if (number > maxStep.value) return
  pushStep(number)
}

/** Tombol lanjut: buka langkah berikutnya lalu pindah. */
function advance(number) {
  if (number < 1 || number > MODULE_STEPS.length) return
  learning.openStep(id.value, number)
  pushStep(number)
}

function goNextModule() {
  const nextId = learning.nextModuleIdFor(id.value)
  if (nextId) {
    learning.startModule(nextId)
    router.push(`/modul/${nextId}`)
    return
  }
  router.push('/dashboard')
}
</script>

<template>
  <div v-if="meta && content" class="mx-auto max-w-5xl space-y-3">
    <ModuleHero
      :title="title"
      :module="meta"
      :phase="phase"
      :progress="progress"
      :current-step="stepIndex"
      :total-steps="MODULE_STEPS.length"
    />

    <ModuleStepper
      :steps="MODULE_STEPS"
      :active-index="stepIndex"
      :max-step="maxStep"
      @select="goStep"
    />

    <Transition name="page" mode="out-in">
      <StepPembukaan
        v-if="activeKey === 'pembukaan'"
        key="pembukaan"
        :content="content.opening"
        @start="advance(2)"
        @back="router.push('/dashboard')"
      />

      <StepPahami
        v-else-if="activeKey === 'pahami'"
        key="pahami"
        :content="content.understand"
        @back="goStep(1)"
        @next="advance(3)"
      />

      <StepQuickQuestion
        v-else-if="activeKey === 'quick'"
        key="quick"
        :content="content.quick"
        @back="goStep(2)"
        @next="advance(4)"
      />

      <StepPraktik
        v-else-if="activeKey === 'praktik'"
        key="praktik"
        :module-id="meta.id"
        :practice="content.practice"
        :state="moduleState"
        @back="goStep(3)"
        @next="advance(5)"
      />

      <StepCheckpoint
        v-else
        key="checkpoint"
        :module-id="meta.id"
        :module-title="title"
        :state="moduleState"
        :next-module-id="nextMeta ? nextMeta.id : null"
        :next-module-title="nextTitle"
        @back="goStep(4)"
        @next="goNextModule"
      />
    </Transition>
  </div>
</template>
