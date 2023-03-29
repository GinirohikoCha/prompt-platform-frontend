<template>
  <Card class="text-left shadow-2">
    <template #title>{{ props.prompt.emoji }} {{ props.prompt.title }} </template>
    <template #subtitle> {{ props.prompt.description }} </template>
    <template #content>
      <Rating v-model="value" :cancel="false" readonly />
      <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">创作者：{{ props.prompt.creator || '-' }}</div>
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