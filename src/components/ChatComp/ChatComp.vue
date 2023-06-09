<template>
  <div class="text-center">
    <Card class="inline-block w-full shadow-3 text-left">
      <template #title v-if="displayTitle">
        <Button style="vertical-align: top; padding: 9px 20px" icon="pi pi-angle-left" label="返回" link
                @click="handleBack"/>
        <Divider class="inline" style="padding: 0" layout="vertical"/>
        <span style="line-height: 39px">{{ prompt ? `${prompt.emoji} ${prompt.title}` : '与 ChatGPT 聊天' }}</span>
      </template>
      <template #content>
        <div class="select-text">
          <!--  Prompt 预置  -->
          <Fieldset
              v-for="chat in computedPrompt"
              :key="chat"
              class="mt-2 shadow-1"
              toggleable
              :collapsed="true">
            <template #legend>
              <Avatar v-if="chat.role === 'system'" icon="pi pi-server" shape="circle" />
              <Avatar v-else-if="chat.role === 'assistant'" image="/openai.svg" shape="circle" />
              <!--                <Avatar v-else-if="chat.role === 'assistant'" :label="prompt?.emoji" shape="circle" />-->
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
              <!--                <Avatar v-else-if="chat.role === 'assistant'" :label="prompt?.emoji" shape="circle" />-->
              <Avatar v-else icon="pi pi-user" shape="circle" />
            </template>
            <v-md-preview v-if="chat.content" :text="chat.content" />
            <Skeleton v-else height="2rem" class="mb-2"></Skeleton>
          </Fieldset>
        </div>
        <!--  输入框  -->
        <div class="input-field grid grid-nogutter gap-2">
          <span class="p-float-label p-input-icon-right w-full col">
            <i v-if="loading" class="pi pi-spin pi-spinner" />
            <Textarea
                id="inputTextArea"
                class="shadow-2 w-full"
                v-model.trim="input"
                :disabled="loading"
                rows="1"
                auto-resize
                @keydown.enter="handleEnter"/>
            <label>{{ loading ? '请求回复中，请稍后' : '开始聊天' }}</label>
          </span>
          <Button class="shadow-2" style="height: 47px" icon="pi pi-send" label="发送" size="small" :disabled="loading" @click="sendMessage"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, nextTick, onMounted, Ref, ref } from 'vue'
import { detail } from '@/api/prompt'
import { useToast } from 'primevue/usetoast'
import { createStream, sendStream } from '@/api/chat'
import uuid from 'uuid-random'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const { promptId } = route.query
const prompt = ref()

const conversation: Ref<any[]> = ref([])
const input = ref('')
const loading = ref(false)
const displayTitle = ref(true)

const computedPrompt = computed(() => {
  if (prompt.value) {
    return prompt.value?.isOpenSource ? prompt.value?.sentences : [{ role: 'system', content: '[闭源提示词已加载]' }]
  } else {
    return []
  }
})

const handleBack = () => router.push('/')
const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    sendMessage()
  }
}
const initConversation = (conversationParam: any[]) => {
  conversation.value = conversationParam
}
const showTitle = (show: boolean) => displayTitle.value = show

const streamMessage = ref()

const sendMessage = () => {
  if (input.value.length === 0) return
  loading.value = true
  // 加入 conversation
  conversation.value.push({ role: 'user', content: input.value })
  // 清空输入
  input.value = ''

  // 发送聊天
  const id = uuid()
  // Sse 创建流式链接
  const sseClient = createStream(id)
  sseClient.onopen = () => {
    console.debug("建立流式传输连接")
    streamMessage.value = { role: 'assistant', content: '' }
    conversation.value.push(streamMessage.value)
    sendStream(promptId, { sseId: id, conversation: conversation.value }).then(res => {
      // conversation.value.push(res.data)
    }).catch(err => {
      loading.value = false
      // 发送失败的消息返还给input
      input.value = conversation.value.pop().content
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 10000 })
      nextTick(() => {
        document.getElementById('inputTextArea')?.focus()
      })
    })
  }
  sseClient.onmessage = (message) => {
    if (message.data === '[DONE]') {
      loading.value = false
      nextTick(() => {
        document.getElementById('inputTextArea')?.focus()
      })
      console.debug("建立流式传输连接关闭")
      sseClient.close()
    } else if (message.data.startsWith('[ERROR]')) {
      toast.add({ severity: 'error', summary: '发生错误', detail: message.data.substring(7), life: 10000 })
    } else {
      streamMessage.value.content += decodeURIComponent(message.data)
    }
  }
  sseClient.onerror = (error) => {
    loading.value = false
    // 移除AI未回复完的话
    if (conversation.value[conversation.value.length - 1].role === 'assistant') {
      conversation.value.pop()
    }
    // 回复失败的消息返还给input
    input.value = conversation.value.pop()?.content
    nextTick(() => {
      document.getElementById('inputTextArea')?.focus()
    })
    console.error(error)
    sseClient.close()
  }
}

onMounted(() => {
  if (promptId) {
    detail(promptId).then(res => {
      prompt.value = res.data
    }).catch(err => {
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
    })
  }

  nextTick(() => {
    document.getElementById('inputTextArea')?.focus()
  })
})

defineExpose({ initConversation, showTitle })
</script>

<style scoped>
:deep(.p-fieldset .p-fieldset-legend) {
  padding: 0;
  border: 0;
  background: transparent;
}

:deep(.p-fieldset.p-fieldset-toggleable .p-fieldset-legend a) {
  padding: 0;
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

:deep(.vuepress-markdown-body) {
  padding: 0;
  font-size: 14px;
}

.input-field {
  margin-top: 50px;
  margin-inline-start: 2px;
  margin-inline-end: 2px;
}
</style>
