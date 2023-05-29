<template>
  <ScrollPanel class="h-full w-full">
    <UserNav/>

    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 select-none">
      <div class="text-700 text-center">
        <div class="text-blue-600 font-bold mb-3">
          <SvgIcon style="position:relative; top:2px;" name="openai" color="#326fd1"/>
          POWERED BY CHAT-GPT
        </div>
        <div class="text-900 font-bold text-5xl mb-3">Prompt 提示词分享平台</div>
        <div class="text-700 text-2xl mb-5">
          点燃创意，分享灵感
        </div>

        <div style="margin-top: 20px">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-search"/>
            <InputText class="font-bold shadow-5" v-model="searchTextRef" style="width: 50vw" @keydown.enter="handleEnter"/>
            <label for="value">查询 Prompt</label>
          </span>
          <span class="p-buttonset block md:inline mt-3 md:mt-0 md:ml-2 ">
              <Button v-tooltip.bottom="{ value: startPureChat, escape: true, class: 'helper-tooltip'}" label="聊天" icon="pi pi-comment" @click="handleChat"/>
              <Button v-tooltip.bottom="{ value: startCreatePrompt, escape: true, class: 'helper-tooltip'}"  label="创作" icon="pi pi-plus" @click="handleNew"/>
            </span>
        </div>

        <div style="display: inline-block; margin-top: 50px; width: 60vw">
          <div class="text-center md:text-left">
            <SelectButton v-model="selectCategoryRef" :options="types" aria-labelledby="basic" />
          </div>

          <div class="grid" style="margin-top: 0.8rem">
            <div v-for="(prompt, index) in prompts" :key="prompt" class="col-12 md:col-6 lg:col-4 xl:col-3 p-1">
              <PromptBrief :prompt="prompt" @refresh="(newPrompt) => handleRefreshBrief(index, newPrompt)"/>
            </div>
            <div v-if="loading" v-for="ignored in 10" class="col-12 md:col-6 lg:col-4 xl:col-3 p-1">
              <Skeleton height="262px"/>
            </div>
          </div>

          <div v-if="loadDisabled" class="grid align-content-center block mt-4">
            没有更多了・゜・(PД`q｡)・゜・
          </div>
        </div>
      </div>
    </div>
    <ScrollTop target="parent" :threshold="100"/>
  </ScrollPanel>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import PromptBrief from '@/components/PromptBrief.vue'
import { onMounted, Ref, ref, watch } from 'vue'
import { authStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { list } from '@/api/prompt'
import { useRouter } from 'vue-router'
import UserNav from '@/components/UserComp/UserNav.vue'
import startPureChat from '@/components/Helper/start-pure-chat'
import startCreatePrompt from '@/components/Helper/start-create-prompt'

const types = ['全部', '热门', '最新'];

const router = useRouter()
const store = authStore()
const toast = useToast()

const searchTextRef = ref()
const selectCategoryRef = ref('全部')
const loading = ref(true)
const page = ref(0)
const loadDisabled = ref(false)

const prompts: Ref<any[]> = ref([])

watch(selectCategoryRef, (newValue) => {
  if (!newValue) {
    selectCategoryRef.value = '全部'
  }
  refresh()
})

const handleChat = () => router.push('/chat')
const handleNew = () => {
  if (store.isAuth()) {
    router.push('/editor')
  } else {
    router.push('/login')
    toast.add({ severity: 'warn', summary: '需要登录', detail: '需要登录后才能使用分享功能', life: 3000 })
  }
}
const handleEnter = () => {
  if (!loading.value) {
    refresh()
  }
}
const handleRefreshBrief = (index: number, prompt: object) => {
  prompts.value[index] = prompt
}

const refresh = () => {
  page.value = 0
  loadDisabled.value = false
  loading.value = true
  list(types.indexOf(selectCategoryRef.value), searchTextRef.value, page.value).then(res => {
    prompts.value = res.data
    loading.value = false
    if (prompts.value.length == 0) {
      toast.add({ severity: 'info', summary: '查询结果', detail: '未查询到与关键词相关的 Prompt', life: 3000 })
    } else {
      page.value++
    }
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}

const loadMore = () => {
  list(types.indexOf(selectCategoryRef.value), searchTextRef.value, page.value).then(res => {
    prompts.value = prompts.value.concat(res.data)
    loading.value = false
    if (res.data.length === 0) {
      loadDisabled.value = true
    } else {
      page.value++
    }
  }).catch(err => {
    loadDisabled.value = true
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}

onMounted(() => {
  refresh()
  // 监听滚动到底事件
  const scrollPanel = document.querySelector('.p-scrollpanel-content')
  scrollPanel?.addEventListener('scroll', () => {
    if (scrollPanel.scrollTop + scrollPanel.clientHeight >= scrollPanel.scrollHeight - 10) {
      if (!loading.value && !loadDisabled.value) {
        loading.value = true
        loadMore()
      }
    }
  })
})
</script>

<style scoped>
:deep(.p-rating .p-rating-item .p-rating-icon) {
  font-size: 1rem;
}

:deep(.p-card .p-card-content) {
  padding: 0.5rem 0;
}

:deep(.p-card .p-card-footer) {
  padding: 1rem 0 0 0;
}
</style>
