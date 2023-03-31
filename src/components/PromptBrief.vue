<template>
  <Card class="text-left shadow-2 select-none">
    <template #title>{{ props.prompt?.emoji }} {{ props.prompt?.title }} </template>
    <template #subtitle>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
           v-tooltip.bottom="props.prompt?.description">
        {{ props.prompt?.description }}
      </div>
    </template>
    <template #content>
      <div class="line-height-2">
        <i class="pi pi-thumbs-up"/>
        <span class="ml-1">{{ props.prompt?.likes }}</span>
      </div>
      <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">分享者：{{ props.prompt?.isOfficial ? '-' : props.prompt?.creator || '-' }}</div>
      <div class="flex flex-wrap gap-1" style="margin-top: 0.5rem">
        <Tag v-if="props.prompt?.isOfficial" value="官方" />
        <Tag v-else severity="warning" value="社区" />

        <Tag v-if="props.prompt?.isOpenSource" severity="success" value="开源" />
        <Tag v-else severity="danger" value="闭源" />
      </div>
    </template>
    <template #footer>
      <Button icon="pi pi-pencil" label="试一试" size="small" @click="handleTry"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  prompt: Object
})

const handleTry = () => router.push({ path: '/chat', query: { promptId: props.prompt?.id } })
</script>

<style scoped>

</style>
