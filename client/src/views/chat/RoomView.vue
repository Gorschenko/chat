<template>
  <section>
    Room
  </section>
</template>
<script>
import { inject, onBeforeMount } from 'vue'
export default {
  name: 'RoomView',
  setup() {
    const socket = inject('socket')
    const init = () => {
      socket.connect()
    }
    
    onBeforeMount(init)
  },
}
</script>