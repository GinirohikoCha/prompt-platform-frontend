<template>
  <Dialog
      v-model:visible="visible"
      class="user-center-dialog"
      style="width: 500px"
      :header="'用户中心'"
      :draggable="false"
      modal>
    <div>
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

      <label for="password" class="block text-900 font-medium mb-2">新密码</label>
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

      <Button label="提交" icon="pi pi-check" class="w-full" @click="handleSubmit"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { requestCode, resetPassword } from '@/api/auth'
import { authStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'

const auth = authStore()
const toast = useToast()

const visible = ref(false)
const focus = ref(false)
const countDown = ref(0)

const form = ref({
  code: '',
  password: ''
})

const showDialog = () => {
  visible.value = true
}

const handleRequestCode = () => {
  requestCode(auth.info?.phoneNumber).then((res: any) => {
    countDown.value = 60
    setInterval(() => countDown.value--, 1000)
    toast.add({ severity: 'success', summary: '操作成功', detail: res.message, life: 3000 })
  }).catch(err => {
    toast.add({ severity: 'error', summary: '请求失败', detail: err.message, life: 3000 })
  })
}

const handleSubmit = () => {
  resetPassword(form.value.password, form.value.code).then((res: any) => {
    toast.add({ severity: 'success', summary: '操作成功', detail: res.message, life: 3000 })
    form.value = { code: '', password: '' }
    visible.value = false
  }).catch(err => {
    toast.add({ severity: 'error', summary: '请求失败', detail: err.message, life: 3000 })
  })
}

defineExpose({
  showDialog
})
</script>

<style scoped>
:deep(.p-password .p-inputtext) {
  width: 100%;
}
</style>
