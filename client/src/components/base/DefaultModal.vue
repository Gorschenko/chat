<template>
  <Teleport to="body">  
    <Transition name="modal">
      <div
        v-if="show"
        class="default-modal__wrapper"
        @click.self="close"
      >
        <div class="default-modal">
          <slot />
          <default-button
            class="default-modal__close-button"
            color="neutral"
            form="round"
            size="xs"
            icon="bx-x"
            @action="close"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import { ref, watch } from 'vue'

export default {
  name: 'DefaultModal',
  emits: ['update:modelValue'],
  components: {
    DefaultButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup (props, { emit }) {
    const show = ref(false)
    watch(
      () => props.modelValue,
      value =>  show.value = value
    )
  
    const close = () => emit('update:modelValue', false)
    return {
      show,
      close,
    }
  },
}
</script>
<style lang="scss">
.default-modal {
  position: relative;
  border-radius: 8px;
  background: $cl-light-background;
  transition: $tr-primary;

  &__wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    @include flex-column-full-centered;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    transition: $tr-primary;
  }

  &__close-button {
    position: absolute;
    top: 0;
    left: calc(100% + 8px);
  }
}
</style>