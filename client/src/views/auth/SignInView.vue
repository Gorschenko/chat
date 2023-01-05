<template>
  <section class="flex-row-centered">
    <div class="auth-page__inner">
      <header class="mb-16">
        <h1 class="text_xl text_weight_accent">Login</h1>
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
          title="Sign In"
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
import { signIn } from '@/api/auth.api/'
import { useNotification } from "@kyvg/vue3-notification";
import { useRoot } from '@/use/root.use'

export default {
  name: 'SignInView',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  setup () {
    const { notify}  = useNotification()
    const { firstFetch } = useRoot()
    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const submit = async $event => {
      try {
        const { token } = await signIn($event)
        localStorage.setItem('token', token)
        await firstFetch()
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