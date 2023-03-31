<template>
  <div class="flex flex-wrap justify-content-center h-full align-items-center select-none">
    <RegisterComp style="max-width: 500px; height: fit-content"/>
  </div>
</template>

<script setup lang="ts">
import RegisterComp from '@/components/RegisterComp.vue'
import { onMounted } from 'vue'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = authStore()

onMounted(() => {
  if (store.isAuth()) {
    router.push('/')
  }
})
</script>

<style scoped>

</style>
