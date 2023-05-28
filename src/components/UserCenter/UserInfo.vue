<template>
  <div>
    <div class="grid">
      <div class="col flex justify-content-center" >
        <div class="mt-3">
          <div class="flex justify-content-center">
            <Avatar
                :label="info.username?.slice(0, 1) ?? '未'"
                class="select-none"
                style="background: #6366F1; color: white; font-family: monospace"
                shape="circle"
                size="xlarge"/>
          </div>
<!--          <Button class="mt-2 change-avatar-button" style="padding: 0" label="更换头像" size="small" link />-->
          <div class="mt-2 change-avatar-button">{{ info.username }}</div>
        </div>
      </div>
      <div class="col">
        <label class="block text-900 font-normal mb-2 font-bold">用户名</label>
        <label class="block text-700 font-medium mb-2">{{ info.username }}</label>
        <label class="block text-900 font-normal mb-2 font-bold">手机号</label>
        <label class="block text-700 font-medium mb-2">{{ info.phoneNumber }}</label>
        <label class="block text-900 font-normal mb-2 font-bold">ChatGPT模型</label>
        <label class="block text-700 font-medium mb-2">{{ 'GPT-3.5' }}</label>
        <Button class="mt-2" label="修改密码" size="small" @click="handleResetPassword"/>
      </div>
    </div>

    <ResetPasswordDialog ref="resetPasswordRef"/>
  </div>
</template>

<script lang="ts" setup>
import { authStore } from '@/stores/auth'
import { onMounted, Ref, ref } from 'vue'
import ResetPasswordDialog from '@/components/UserCenter/ResetPasswordDialog.vue'

const auth = authStore()

const resetPasswordRef: Ref = ref(null)

const info = ref({})

const handleResetPassword = () => {
  resetPasswordRef.value?.showDialog()
}

onMounted(() => {
  info.value = auth.info
})
</script>

<style scoped>
.change-avatar-button {
  display: block;
  padding: 0;
  width: 100%;
  text-align: center;
}
</style>
