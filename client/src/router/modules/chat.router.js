import ChatView from '@/views/chat/ChatView'
import RoomView from '@/views/chat/RoomView'

export default [
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/chat/room/:roomId',
    name: 'chat-room',
    component: RoomView,
    meta: {
      layout: 'default',
    },
  }
]