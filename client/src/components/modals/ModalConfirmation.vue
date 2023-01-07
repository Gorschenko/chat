<template>
  <div class="modal-confirmation">
    <h1 class="text_xl text_weight_accent mb-16">{{ title }}</h1>
    <p
      v-if="text"
      class="text_s"
    >
      {{ text }}
    </p>
    <div class="flex-between flex-gap-8 flex-justify-content-end">
      <DefaultButton
        title="Cancel"
        color="neutral"
        @action="$emit('close')"
      />
      <DefaultButton
        :title="button.title"
        :color="button.color"
        @action="$emit('confirm')"
      />
    </div>
  </div>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'

export default {
  name: 'ConfirmationModal',
  emits: ['close', 'confirm'],
  components: {
    DefaultButton,
  },
  props: {
    title: {
      type: String,
      default: 'Do you want to confirm?',
    },
    text: {
      type: String,
      default: '',
    },
    button: {
      type: Object,
      default: {
        title: 'Confirm',
        color: 'primary',
      },
    }
  }
}
</script>
<style lang="scss">
.modal-confirmation {
  width: 500px;
  padding: 16px;
}
</style>