<template>
  <router-view />

  <UserCenter ref="userCenterRef"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { authStore } from '@/stores/auth'
import { userCenterStore } from '@/stores/user-center'
import UserCenter from '@/components/UserCenter/UserCenter.vue'

const auth = authStore()
const userCenter = userCenterStore()

const userCenterRef = ref(null)

onMounted(() => {
  // 获取登录用户信息
  auth.getInfo()
      .then(ignored => {})
      .catch(ignored => {})
  // 初始化用户中心
  userCenter.userCenterRef = userCenterRef.value
})
</script>

<style scoped>

</style>
