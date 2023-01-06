<template>
  <div class="create-room-modal">
    <Form
      :validation-schema="validationSchema"
      @submit="$emit('create', $event)"
    >
      <DefaultInput
        class="mb-16"
        id="title"
        placeholder="Title"
      />
      <DefaultInput
        class="mb-16"
        id="image"
        placeholder="Image URL"
      />
      <DefaultInput
        class="mb-16"
        id="price"
        placeholder="Price"
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

export default {
  name: 'CreateRoomModal',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },

  setup () {
    const validationSchema = Yup.object().shape({
      title: Yup.string().required(),
      image: Yup.string().url().required(),
      price: Yup.number().required(),
    })

    return {
      validationSchema,
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