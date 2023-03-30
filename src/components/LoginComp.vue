<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img src="../../public/openai.svg" alt="Image" height="50" class="mb-3">
      <div class="text-900 text-2xl font-medium mb-3">欢迎回来</div>
      <span class="text-600 font-medium line-height-3">还没有账号?</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="handleRegister">现在创建!</a>
    </div>

    <div>
      <label for="phoneNumber" class="block text-900 font-medium mb-2">手机号</label>
      <InputMask id="phoneNumber" v-model="form.phoneNumber" type="text" class="w-full mb-3"
                 mask="999-9999-9999"
                 placeholder="000-0000-0000"
                 autoClear/>

      <label for="password" class="block text-900 font-medium mb-2">密码</label>
      <Password id="password" v-model="form.password" class="w-full mb-3"
                :class="{ 'p-invalid': focus && (form.password.length < 8 || form.password.length > 20) }"
                :feedback="false"
                toggleMask
                @input="focus = true">
      </Password>

      <div class="flex align-items-center justify-content-between mb-6">
        <div class="flex align-items-center">
          <Checkbox id="rememberMe" :binary="true" v-model="form.rememberMe" class="mr-2"></Checkbox>
          <label for="rememberMe">记住我</label>
        </div>
        <div>
          <a class="font-medium ml-2 text-blue-500 text-right cursor-pointer">短信登录</a>
          <a class="font-medium ml-2 text-blue-500 text-right cursor-pointer">忘记密码?</a>
        </div>
      </div>

      <Button label="登 录" icon="pi pi-user" class="w-full" @click="handleLogin"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { login } from '@/api/auth'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const form = ref({
  phoneNumber: '',
  password: '',
  rememberMe: false
})
const focus = ref(false)

const computedForm = computed(() => {
  const computed = { ...form.value }
  computed.phoneNumber = computed.phoneNumber.replaceAll('-', '')
  return computed
})

const handleLogin = () => {
  login(computedForm.value).then(res => {
    toast.add({ severity: 'success', summary: '登录成功', detail: '欢迎回来', life: 3000 })
    router.replace('/')
  }).catch(err => {
    toast.add({ severity: 'error', summary: '登录失败', detail: err.message, life: 3000 })
  })
}
const handleRegister = () => router.push('/register')
</script>

<style scoped>
:deep(.p-password .p-inputtext) {
  width: 100%;
}
</style>