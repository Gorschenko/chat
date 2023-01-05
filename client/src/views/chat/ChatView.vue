<template>
  <div>
    <router-view
      class="parent-size"
      @sign-in="signIn"
    />
  </div>
</template>
<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ChatView',
  setup () {
    const socket = inject('socket')
    const router = useRouter()

    const signIn = formData => {
      socket.emit('joinToChat', { ...formData })
      router.push({ name: 'body-chat' })
    }
    return {
      signIn,
    }
  },
}
</script>