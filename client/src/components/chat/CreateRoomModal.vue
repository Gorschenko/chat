<template>
  <div class="create-room-modal">
    <Form
      :validation-schema="validationSchema"
      @submit="submit"
    >
      <DefaultInput
        class="mb-16"
        id="name"
        placeholder="Name"
      />
      <DefaultInput
        class="mb-16"
        id="description"
        placeholder="Description"
      />
      <DefaultButton
        class="margin-right"
        type="submit"
        title="Create"
        icon="bx-plus"
      />
    </Form>
  </div>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { createRoom } from '@/api/rooms.api'
import { useNotification } from "@kyvg/vue3-notification"
import { computed } from 'vue'
import { useStore } from 'vuex'


export default {
  name: 'CreateRoomModal',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  setup (_, { emit }) {
    const store = useStore()
    const user = computed (() => store.getters['user/user'])
    const { notify}  = useNotification()
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().optional(),
    })

    const submit = async values => {
      try {
        const newRoom = await createRoom(user.value._id, values)
        emit('create-room', newRoom)
        notify({ type: 'success', title: 'Успешно', text: 'Комната успешно создана'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    return {
      validationSchema,
      submit,
    }
  }
}
</script>
<style lang="scss">
.create-room-modal {
  width: 500px;
  padding: 16px;
}
</style>