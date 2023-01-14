<template>
  <div class="flex-v-centered flex-gap-8">
    <DefaultInput
      id="text"
      v-model="text"
      placeholder="Message..."
    />
    <DefaultButton
      icon="bx-envelope"
      :is-disabled="!text"
    />
  </div>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { ref } from 'vue'

export default {
  name: 'ResponserChat',
  components: {
    DefaultInput,
    DefaultButton,
  },
  setup () {
    const text = ref('')
    return {
      text,
    }
  }
}
</script>