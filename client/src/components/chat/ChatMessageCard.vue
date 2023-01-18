<template>
  <li class="flex-column flex-gap-8 text_s p-16 br-primary border-solid">
    <div class="flex-between">
      <p class="text_weight_accent">{{ message.user.email }}</p>
      <p class="text_weight_accent">{{ message.createdAt }}</p>
    </div>
    <div>
      {{ message.text }}
    </div>
    <div class="flex flex-gap-8 flex-justify-content-end">
      <DefaultButton
        color="transparent"  
        icon="bx-edit-alt"
        size="xs"
        :without-paddings="true"
      />
      <DefaultButton
        color="transparent"
        icon="bx-box"
        size="xs"
        :without-paddings="true"
      />
    </div>
  </li>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
export default {
  name: 'ChatMessageCard',
  components: {
    DefaultButton,
  },
  props: {
    message: {
      type: Object,
      required: true,
    }
  }
}
</script>