import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useGuard } from '@/router/guard'
import HelloWorld from '@/components/HelloWorld.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string,
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      title: 'HelloWorld'
    }
  },
  /* 404 */
  // {
  //     path: '/:catchAll(.*)',
  //     redirect: '/'
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

useGuard(router)

export default router