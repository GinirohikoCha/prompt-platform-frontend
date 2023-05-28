<template>
  <Dialog
      v-model:visible="visible"
      class="user-center-dialog"
      style="width: 50vw;"
      :header="'用户中心'"
      :draggable="false"
      :breakpoints="{ '1600px': '60vw', '1280px': '75vw', '960px': '90vw', '641px': '100vw' }"
      modal>
    <el-tabs v-model="active" class="tabs-container" tab-position="left" style="min-height: 200px" @tab-change="handleTabChange">
      <el-tab-pane label="个人信息" name="个人信息">
        <UserInfo/>
      </el-tab-pane>
      <el-tab-pane label="我的创作" name="我的创作" lazy>
        <UserPrompts ref="userPromptsRef"/>
      </el-tab-pane>
      <el-tab-pane label="我的点赞" name="我的点赞" lazy>
        <LikePrompts ref="likePromptsRef"/>
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import UserInfo from '@/components/UserCenter/UserInfo.vue'
import UserPrompts from '@/components/UserCenter/UserPrompts.vue'
import LikePrompts from '@/components/UserCenter/LikePrompts.vue'

const userPromptsRef: Ref = ref(null)
const likePromptsRef: Ref = ref(null)

const visible = ref(false)
const active = ref('个人信息')

const open = () => visible.value = true
const close = () => visible.value = false

const handleTabChange = (name: string) => {
  switch (name) {
    case '我的创作':
      userPromptsRef.value?.refresh()
      break
    case '我的点赞':
      likePromptsRef.value?.refresh()
      break
  }
}

defineExpose({
  open,
  close
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
