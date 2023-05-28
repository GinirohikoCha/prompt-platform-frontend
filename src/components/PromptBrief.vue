<template>
  <Card class="text-left shadow-2 select-none">
    <template #title>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
           v-tooltip.bottom="vPrompt?.title">
        {{ vPrompt?.emoji }} {{ vPrompt?.title }}
      </div>
    </template>
    <template #subtitle>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
           v-tooltip.bottom="vPrompt?.description">
        {{ vPrompt?.description }}
      </div>
    </template>
    <template #content>
      <div class="line-height-2">
        <i class="pi pi-thumbs-up cursor-pointer" @click="handleLike" :style="{ color: vPrompt?.liked ? 'red' : '' }" />
        <span class="ml-1">{{ vPrompt?.likes }}</span>
      </div>
      <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">分享者：{{ vPrompt?.isOfficial ? '-' : vPrompt?.creator || '-' }}</div>
      <div class="flex flex-wrap gap-1" style="margin-top: 0.5rem">
        <Tag v-if="vPrompt?.isOfficial" value="官方" />
        <Tag v-else severity="warning" value="社区" />

        <Tag v-if="vPrompt?.isOpenSource" severity="success" value="开源" />
        <Tag v-else severity="danger" value="闭源" />
      </div>
    </template>
    <template #footer>
      <span :class="{ 'p-buttonset': store.info.username === vPrompt?.creator }">
        <Button icon="pi pi-reply" label="试一试" size="small" @click="handleTry"/>
        <Button v-if="store.info.username === vPrompt?.creator" label="编辑" severity="secondary" size="small" @click="handleEdit"/>
      </span>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { detail, like } from '@/api/prompt'
import { computed } from 'vue'

const router = useRouter()
const store = authStore()
const toast = useToast()

const props = defineProps({
  prompt: Object
})
const emit = defineEmits({
  'refresh': null
})

const vPrompt = computed({
  get: () => props.prompt,
  set: (newValue) => emit('refresh', newValue)
})

const handleTry = () => router.push({ path: '/chat', query: { promptId: vPrompt.value?.id } })
const handleEdit = () => {
  store.getInfo().then(res => {
    if (store.isAuth()) {
      router.push({ path: '/editor', query: { editId: vPrompt.value?.id } })
    } else {
      toast.add({ severity: 'error', summary: '发生错误', detail: '身份验证失败，请重试', life: 3000 })
    }
  }).catch(ignored => {})
}
const handleLike = () => {
  if (store.isAuth()) {
    like(vPrompt.value?.id, !vPrompt.value?.liked).then((res: any) => {
      toast.add({ severity: 'success', summary: '操作成功', detail: res.message, life: 3000 })
      refresh()
    }).catch(err => {
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
    })
  } else {
    router.push('/login')
    toast.add({ severity: 'warn', summary: '需要登录', detail: '需要登录后才能点赞哦', life: 3000 })
  }
}
const refresh = () => {
  detail(props.prompt?.id).then(res => {
    vPrompt.value = res.data
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}
</script>

<style scoped>

</style>
