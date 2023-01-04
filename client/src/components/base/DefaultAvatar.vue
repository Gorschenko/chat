<template>
  <div :class="['default-avatar', 'default-avatar_' + size]">
    <img
      v-if="data.photo_link"
      :src="data.photo_link"
      class="default-avatar__image"
    />
    <p
      v-else
      class="text_s color_light"
    >
      A
    </p>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true
    },
  },
}
</script>
<style lang="scss">
  .default-avatar {
    @include flex-full-centered;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    background: $cl-primary;

    &_xxl {
      width: 72px;
      height: 72px;
    }

    &_xl {
      width: 64px;
      height: 64px;
    }

    &_l {
      width: 56px;
      height: 56px;
    }

    &_m {
      width: 48px;
      height: 48px;
    }

    &_s {
      width: 40px;
      height: 40px;
    }

    &_xs {
      width: 32px;
      height: 32px;
    }

    &_xxs {
      width: 24px;
      height: 24px;
    }

    &_xxxs {
      width: 16px;
      height: 16px;
    }

    &__image {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &__status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 35%;
      height: 35%;
      border: $border-solid;
      border-radius: 50%;
    }
  }
</style>