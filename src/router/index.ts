import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useGuard } from '@/router/guard'
import Layout from '@/layout/Layout.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Homepage from '@/pages/Homepage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string,
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/homepage',
    component: Layout,
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        component: () => Homepage,
        meta: {
          title: '首页'
        }
      }
    ]
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