<template>
  <div class="parent-size">
    <DefaultLayout />
    <notifications />
  </div>
</template>
<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import { useRoot } from '@/use/root.use'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
  setup () {
    const { firstFetch } = useRoot()
    const init = async () => await firstFetch();
    init();
  },
}
</script>