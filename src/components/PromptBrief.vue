<template>
  <Card class="text-left shadow-2 select-none">
    <template #title>{{ props.prompt.emoji }} {{ props.prompt.title }} </template>
    <template #subtitle>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
           v-tooltip.bottom="props.prompt.description">
        {{ props.prompt.description }}
      </div>
    </template>
    <template #content>
      <div class="line-height-2">
        <i class="pi pi-thumbs-up"/>
        <span class="ml-1">{{ props.prompt.likes }}</span>
      </div>
      <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">分享者：{{ props.prompt.creator || '-' }}</div>
      <div class="flex flex-wrap gap-1" style="margin-top: 0.5rem">
        <Tag value="官方" />
        <Tag severity="success" value="开源" />
      </div>
    </template>
    <template #footer>
      <Button icon="pi pi-pencil" label="试一试" size="small"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps({
  prompt: Object
})
</script>

<style scoped>

</style>