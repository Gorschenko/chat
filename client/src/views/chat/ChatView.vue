<template>
  <div>
    <router-view class="parent-size" />
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
    socket.on('msgToClient', payload => {
      console.log(payload)
    })
  },
}
</script>