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
import { useNotification } from '@kyvg/vue3-notification'

export default {
  name: 'ChatView',
  setup () {
    const socket = inject('socket')
    const router = useRouter()
    const { notify}  = useNotification()

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