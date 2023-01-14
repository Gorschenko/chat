<template>
  <section class="room-view">
    <div class="overflow-y-scroll">

    </div>
    <ResponserChat
      class="margin-center"
    />
  </section>
</template>
<script>
import { inject, onBeforeMount, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SocketService from '@/services/SocketService'
import ResponserChat from '@/components/chat/ResponserChat'

export default {
  name: 'RoomView',
  components: {
    ResponserChat
  },
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
<style lang="scss">
.room-view {
  display: grid;
  grid-template-rows: 1fr auto;
}
</style>