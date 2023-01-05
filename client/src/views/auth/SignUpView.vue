<template>
  <section class="flex-row-centered">
    <div class="auth-page__inner">
      <header class="mb-16">
        <h1 class="text_xl text_weight_accent">Signup</h1>
      </header>
      <Form
        :validation-schema="validationSchema"
        @submit="submit"
      >
        <DefaultInput
          class="mb-16"
          id="email"
          placeholder="Email"
        />
        <DefaultInput
          class="mb-16"
          id="password"
          placeholder="Password"
        />
        <DefaultButton
          class="margin-right"
          type="submit"
          title="Sign Up"
        />
      </Form>
    </div>
  </section>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { signUp } from '@/api/auth.api/'
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from 'vue-router'

export default {
  name: 'SignUpView',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  setup () {
    const { notify}  = useNotification()
    const router = useRouter()
    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const submit = async $event => {
      try {
        await signUp($event)
        router.push({
          name: 'sign-in',
        })
        notify({ type: 'success', title: 'Успешно', text: 'Регистрация успешно заверешена'});
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
@import '@/views/auth/auth';
</style>