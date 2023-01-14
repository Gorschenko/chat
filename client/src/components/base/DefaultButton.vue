<template>
  <component
    :is="tag"
    :class="classes"
    :type="type"
    :disabled="isDisabled"
    @click="$emit('action', $event)"
  >
    <i
      v-if="icon"
      :class="['bx', icon]"
    />
    <span v-if="title">{{ title }}</span>
  </component>
</template>
<script>
import { computed } from 'vue'

export default {
  name: 'DefaultButton',
  emits: ['action'],
  props: {
    tag: {
      type: String,
      default: 'button' // button, a
    },
    type: {
      type: String,
      default: 'text',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: { // m, s, xs
      type: String,
      default: 's',
    },
    color: { // primary, neutral, danger, transparent
      type: String,
      default: 'primary',
    },
    form: { // rectangular, round
      type: String,
      default: 'rectangular'
    },
    withoutPaddings: {
      type: Boolean,
      default: false,
    },
    isDisabled : {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const classes = computed(() => [
      'default-button',
      'default-button_' + props.form + '_' + props.size,
      'default-button_' + props.color,
      'default-button_' + props.form,
      { 'default-button_resetted': props.withoutPaddings },
    ])
    return {
      classes,
    }
  },
}
</script>
<style lang="scss">
.default-button {
  @include flex-full-centered;
  transition: $tr-primary;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: $disabled-opacity;
  }

  i {
    font-size: 24px;
    color: inherit;
  }

  &_rectangular {
    &_m {
      gap: 8px;
      padding: 12px 24px;
      span {
        @include text_m;
        color: inherit;
      }
    }

      &_s {
      gap: 8px;
      padding: 8px 16px;
      span {
        @include text_s;
        color: inherit;
      }
    }

      &_xs {
      gap: 4px;
      padding: 6px 12px;
      span {
        @include text_xs;
        color: inherit;
      }
    }
  }

  &_round {
    &_m {
       font-size: 24px;
       padding: 12px;
    }

    &_s {
      font-size: 24px;
      padding: 8px;
    }

    &_xs {
      font-size: 16px;
      padding: 4px;
    }
  }

  // colors
  &_primary {
    color: $cl-neutral;
    background: $cl-primary;

    &:hover {
      background: $cl-primary-dark;
    }
  }

  &_neutral {
    color: $cl-primary;
    background: $cl-neutral;

    &:hover {
      background: $cl-primary-light;
    }
  }

  &_danger {
    color: $cl-neutral;
    background: $cl-danger;
    opacity: $btn-opacity;

    &:hover {
      opacity: 1;
    }
  }

  &_transparent {
    color: $cl-primary;

    &:hover {
      color: $cl-primary-dark;
    }
  }

  // forms
  &_rectangular {
    border-radius: 4px;
  }

  &_round {
    border-radius: 50%;
  }

  &_resetted {
    padding: 0 !important;
  }

}
</style>