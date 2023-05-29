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

          <div class="mt-5 flex justify-content-center">
            <Button label="修改密码" size="small" @click="handleResetPassword"/>
          </div>
        </div>
      </div>
      <div class="col">
        <label class="block text-900 font-normal mb-2 font-bold">用户名</label>
        <label class="block text-700 font-medium mb-2">{{ info.username }}</label>
        <label class="block text-900 font-normal mb-2 font-bold">手机号</label>
        <label class="block text-700 font-medium mb-2">{{ info.phoneNumber }}</label>
        <label class="block text-900 font-normal mb-2 font-bold">ChatGPT模型</label>
        <label class="block text-700 font-medium mb-2">{{ 'GPT-3.5' }}</label>
        <label class="block text-900 font-normal mb-2 font-bold">
          创作上限
          <i class="pi pi-question-circle helper-icon ml-1" v-tooltip="{ value: promptLimit, escape: true, class: 'helper-tooltip'}"/>
        </label>
        <ProgressBar style="width: 200px" :value="promptPercent">
          <span style="white-space: nowrap">{{ info.promptCount }} / {{ info.promptLimit }}</span>
        </ProgressBar>
      </div>
    </div>

    <ResetPasswordDialog ref="resetPasswordRef"/>
  </div>
</template>

<script lang="ts" setup>
import { authStore } from '@/stores/auth'
import { computed, onMounted, Ref, ref } from 'vue'
import ResetPasswordDialog from '@/components/UserCenter/ResetPasswordDialog.vue'
import promptLimit from '@/components/Helper/prompt-limit'

const auth = authStore()

const resetPasswordRef: Ref = ref(null)

const info: Ref = ref({})

const promptPercent = computed(() => {
  return info.value.promptCount / info.value.promptLimit * 100
})

const handleResetPassword = () => {
  resetPasswordRef.value?.showDialog()
}

const changeProgressBarColor = (newColor) => {
  document.documentElement.style.setProperty('--prompt-limit-progress-color', newColor);
}

onMounted(() => {
  info.value = auth.info
  if (promptPercent.value >= 80) {
    changeProgressBarColor('#F87171')
  } else if (promptPercent.value >= 50) {
    changeProgressBarColor('#FBBF24')
  } else {
    changeProgressBarColor('#34D399')
  }
})
</script>

<style scoped lang="scss">
:deep(.p-progressbar .p-progressbar-value) {
  background: var(--prompt-limit-progress-color);
}

.change-avatar-button {
  display: block;
  padding: 0;
  width: 100%;
  text-align: center;
}
</style>
