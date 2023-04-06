<template>
  <ScrollPanel style="width: 100%; height: 100%">
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 select-none">
      <div class="text-700 text-center">
        <Card class="inline-block w-6 shadow-3 text-left">
          <template #title>
            <Button style="vertical-align: top; padding: 9px 20px" icon="pi pi-angle-left" label="返回" link
                    @click="handleBack"/>
            <Divider class="inline" style="padding: 0" layout="vertical"/>
            <span style="line-height: 39px">{{ editId ? `编辑 《${form.emoji} ${form.title}》` : '创作 Prompt' }}</span>
          </template>
          <template #content>
            <!--  表单  -->
            <div class="text-center">
              <!--  选择 Emoji  -->
              <Button v-tooltip.bottom="'选择适合的Emoji'" class="text-2xl" id="emoji" :label="form.emoji" text raised @click="toggle"/>
              <!--  输入标题  -->
              <div class="w-full" style="margin-top: 2rem">
                <span class="w-full p-input-icon-left p-float-label">
                  <i class="pi pi-flag"/>
                  <InputText
                      v-model.trim="form.title"
                      class="w-full font-bold"
                      :class="{ 'p-invalid': pInvalid[0] }"
                      @input="handleExceed(0, form.title, 45)"/>
                  <label for="value">标题 {{ getCountText(form.title.length, 45) }}</label>
                </span>
              </div>
              <!--  输入描述  -->
              <div class="w-full" style="margin-top: 2rem">
                <span class="w-full p-input-icon-left p-float-label">
                  <i class="pi pi-list"/>
                  <InputText
                      v-model.trim="form.description"
                      class="w-full"
                      :class="{ 'p-invalid': pInvalid[1] }"
                      @input="handleExceed(1, form.description, 125)"/>
                  <label for="value">简介 {{ getCountText(form.description.length, 125) }}</label>
                </span>
              </div>
              <!--  输入内容  -->
              <div class="w-full" style="margin-top: 2rem">
                <span class="w-full p-input-icon-left p-float-label">
                  <i class="pi pi-comment"/>
                  <Textarea
                      v-model.trim="form.sentences[0].content"
                      class="w-full"
                      :class="{ 'p-invalid': pInvalid[2] }"
                      autoResize
                      :rows="3"
                      @input="handleExceed(2, form.sentences[0].content, 1024)"/>
                  <label for="value">提示词 {{ getCountText(form.sentences[0].content.length, 1024) }}</label>
                </span>
              </div>
              <div class="w-full text-left" style="margin-top: 2rem">
                <Checkbox v-model="form.isOpenSource" inputId="isOpenSource" :binary="true" />
                <label for="isOpenSource" class="ml-2">
                  是否开源
                  <i class="pi pi-question-circle helper-icon ml-1" v-tooltip="{ value: openSource, escape: true, class: 'helper-tooltip'}"/>
                </label>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-2 text-right">
              <Button icon="pi pi-send" label="发布" size="small" @click="handleSubmit"/>
              <Button icon="pi pi-caret-right" label="测试" severity="success" size="small" @click="handleTest"/>
              <Button v-if="editId" icon="pi pi-trash" label="删除" severity="danger" size="small" @click="handleRemove"/>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!--  emoji选择窗  -->
    <OverlayPanel ref="emojiSelectorRef">
      <ScrollPanel class="custombar1" style="width: 410px; height: 400px">
        <div class="grid" style="margin-right: 10px">
          <div v-for="emoji in Object.keys(EmojiLib)"
               :key="emoji"
               v-tooltip.bottom="EmojiLib[emoji][0]"
               class="inline-block col-1 select-none cursor-pointer overflow-hidden"
               @click="handleClickEmoji(emoji)">
            {{ emoji }}
          </div>
        </div>
      </ScrollPanel>
    </OverlayPanel>
  </ScrollPanel>

  <ChatDialog ref="chatDialogRef"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EmojiLib from 'emojilib/dist/emoji-en-US.json'
import { detail, remove, save } from '@/api/prompt'
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import ChatDialog from '@/components/ChatComp/ChatDialog.vue'
import { useConfirm } from 'primevue/useconfirm'
import { authStore } from '@/stores/auth'
import openSource from '@/components/Helper/open-source'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const confirm = useConfirm()
const store = authStore()

const { editId } = route.query

const emojiSelectorRef = ref()
const chatDialogRef = ref()

const pInvalid = ref([false, false, false])
const form: any = ref({
  emoji: '🤖',
  title: '',
  description: '',
  isOpenSource: true,
  sentences: [{
    role: 'system', content: ''
  }]
})

const handleBack = () => router.push('/')
const toggle = (event: any) => emojiSelectorRef.value.toggle(event)
const handleClickEmoji = (emoji: string) => {
  form.value.emoji = emoji
  emojiSelectorRef.value.hide()
}
const getCountText = (length: number, max: number) => length > 0 ? `${length} / ${max}` : ''
const handleExceed = (index: number, val: string, max: number) => pInvalid.value[index] = val.length > max
const handleSubmit = () => {
  // 空字符串检测
  if (form.value.title.length === 0) {
    toast.add({ severity: 'error', summary: '发生错误', detail: '标题不能为空', life: 3000 })
    return
  }
  if (form.value.description.length === 0) {
    toast.add({ severity: 'error', summary: '发生错误', detail: '简介不能为空', life: 3000 })
    return
  }
  for (const sentence of form.value.sentences) {
    if (sentence.content.length === 0) {
      toast.add({ severity: 'error', summary: '发生错误', detail: '提示词不能为空', life: 3000 })
      return
    }
  }
  // 长度检测
  if (form.value.title.length > 45) {
    toast.add({ severity: 'error', summary: '发生错误', detail: '标题超出长度', life: 3000 })
    return
  }
  if (form.value.description.length > 125) {
    toast.add({ severity: 'error', summary: '发生错误', detail: '简介超出长度', life: 3000 })
    return
  }
  for (const sentence of form.value.sentences) {
    if (sentence.content.length > 1024) {
      toast.add({ severity: 'error', summary: '发生错误', detail: '提示词超出长度', life: 3000 })
      return
    }
  }

  save(form.value).then((res: any) => {
    toast.add({ severity: 'success', summary: '操作成功', detail: res.message, life: 3000 })
    router.push('/')
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}
const handleTest = () => {
  chatDialogRef.value.openDialog(form.value)
}
const handleRemove = () => {
  if (editId) {
    confirm.require({
      message: '确定删除该 Prompt 吗？删除后将无法恢复',
      header: `删除 《${form.value.emoji} ${form.value.title}》`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        remove(editId).then((res: any) => {
          toast.add({ severity: 'success', summary: '操作成功', detail: res.message, life: 3000 })
          router.push('/')
        }).catch(err => {
          toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
        })
      },
      reject: () => {}
    })
  }
}

onMounted(() => {
  if (editId) {
    detail(editId).then(res => {
      const { id, emoji, title, description, isOpenSource, sentences, creator } = res.data
      if (store.info?.username !== creator) {
        toast.add({ severity: 'error', summary: '编辑错误', detail: '你不是该 Prompt 的创建者', life: 3000 })
        router.push('/')
      }
      form.value = { id, emoji, title, description, isOpenSource,
        sentences: sentences.length > 0 ? sentences : [{ role: 'system', content: '' }]
      }
    }).catch(err => {
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
    })
  }
})
</script>

<style scoped>
:deep(.p-scrollpanel-bar-y) {
  background-color: var(--primary-400) !important;
}
</style>
