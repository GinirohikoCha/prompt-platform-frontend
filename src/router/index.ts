import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useGuard } from '@/router/guard'
import Layout from '@/layout/Layout.vue'

import Homepage from '@/pages/Homepage.vue'
import Editor from '@/pages/Editor.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Chat from '@/pages/Chat.vue'

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
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => Chat,
        meta: {
          title: '聊天'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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