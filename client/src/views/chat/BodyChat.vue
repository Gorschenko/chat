<template>
  <div class="body-chat">
    <ul class="body-chat__list">
      <MessageChat
        v-for="message in 5"
        class="half-parent-size-width"
      />
    </ul>
    <div class="flex-full-centered flex-gap-8 mb-16">
      <DefaultInput
        id="name"
        placeholder="Name"
      />
      <DefaultButton
        type="submit"
        icon="bx-envelope"
        size="s"
      />
    </div>
  </div>
</template>
<script>
import MessageChat from '@/components/chat/MessageChat'
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { inject } from 'vue'

export default {
  name: 'BodyChat',
  components: {
    MessageChat,
    DefaultInput,
    DefaultButton,
  },
  setup () {
    const socket = inject('socket')
  }
}
</script>
<style lang="scss">
.body-chat {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 16px;

  &__list {
    overflow-y: scroll;
    @include flex-column;
    gap: 16px;
    padding: 0 16px;
  }
}
</style>