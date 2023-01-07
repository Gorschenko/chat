<template>
  <li class="flex-column flex-gap-8">
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
      />
    </div>
  </li>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import { useStore } from 'vuex'
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
  setup() {
    const store= useStore()
    const user = computed(() => store.getters['user/user'])

    return {
      user,
    }
  },
}
</script>