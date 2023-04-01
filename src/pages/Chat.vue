<template>
  <ScrollPanel class="h-full w-full">
    <div class="flex flex-wrap justify-content-center h-full select-none pt-5">
      <div class="surface-card p-4 border-round w-full lg:w-6">
        <ChatComp />
      </div>
    </div>
  </ScrollPanel>
</template>

<script setup lang="ts">
import ChatComp from '@/components/ChatComp/ChatComp.vue'
</script>

<style scoped>

</style>
