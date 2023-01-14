<template>
  <li
    class="flex-column flex-gap-8"
    @click.native="goToRoom"
  >
    <div class="flex-between flex-gap-8">
      <h1 class="text_s text_weight_accent">{{ room.name }}</h1>
      <DefaultButton
        v-if="room.ownerId === user._id"
        icon="bx-x"
        color="danger"  
        form="round"
        size="xs"
        :without-paddings="true"
        @action="$emit('delete-room', room)"
      />
    </div>
    <p
      v-if="room.description"
      class="text_s text_weight_accent color_neutral"
    >
      {{ room.description }}
    </p>
    <div class="flex flex-gap-8 flex-justify-content-end">
      <DefaultButton
        title="Войти"
        color="primary"  
        size="xs"
        @action="goToRoom"
      />
    </div>
  </li>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'RoomCardChat',
  components: {
    DefaultButton,
  },
  emits: ['delete-room'],
  props: {
    room: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store= useStore()
    const router = useRouter()
    const user = computed(() => store.getters['user/user'])

    const goToRoom = () => {
      router.push({
        name: 'chat-room',
        params: {
          roomId: props.room._id,
        }
      })
    }
    return {
      user,
      goToRoom,
    }
  },
}
</script>