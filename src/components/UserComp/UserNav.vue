<template>
  <div class="absolute top-0 right-0 mt-2 mr-6" >
    <Card
        class="cursor-pointer"
        :class="{ 'shadow-none': !hover, 'shadow-1': hover }"
        style="border-radius: 50px; min-width: 140px"
        aria-haspopup="true"
        aria-controls="user_nav_menu"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @click="toggle">
      <template #content>
        <Avatar
            :label="store.info.username?.slice(0, 1) ?? '未'"
            class="mr-2 select-none"
            style="background: #6366F1; color: white; font-family: monospace"
            shape="circle" />
        <label class="mr-2 select-none cursor-pointer">{{ store.info.username ?? '未登录' }}</label>
      </template>
    </Card>

    <TieredMenu
        ref="menuRef"
        id="user_nav_menu"
        class="mt-1 select-none"
        style="width: 120px;"
        :model="store.isAuth() ? menuItems : menuAnon"
        popup/>
  </div>
</template>

<script lang="ts" setup>
import { authStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const store = authStore()
const toast = useToast()

const menuRef = ref()
const hover = ref(false)
const menuItems = ref([{
  label: '欢迎回来~尝试一下有什么新的变化？',
  disabled: true
}, {
  separator: true
}, {
  label: '用户中心',
  icon: 'pi pi-fw pi-user',
  command: () => {
    toast.add({ severity: 'warn', summary: '敬请期待', detail: '还在开发中！', life: 3000 })
  }
}, {
  separator: true
}, {
  label: '退出登录',
  icon: 'pi pi-fw pi-power-off',
  command: () => {
    store.logout().then(res => {
      location.reload()
      toast.add({ severity: 'success', summary: '操作成功', detail: '已退出登陆', life: 3000 })
    }).catch(err => {
      toast.add({ severity: 'error', summary: '发生错误', detail: err.message, life: 3000 })
    })
  }
}])
const menuAnon = ref([{
  label: '登录账号',
  icon: 'pi pi-fw pi-power-off',
  command: () => router.push('/login')
}])

const toggle = (event) => {
  menuRef.value.toggle(event);
}

</script>

<style scoped>
:deep(.p-card .p-card-body) {
  padding: 0.5rem;
}

:deep(.p-card .p-card-content) {
  padding: 0 !important;
  font-family: monospace;
}

</style>

<style lang="scss">
.p-menuitem-content .p-menuitem-link {
  font-size: 13px;
  padding: 0.5rem 1rem;

  .p-menuitem-icon {
    color: #6c757d !important;
  }

  .p-menuitem-text {
    color: #6c757d !important;
    font-weight: bold;
  }
}
</style>
