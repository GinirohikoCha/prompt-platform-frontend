<template>
  <ScrollPanel style="width: 100%; height: 100%">
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-700 text-center">
        <Card class="inline-block w-6 shadow-3 text-left">
          <template #title>
            <Button style="vertical-align: top; padding: 9px 20px" icon="pi pi-angle-left" label="返回" link
                    @click="handleBack"/>
            <Divider class="inline" style="padding: 0" layout="vertical"/>
            <span style="line-height: 39px">创作 Prompt</span>
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
                      @input="handleExceed(2, form.sentences[0].content, 255)"/>
                  <label for="value">提示词 {{ getCountText(form.sentences[0].content.length, 255) }}</label>
                </span>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-2 text-right">
              <Button icon="pi pi-send" label="发布" size="small" />
              <Button icon="pi pi-caret-right" label="测试" severity="success" size="small"/>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!--  emoji选择窗  -->
    <OverlayPanel ref="emojiSelector">
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
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import EmojiLib from 'emojilib/dist/emoji-en-US.json'

const emojiSelector = ref()

const pInvalid = ref([false, false, false])
const form = ref({
  emoji: '🤖',
  title: '',
  description: '',
  sentences: [{
    role: 'system', content: ''
  }]
})

const handleBack = () => router.back()
const toggle = (event: any) => emojiSelector.value.toggle(event)
const handleClickEmoji = (emoji: string) => {
  form.value.emoji = emoji
  emojiSelector.value.hide()
}
const getCountText = (length: number, max: number) => length > 0 ? `${length} / ${max}` : ''
const handleExceed = (index: number, val: string, max: number) => pInvalid.value[index] = val.length > max
</script>

<style scoped>
:deep(.p-scrollpanel-bar-y) {
  background-color: var(--primary-400) !important;
}
</style>
