<template>
  <header class="flex-v-centered flex-gap-16">
    <HeaderNavigation class="flex-grow-1" />
  </header>
</template>
<script>
import HeaderNavigation from '@/layouts/header/HeaderNavigation'

export default {
  name: 'DefaultHeader',
  components: {
    HeaderNavigation,
  },
}
</script>