<template>
  <div>
    <div v-if="loading" class="grid">
      <div v-for="ignored in 6" class="col-12 md:col-6 lg:col-6 xl:col-4 p-1">
        <Skeleton height="262px"/>
      </div>
    </div>
    <div class="grid">
      <div v-for="(prompt, index) in prompts" :key="prompt" class="col-12 md:col-6 lg:col-6 xl:col-4 p-1">
        <PromptBrief :prompt="prompt" @refresh="(newPrompt) => handleRefreshBrief(index, newPrompt)" @unlike="refresh"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import PromptBrief from '@/components/PromptBrief.vue'
import { useToast } from 'primevue/usetoast'
import { listLikePrompts } from '@/api/user'

const toast = useToast()

const loading = ref(true)

const prompts: Ref<any[]> = ref([])

const handleRefreshBrief = (index: number, prompt: object) => {
  prompts.value[index] = prompt
}

const refresh = () => {
  loading.value = true
  listLikePrompts().then(res => {
    prompts.value = res.data
    loading.value = false
  }).catch(err => {
    toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
  })
}

onMounted(() => {
  refresh()
})

defineExpose({
  refresh
})
</script>

<style scoped>

</style>
