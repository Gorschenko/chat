<template>
  <div :class="componentClass">
    <button
      :class="[
        'default-accordion__button',
        buttonClass
      ]"
      @click="isShown = !isShown"
    >
      <span class="flex-row flex-gap-8">
        <i
          v-if="leftIconName"
          :class="leftIconClass"
        />
        <span class="default-accordion__title text_weight_accent"
        >
          {{ title }}
        </span>
      </span>
      <i :class="rightIconClass" />
    </button>
    <div
      ref="body"
      :class="bodyClass"
      :style="maxBodyHeight ? 'max-height:' + maxBodyHeight + 'px' : ''"
    >
      <slot />
    </div>
  </div>
</template>
<script>
  import { ref, computed, watch, onMounted } from 'vue'

  export default {
    name: 'DefaultAccordion',
    emits: ['update:isOpened'],
    props: {
      isOpened: {
        type: Boolean,
        required: true,
      },
      size: {
        type: String,
        default: 'm',
      },
      leftIconName: {
        type: String,
        default: '',
      },
      leftIconColor: {
        type: String,
        default: '',
      },
      buttonClass: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        required: true,
      },
      rightIcon: {
        type: Object,
        default: () => ({
          closeState: {
            name: 'bx bx-chevron-down',
            color: '',
          },
          openState: {
            name: 'bx bx-chevron-up',
            color: '',
          },
        }),
      },
      maxBodyHeight: {
        type: Number,
      },
    },
    setup(props, { emit }) {
      const body = ref(null)
      const isShown = ref(props.isOpened)
      
      const componentClass = computed(() => 
        [
          'default-accordion',
          'default-accordion_' + props.size,
        ]
      )
      const leftIconClass = computed(() => 
        [
          'default-accordion__icon',
          props.leftIconName,
          props.leftIconColor,
        ]
      )
      const rightIconClass = computed(() => 
        [
          'default-accordion__icon',
          isShown.value
            ? props.rightIcon.openState.name + props.rightIcon.openState.color
            : props.rightIcon.closeState.name + props.rightIcon.closeState.color,
        ]
      )
      const bodyClass = computed(() => 
        [
          'default-accordion__body',
          props.maxBodyHeight
            ? 'default-accordion__body_scrolling'
            : 'default-accordion__body_hiding',
        ]
      )
      const changeHeight = () => {
        isShown.value
          ? body.value.style.height = body.value.scrollHeight + 'px'
          : body.value.style.height = 0 + 'px';
      }

      watch(
        isShown,
        value => {
          emit('update:isOpened', value)
          changeHeight()
        }
      )

      onMounted(changeHeight) // init

      return {
        isShown,
        componentClass,
        leftIconClass,
        rightIconClass,
        bodyClass,
        body,
      }
    },
  };
</script>
<style lang="scss">
.default-accordion {
  &_m, &_s {
    .default-accordion {
      &__icon {
        font-size: 24px;
      }

      &__title {
        @include text_m;
      }
    }
  }
  
  &_xs {
    .default-accordion {
      &__icon {
        font-size: 16px;
      }
      &__title {
        @include text_s;
      }
    }
  }

  &__button {
    width: 100%;
    @include flex-between;
  }

  &__body {
    transition: 0.5s;

    &_hiding {
      overflow: hidden;
    }

    &_scrolling {
      overflow: auto;
    }
  }
}
</style>