<template>
  <section class="chat-view">
    <ul
      class="chat-view__list"
      v-if="rooms.length"
    >
      <RoomCardChat
        v-for="room in 5"
        :key="room"
        class="card p-16 br-secondary"
      />
      <li class="card p-16 br-secondary flex-column-full-centered">
        <DefaultButton
          icon="bx-plus"
          title="Создать новую"
          color="transparent"  
          size="xs"
        />
      </li>
    </ul>
    <div
      v-else
      class="parent-size flex-column-full-centered flex-gap-8"
    >
      <i class="bx bx-message-dots color_primary icon_60" />
      <p class="text_s text_weight_accent">
        Здесь будут комнаты
      </p>
      <DefaultButton
        icon="bx-plus"
        title="Создать новую"
        color="transparent"  
        size="xs"
        :without-paddings="true"
      />
    </div>
  </section>
</template>
<script>
import RoomCardChat from '@/components/chat/RoomCardChat'
import DefaultButton from '@/components/base/DefaultButton'

export default {
  name: 'ChatView',
  components: {
    RoomCardChat,
    DefaultButton,
  },
  setup () {
    const rooms = []

    return {
      rooms,
    }
  },
}
</script>
<style lang="scss">
@import '@/components/chat/chat';
</style>