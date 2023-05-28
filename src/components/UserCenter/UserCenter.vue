<template>
  <Dialog
      v-model:visible="visible"
      class="user-center-dialog"
      style="width: 50vw;"
      :header="'用户中心'"
      :draggable="false"
      :breakpoints="{ '1600px': '60vw', '1280px': '75vw', '960px': '90vw', '641px': '100vw' }"
      modal>
    <el-tabs class="tabs-container" tab-position="left" style="height: 200px" >
      <el-tab-pane label="个人信息">
        <UserInfo/>
      </el-tab-pane>
      <el-tab-pane label="我的创作">Config</el-tab-pane>
      <el-tab-pane label="我的点赞">Role</el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserInfo from '@/components/UserCenter/UserInfo.vue'

const visible = ref(false)

const show = () => {
  visible.value = true
}

defineExpose({
  show
})
</script>

<style scoped lang="scss">
.tabs-container {
  width: 100%;

  :deep(.el-tabs__content)  {
    padding: 20px 32px;
  }
}
</style>
