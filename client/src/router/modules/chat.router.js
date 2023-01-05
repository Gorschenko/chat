import ChatView from '@/views/chat/ChatView'
import AuthChat from '@/views/chat/AuthChat'
import BodyChat from '@/views/chat/BodyChat'

export default [
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    redirect: { name: 'auth-chat' },
    children: [
      {
        path: '/auth-chat',
        name: 'auth-chat',
        component: AuthChat,
      },
      {
        path: '/body-chat',
        name: 'body-chat',
        component: BodyChat,
      }
    ],
  }
]