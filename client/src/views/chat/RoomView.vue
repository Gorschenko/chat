<template>
  <section class="room-view">
    <div class="overflow-y-scroll">

    </div>
    <ResponserChat
      class="margin-center"
      @send-message="sendMessage"
    />
  </section>
</template>
<script>
import {
  ref,
  computed,
  inject,
  onBeforeMount,
  onUnmounted
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
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
    const store = useStore()
    const user = computed(() => store.getters['user/user'])
    const messages = ref({})

    const init = () => {
      socketService.connect()
      socketService.joinToRoom(route.params.roomId)
      socketService.getMessages()
    }

    const destroy = () => {
      socketService.disconnect()
    }
    onBeforeMount(init)
    onUnmounted(destroy)

    const sendMessage = messageText => {
      const newMessage = {
        userId: user.value._id,
        roomId: route.params.roomId,
        text: messageText,
      }
      socketService.sendMessage(newMessage)
    }

    return {
      sendMessage,
    }
  },
}
</script>
<style lang="scss">
.room-view {
  display: grid;
  grid-template-rows: 1fr auto;
}
</style>