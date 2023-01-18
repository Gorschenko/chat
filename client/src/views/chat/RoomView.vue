<template>
  <section class="room-view">
    <div class="overflow-y-scroll flex-column flex-gap-8">
      <ChatMessageCard
        v-for="message in messages"
        :key="message"
        class="half-parent-size-width"
        :message="message"
      />
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
import ResponserChat from '@/components/chat/ResponserChat'
import ChatMessageCard from '@/components/chat/ChatMessageCard'
import * as constants from '@/components/chat/chat.constants'

export default {
  name: 'RoomView',
  components: {
    ResponserChat,
    ChatMessageCard
  },
  setup() {
    const socket = inject('socket')
    const route = useRoute()
    const store = useStore()
    const user = computed(() => store.getters['user/user'])
    const messages = ref([])

    const init = () => {
      socket.auth.token = localStorage.getItem('token')
      socket.connect()
      socket.emit(constants.emiters.JOIN_TO_ROOM, { roomId: route.params.roomId })
      socket.on(constants.listeners.GET_MESSAGES, message => {
        messages.value.push(message)
        console.log(message)
      })
    }

    const destroy = () => {
      socket.removeAllListeners()
      socket.disconnect()
    }
    onBeforeMount(init)
    onUnmounted(destroy)

    const sendMessage = messageText => {
      const message = {
        userId: user.value._id,
        roomId: route.params.roomId,
        text: messageText,
      }
      socket.emit(constants.emiters.SEND_MESSAGE, { message })
    }

    return {
      messages,
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