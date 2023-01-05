import { createRouter, createWebHistory } from 'vue-router'
import chat from '@/router/modules/chat.router'
import auth from '@/router/modules/auth.router'

const routes = [
  ...auth,
  ...chat,
  {
    path: '/',
    name: 'main',
    redirect: { name: 'sign-in' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
