import { createRouter, createWebHistory } from 'vue-router'
import chat from '@/router/modules/chat.modules'

const routes = [
  ...chat,
  {
    path: '/',
    name: 'main',
    redirect: { name: 'chat' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
