<template>
  <section>
    Room
  </section>
</template>
<script>
import { inject, onBeforeMount, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SocketService from '@/services/SocketService'
export default {
  name: 'RoomView',
  setup() {
    const socket = inject('socket')
    const socketService = new SocketService(socket)
    const route = useRoute()

    const init = () => {
      socketService.connect()
      socketService.joinToRoom(route.params.roomId)
    }

    const destroy = () => {
      socketService.disconnect()
    }
  
    onBeforeMount(init)
    onUnmounted(destroy)
  },
}
</script>