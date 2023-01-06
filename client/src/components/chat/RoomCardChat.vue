<template>
  <li class="flex-column flex-gap-8">
    <h1 class="text_s text_weight_accent">Room name</h1>
    <p class="text_s text_weight_accent color_neutral">
      Room description
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

export default {
  name: 'RoomCardChat',
  components: {
    DefaultButton,
  },
}
</script>