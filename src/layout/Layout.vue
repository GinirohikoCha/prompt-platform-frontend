<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { authStore } from '@/stores/auth'

const store = authStore()

onMounted(() => {
  store.getInfo()
      .then(ignored => {})
      .catch(ignored => {})
})
</script>

<style scoped>

</style>
