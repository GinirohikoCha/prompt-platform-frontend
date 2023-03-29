import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useGuard } from '@/router/guard'
import Layout from '@/layout/Layout.vue'

import Homepage from '@/pages/Homepage.vue'
import Editor from '@/pages/Editor.vue'
import Login from '@/pages/Login.vue'

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
        path: 'homepage',
        name: 'Homepage',
        component: () => Homepage,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => Editor,
        meta: {
          title: '创作'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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