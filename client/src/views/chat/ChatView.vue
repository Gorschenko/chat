<template>
  <section class="chat-view">
    <ul
      class="chat-view__list"
      v-if="rooms.length"
    >
      <RoomCardChat
        v-for="room in rooms"
        :key="room._id"
        class="card p-16 br-secondary"
        :room="room"
        @delete-room="confirmDeleteRoom"
      />
      <li class="card p-16 br-secondary flex-column-full-centered">
        <DefaultButton
          icon="bx-plus"
          title="Создать новую"
          color="transparent"  
          size="xs"
          @action="setModal('create-room-modal')"
        />
      </li>
    </ul>
    <div
      v-else
      class="parent-size flex-column-full-centered flex-gap-8"
    >
      <i class="bx bx-message-dots color_primary icon_60" />
      <p class="text_s text_weight_accent">
        Комнат нет
      </p>
      <DefaultButton
        icon="bx-plus"
        title="Создать новую"
        color="transparent"  
        size="xs"
        :without-paddings="true"
        @action="setModal('create-room-modal')"
      />
    </div>
    <DefaultModal v-model="modal.show">
      <component
        :is="modal.component"
        @close="modal.show = false"
        @create-room="createRoomHandler"
        @confirm="deleteRoomHanler"
      />
    </DefaultModal>
  </section>
</template>
<script>
import RoomCardChat from '@/components/chat/RoomCardChat'
import DefaultButton from '@/components/base/DefaultButton'
import CreateRoomModal from '@/components/chat/CreateRoomModal'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import DefaultModal from '@/components/base/DefaultModal'
import { ref, reactive, onMounted } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";
import { getRooms } from '@/api/rooms.api'
import { deleteRoomById } from '@/api/rooms.api'

export default {
  name: 'ChatView',
  components: {
    RoomCardChat,
    DefaultButton,
    CreateRoomModal,
    ModalConfirmation,
    DefaultModal
  },
  setup () {
    const { notify}  = useNotification()

    const modal = reactive({
      show: false,
      component: 'create-room-modal',
    })

    const setModal = componentName => {
      modal.component = componentName
      modal.show = true
    }

    const rooms = ref([])

    const init = async () => {
      rooms.value = await getRooms()
    }

    const createRoomHandler = room => {
      rooms.value.push(room)
      modal.show = false
    }

    const deletedRoom = ref({})
    const confirmDeleteRoom = room => {
      deletedRoom.value = room
      setModal('modal-confirmation')
    }

    const deleteRoomHanler = async () => {
      try {
        await deleteRoomById(deletedRoom.value._id)
        rooms.value = rooms.value.filter(r => r._id !== deletedRoom.value._id)
        modal.show = false
        notify({ type: 'success', title: 'Успешно', text: 'Комната успешно удалена'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }
    
    onMounted(init)
    return {
      rooms,
      modal,
      setModal,
      createRoomHandler,
      confirmDeleteRoom,
      deleteRoomHanler,
    }
  },
}
</script>
<style lang="scss">
.chat-view {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>