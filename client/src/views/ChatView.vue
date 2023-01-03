<template>
  <div>
    Chat
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'ChatView',
  setup () {
    const socket = inject('socket')
    socket.emit('msgToServer', {
      credentials: 'test'
    });
  },
  sockets: {
    msgToClient (response) {
      console.log(response)
    },
  }
}
</script>