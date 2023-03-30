<template>
  <ScrollPanel class="h-full w-full">
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
            <InputText class="font-bold shadow-5" v-model="searchTextRef" style="width: 50vw"/>
            <label for="value">查询 Prompt</label>
            <Button class="ml-2 shadow-5" label="分享" icon="pi pi-plus" @click="handleNew"/>
          </span>
        </div>

        <div style="display: inline-block; margin-top: 50px; width: 60vw">
          <div class="text-left">
            <SelectButton v-model="selectCategoryRef" :options="['全部', '热门', '最新']" aria-labelledby="basic" />
          </div>

          <div class="grid" style="margin-top: 0.8rem">
            <div v-for="prompt in prompts" :key="prompt" class="col-12 md:col-6 lg:col-3 p-1">
              <PromptBrief :prompt="prompt" />
            </div>
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
import { onMounted, ref, watch } from 'vue'
import { authStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { list } from '@/api/prompt'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = authStore()
const toast = useToast()

const searchTextRef = ref(null)
const selectCategoryRef = ref('全部')

const prompts = ref([])

watch(selectCategoryRef, (newValue) => {
  if (!newValue) {
    selectCategoryRef.value = '全部'
  }
  refresh()
})

const handleNew = () => {
  if (store.isAuth()) {
    router.push('/editor')
  } else {
    router.push('/login')
    toast.add({ severity: 'warn', summary: '需要登录', detail: '需要登录后才能使用分享功能', life: 3000 })
  }
}
const refresh = () => {
  list().then(res => {
    prompts.value = res.data
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}

onMounted(() => {
  refresh()
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
