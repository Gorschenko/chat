<template>
  <div class="flex-v-centered flex-gap-8">
    <DefaultInput
      id="message"
      v-model="message"
      placeholder="Message..."
    />
    <DefaultButton
      icon="bx-envelope"
      :is-disabled="!message"
      @action="sendMessage"
    />
  </div>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { ref } from 'vue'

export default {
  name: 'ResponserChat',
  components: {
    DefaultInput,
    DefaultButton,
  },
  setup (_, { emit }) {
    const message = ref('')
    const sendMessage = () => {
      emit('send-message', message.value)
      message.value = ''
    }
    return {
      message,
      sendMessage,
    }
  }
}
</script>