<template>
  <component
    :is="layout"
  />
</template>
<script>
import LayoutDefault from '@/layouts/LayoutDefault'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRoot } from '@/use/root.use'

export default {
  name: 'App',
  components: {
    LayoutDefault,
  },
  setup () {
    const route = useRoute();
    const { firstFetch } = useRoot()
    const layout = computed(() => 'layout-' + route.meta.layout)
    const init = async () => await firstFetch();
    init();
  
    return {
      layout,
    };
  },
}
</script>