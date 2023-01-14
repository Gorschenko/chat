<template>
  <li class="flex-column flex-gap-8 text_s">
    <div class="flex-between">
      <p class="text_weight_accent">Author</p>
      <p class="text_weight_accent">Date</p>
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cupiditate et reprehenderit suscipit minus error repellendus, totam temporibus exercitationem qui.
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
  name: 'MessageChat',
  components: {
    DefaultButton,
  },
}
</script>