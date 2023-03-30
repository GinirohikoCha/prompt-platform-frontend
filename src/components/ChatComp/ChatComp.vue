<template>
  <div class="surface-card p-4 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <Card class="inline-block w-full shadow-3 text-left">
        <template #title>
          <Button style="vertical-align: top; padding: 9px 20px" icon="pi pi-angle-left" label="返回" link
                  @click="handleBack"/>
          <Divider class="inline" style="padding: 0" layout="vertical"/>
          <span style="line-height: 39px">{{ prompt ? `${prompt.emoji} ${prompt.title}` : '聊天' }}</span>
        </template>
        <template #content>
          <div>
            <!--  Prompt 预置  -->
            <Fieldset
                v-for="chat in prompt?.sentences"
                :key="chat"
                class="mt-2 shadow-1">
              <template #legend>
                <Avatar v-if="chat.role === 'system'" icon="pi pi-server" shape="circle" />
                <Avatar v-else-if="chat.role === 'assistant'" image="/openai.svg" shape="circle" />
                <Avatar v-else icon="pi pi-user" shape="circle" />
              </template>
              <p class="m-0">{{ chat.content }}</p>
            </Fieldset>
            <!--  Conversation  -->
            <Fieldset
                v-for="chat in conversation"
                :key="chat"
                class="mt-2 shadow-1 select-auto">
              <template #legend>
                <Avatar v-if="chat.role === 'system'" icon="pi pi-server" shape="circle" />
                <Avatar v-else-if="chat.role === 'assistant'" image="/openai.svg" shape="circle" />
                <Avatar v-else icon="pi pi-user" shape="circle" />
              </template>
              <p class="m-0">{{ chat.content }}</p>
            </Fieldset>
          </div>
          <!--  输入框  -->
          <div class="input-field">
            <span class="p-float-label p-input-icon-right w-full">
              <i v-if="loading" class="pi pi-spin pi-spinner" />
              <Textarea
                  id="inputTextArea"
                  class="shadow-4 w-full"
                  v-model.trim="input"
                  :disabled="loading"
                  rows="1"
                  auto-resize
                  @keydown.enter="handleEnter"/>
              <label>{{ loading ? '请求回复中，长难句处理量大，麻烦耐心等待回复' : '开始聊天' }}</label>
            </span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { nextTick, onMounted, Ref, ref } from 'vue'
import { detail } from '@/api/prompt'
import { useToast } from 'primevue/usetoast'
import { send } from '@/api/chat'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const { promptId } = route.query
const prompt = ref()

const conversation: Ref<any[]> = ref([])
const input = ref('')
const loading = ref(false)

const handleBack = () => router.back()
const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    if (input.value.length === 0) return
    loading.value = true
    // 加入 conversation
    conversation.value.push({ role: 'user', content: input.value })
    // 清空输入
    input.value = ''
    // 发送聊天
    send(promptId, { conversation: conversation.value }).then(res => {
      conversation.value.push(res.data)
    }).catch(err => {
      const { content } = conversation.value.pop()
      input.value = content
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
    }).finally(() => {
      loading.value = false
      nextTick(() => {
        document.getElementById('inputTextArea')?.focus()
      })
    })
  }
}

onMounted(() => {
  detail(promptId).then(res => {
    prompt.value = res.data
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })

  nextTick(() => {
    document.getElementById('inputTextArea')?.focus()
  })
})
</script>

<style scoped>
:deep(.p-fieldset .p-fieldset-legend) {
  padding: 0;
  border: 0;
  background: transparent;
}

:deep(.p-fieldset .p-fieldset-content) {
  padding: 0.25rem 1.25rem;
}

:deep(.p-avatar img) {
  width: 16px;
  height: 16px;
}

:deep(.p-avatar.p-avatar-image) {
  background-color: #6fa395;
}

.input-field {
  margin-top: 50px;
  margin-inline-start: 2px;
  margin-inline-end: 2px;
}
</style>