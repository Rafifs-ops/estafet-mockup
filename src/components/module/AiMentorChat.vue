<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { chatFallback, chatReplies, quickChips } from '@/data/aiResponses'
import AppIcon from '@/components/ui/AppIcon.vue'

const open = ref(true)
const typing = ref(false)
const input = ref('')
const bodyEl = ref(null)
const messages = ref([
  {
    role: 'ai',
    text: 'Hai! Saya **AI Mentor**. Tanyakan apa pun soal modul ini — instruksi, contoh, atau cara memperbaiki jawabanmu.\n\nSaya membantu kamu berpikir, bukan mengisi jawabanmu.',
  },
])

let timer = null

function findReply(question) {
  const text = question.toLowerCase()
  const match = chatReplies.find((item) => item.keywords.some((keyword) => text.includes(keyword)))
  return match ? match.reply : chatFallback
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderMarkdown(value) {
  const text = escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  const lines = text.split('\n')
  let html = ''
  let inList = false

  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="my-1 list-disc space-y-0.5 pl-4">'
        inList = true
      }
      html += `<li>${line.slice(2)}</li>`
      continue
    }
    if (inList) {
      html += '</ul>'
      inList = false
    }
    if (!line) {
      html += '<div class="h-1.5"></div>'
    } else {
      html += `<p>${line}</p>`
    }
  }
  if (inList) html += '</ul>'
  return html
}

async function scrollToBottom() {
  await nextTick()
  if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
}

function send(value) {
  const text = (typeof value === 'string' ? value : input.value).trim()
  if (!text || typing.value) return
  messages.value.push({ role: 'user', text })
  input.value = ''
  typing.value = true
  scrollToBottom()

  timer = setTimeout(() => {
    messages.value.push({ role: 'ai', text: findReply(text) })
    typing.value = false
    scrollToBottom()
  }, 1000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="card-surface overflow-hidden">
    <div class="grad-dark flex items-center gap-2.5 p-3.5 text-white">
      <span class="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-ink">
        <AppIcon name="sparkles" :size="16" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-[12px] font-semibold text-white">AI Mentor</p>
        <p class="flex items-center gap-1.5 text-[9.5px] text-white/70">
          <span class="size-1.5 rounded-full bg-success-light" />
          Siap membantu belajar
        </p>
      </div>
      <button
        type="button"
        class="grid size-7 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
        :aria-label="open ? 'Tutup AI Mentor' : 'Buka AI Mentor'"
        :aria-expanded="open"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'chevron-down' : 'chat'" :size="15" />
      </button>
    </div>

    <div v-show="open">
      <div ref="bodyEl" class="no-scrollbar max-h-[300px] space-y-2.5 overflow-y-auto bg-white p-3.5">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex gap-2"
          :class="message.role === 'user' ? 'justify-end' : ''"
        >
          <span
            v-if="message.role === 'ai'"
            class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-ink"
          >
            <AppIcon name="sparkles" :size="12" />
          </span>
          <div
            class="max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed"
            :class="
              message.role === 'ai'
                ? 'rounded-tl-sm border border-line bg-background text-body'
                : 'rounded-tr-sm bg-navy text-white'
            "
          >
            <div v-if="message.role === 'ai'" v-html="renderMarkdown(message.text)" />
            <template v-else>{{ message.text }}</template>
          </div>
        </div>

        <div v-if="typing" class="flex items-center gap-2">
          <span class="grid size-6 place-items-center rounded-full bg-gold text-ink">
            <AppIcon name="sparkles" :size="12" />
          </span>
          <div class="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-background px-3 py-2.5">
            <span
              v-for="dot in 3"
              :key="dot"
              class="size-1.5 animate-bounce rounded-full bg-muted"
              :style="{ animationDelay: `${(dot - 1) * 120}ms` }"
            />
          </div>
        </div>
      </div>

      <div class="border-t border-line bg-white px-3.5 pt-2.5 pb-3.5">
        <div class="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2">
          <button
            v-for="chip in quickChips"
            :key="chip"
            type="button"
            class="shrink-0 rounded-full border border-line bg-background px-2.5 py-1 text-[9.5px] whitespace-nowrap text-body transition hover:border-gold-deep hover:text-ink"
            @click="send(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <form class="flex items-center gap-1.5" @submit.prevent="send()">
          <input
            v-model="input"
            type="text"
            placeholder="Tulis pertanyaanmu..."
            class="field-base flex-1 py-2 text-[11px]"
            aria-label="Tulis pertanyaan untuk AI Mentor"
          />
          <button
            type="submit"
            class="grad-primary grid size-8 shrink-0 place-items-center rounded-lg text-ink transition disabled:opacity-40"
            :disabled="!input.trim() || typing"
            aria-label="Kirim pertanyaan"
          >
            <AppIcon name="send" :size="14" />
          </button>
        </form>

        <p class="mt-2 flex items-start gap-1 text-[9px] leading-snug text-muted">
          <AppIcon name="info" :size="10" class="mt-px shrink-0" />
          AI Mentor membantu berpikir, bukan mengisi jawabanmu.
        </p>
      </div>
    </div>
  </div>
</template>
