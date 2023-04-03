import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useGuard } from '@/router/guard'
import Layout from '@/layout/Layout.vue'

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
        component: () => import('@/pages/Homepage.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('@/pages/Editor.vue'),
        meta: {
          title: '创作'
        }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/pages/Chat.vue'),
        meta: {
          title: '聊天'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue')
  },
  /* 404 */
  {
      path: '/:catchAll(.*)',
      redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

useGuard(router)

export default router
