<template>
  <div
    :class="[
      'default-input__wrapper_' + wrapperType,
    ]"
  >
    <label
      v-if="label"
      :for="name"
      :class="[
        'text_' + size,
      ]"
    >
      {{ label }}
    </label>
    <div :class="inputClasses">
      <div
        :class="[
          'default-input',
          'default-input_' + size,
        ]"
      >
        <i
          v-if="icon"
          :class="['bx', icon]"
        />
        <input
          :id="id"
          :name="id"
          :placeholder="placeholder"
          :type="type"
          :class="[
            'parent-size',
            'text_' + size,
          ]"
          :value="inputValue"
          @input="handleChange"
          @blur="handleBlur"
        >
      </div>
      <p
        v-show="errorMessage"
        class="text_xs color_danger"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script>
import { toRef, watch } from 'vue';
import { useField } from 'vee-validate';

export default {
  name: 'DefaultInput',
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text' // text, password
    },
    id: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    wrapperType: {
      type: String,
      default: 'column',
    },
    size: {
      type: String,
      default: 's',
    },
    // преимущественно для ширины при wrapperType = row
    inputClasses: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup (props, { emit }) {
    const name = toRef(props, 'id');
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    watch(inputValue, value => emit('update:modelValue', value))
    return {
      name,
      inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    }
  },
}
</script>
<style lang="scss">
.default-input {
  @include flex-v-centered;
  gap: 4px;
  border: $border-solid;
  border-radius: $br-secondary;
  background: $cl-primary-light;

  &_m {
    padding: 12px 14px;
  }

  &_s {
    padding: 10px 14px;
  }

  &__wrapper {
    width: 100%;

    &_column {
      display: block;
    }
  
    &_row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }
  }
}
</style>