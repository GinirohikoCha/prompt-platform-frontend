<template>
  <Dialog
      v-model:visible="visible"
      class="chat-dialog"
      style="width: 50vw;"
      :header="`${prompt.emoji} ${prompt.title}`"
      :draggable="false"
      :breakpoints="{ '1600px': '60vw', '1280px': '75vw', '960px': '85vw', '641px': '95vw' }"
      modal>
    <ChatComp ref="chatCompRef" class="select-none w-full" />
  </Dialog>
</template>

<script lang="ts" setup>
import { nextTick, Ref, ref } from 'vue'
import ChatComp from '@/components/ChatComp/ChatComp.vue'

const chatCompRef = ref()

const visible = ref(false)
const prompt: Ref = ref({})

const openDialog = (promptParam: object) => {
  visible.value = true
  nextTick(() => {
    prompt.value = promptParam
    chatCompRef.value.showTitle(false)
    chatCompRef.value.initConversation(prompt.value.sentences
        .filter((sentence: any) => sentence.content)
    )
  })
}

defineExpose({ openDialog })
</script>

<style scoped>
</style>
