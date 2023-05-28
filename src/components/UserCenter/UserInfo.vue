<template>
  <div>
    <div class="grid">
      <div class="col flex justify-content-center " >
        <Avatar
            :label="info.username?.slice(0, 1) ?? '未'"
            class="select-none mt-3"
            style="background: #6366F1; color: white; font-family: monospace"
            shape="circle"
            size="xlarge"/>
      </div>
      <div class="col">
        <label class="block text-900 font-normal mb-2">用户名</label>
        <label class="block text-700 font-medium mb-2">{{ info.username }}</label>
        <label class="block text-900 font-normal mb-2">手机号</label>
        <label class="block text-700 font-medium mb-2">{{ info.phoneNumber }}</label>
        <Button class="mt-2" label="修改密码" size="small" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { authStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const auth = authStore()

const info = ref({})

onMounted(() => {
  info.value = auth.info
})
</script>

<style scoped>

</style>
