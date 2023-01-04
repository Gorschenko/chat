<template>
  <div
    ref="target"
    class="default-dropdown"
  >
    <div
      class="cursor-pointer"
      @click.stop="showDropdown = !showDropdown"
    >
      <slot name="default" />
    </div>
    <div
      v-show="showDropdown"
      :class="[
        'default-dropdown__body',
        bodyPosition ? 'default-dropdown__body_' + bodyPosition : '',
      ]"
    >
      <slot name="body" />
    </div>
    <i
      v-show="showDropdown && hasTriangle"
      class="bx bxs-up-arrow default-dropdown__triangle"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'DefaultDropdown',
  props: {
    hasTriangle: {
      type: Boolean,
      default: true,
    },
    bodyPosition: {
      type: String,
      default: '', // center, right
    },
  },
  setup () {
    const showDropdown = ref(false)
    const target = ref(false)
    const close = () => {
      showDropdown.value = false
    }
    onClickOutside(target, close)

    return {
      showDropdown,
      target,
    }
  },
}
</script>
<style lang="scss">
.default-dropdown {
  position: relative;
  display: inline-block;

  &__body {
    position: absolute;
    top: calc(100% + 16px);

    &_right {
      right: 0;
    }

    &_center {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__triangle {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    font-size: 16px;
  }
  
}
</style>