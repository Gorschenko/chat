<template>
  <div class="flex-column-full-centered">
    <Form
      :validation-schema="validationSchema"
      @submit="submit"
      class="flex-column flex-gap-16"
    >
      <DefaultInput
        id="name"
        placeholder="Name"
      />
      <DefaultButton
        type="submit"
        title="Start chat"
        size="m"
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
  name: 'AuthChat',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  emits: ['sign-in'],
  setup (_, { emit }) {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
    })

    const submit = (formData, { resetForm }) => {
      emit('sign-in', formData)
      resetForm()
    }
    return {
      validationSchema,
      submit,
    }
  }
}
</script>