<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img src="../../public/openai.svg" alt="Image" height="50" class="mb-3">
      <div class="text-900 text-2xl font-medium mb-3">成为新的朋友</div>
      <span class="text-600 font-medium line-height-3">已经注册过了?</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="handleLogin">现在登录!</a>
    </div>

    <div>
      <label for="username" class="block text-900 font-medium mb-2">用户名</label>
      <InputText id="username" v-model="form.username" type="text" class="w-full mb-3"/>

      <label for="phoneNumber" class="block text-900 font-medium mb-2">手机号</label>
      <InputMask id="phoneNumber" v-model="form.phoneNumber" type="text" class="w-full mb-3"
                 mask="999-9999-9999"
                 placeholder="000-0000-0000"
                 autoClear/>

      <label for="code" class="block text-900 font-medium mb-2">验证码</label>
      <div class="w-full mb-3 grid grid-nogutter">
        <InputMask id="code"
                   class="col pl-3 mr-2"
                   v-model="form.code" type="text"
                   mask="999999"
                   placeholder="000000"
                   autoClear/>
        <Button :label="countDown > 0 ? `等待 ${countDown} 秒` : '发送验证码'" :disabled="countDown > 0" @click="handleRequestCode"/>
      </div>

      <label for="password" class="block text-900 font-medium mb-2">密码</label>
      <Password id="password" v-model="form.password" class="w-full mb-3"
                :class="{ 'p-invalid': focus && (form.password.length < 8 || form.password.length > 20) }"
                promptLabel="输入密码" weakLabel="弱密码" mediumLabel="中密码" strongLabel="强密码"
                toggleMask
                @input="focus = true">
        <template #header>
          <h6>密码长度 {{ form.password.length }} / 20</h6>
        </template>
        <template #footer>
          <Divider />
          <p class="mt-2">推荐密码强度</p>
          <ul class="pl-2 ml-2 mt-0" style="line-height: 1">
            <li>至少一个小写字母</li>
            <li>至少一个大写字母</li>
            <li>至少一个数字符号</li>
            <li>密码长度在 8 ~ 20 之间</li>
          </ul>
        </template>
      </Password>

      <Button label="注 册" icon="pi pi-user" class="w-full" @click="handleRegister"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { register, requestCode } from '@/api/auth'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const form = ref({
  username: '',
  phoneNumber: '',
  password: '',
  code: ''
})
const focus = ref(false)
const countDown = ref(0)

const computedForm = computed(() => {
  const computed = { ...form.value }
  computed.phoneNumber = computed.phoneNumber.replaceAll('-', '')
  return computed
})

const handleLogin = () => router.push('/login')
const handleRegister = () => {
  register(computedForm.value).then(res => {
    toast.add({ severity: 'success', summary: '注册成功', detail: '赶紧试一试吧', life: 3000 })
    router.replace('/')
  }).catch(err => {
    toast.add({ severity: 'error', summary: '注册失败', detail: err.message, life: 3000 })
  })
}
const handleRequestCode = () => {
  if (!computedForm.value.phoneNumber) {
    toast.add({ severity: 'error', summary: '发送失败', detail: '未填写手机号', life: 3000 })
    return
  }

  requestCode(computedForm.value.phoneNumber).then((res: any) => {
    countDown.value = 60
    setInterval(() => countDown.value--, 1000)
    toast.add({ severity: 'error', summary: '操作成功', detail: res.message, life: 3000 })
  }).catch(err => {
    toast.add({ severity: 'error', summary: '请求失败', detail: err.message, life: 3000 })
  })
}
</script>

<style scoped>
:deep(.p-password .p-inputtext) {
  width: 100%;
}
</style>