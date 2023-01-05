<template>
  <nav class="flex-between">
    <div class="flex flex-gap-16">
      <router-link
        v-for="item in firstList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark cursor-pointer"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="flex flex-gap-16">
      <router-link
        v-for="item in filteredSecondList"
        :key="item.value"
        class="text_xl color_primary color_hovered_primary_dark"
        :to="{ name: item.value }"
      >
        {{ item.name }}
      </router-link>
      <router-link
        v-if="isAuthenticated"
        class="text_xl color_primary color_hovered_primary_dark"
        :to="{ name: 'sign-in' }"
        @click="logout"
      >
        Выйти
      </router-link>
    </div>
  </nav>
</template>
<script>
import { useRoot } from '@/use/root.use'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

const firstList = [
  {
    name: 'Чат', value: 'chat',
  },
]

const secondList = [
  {
    name: 'Войти', value: 'sign-in', isAuth: false,
  },
  {
    name: 'Регистрация', value: 'sign-up', isAuth: false,
  },
]
export default {
  name: 'HeaderNavigation',
  setup () {
    const store = useStore()
    const { logout } = useRoot()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const filteredSecondList = computed(() => secondList.filter(i => i.isAuth === isAuthenticated.value))
    return {
      firstList,
      filteredSecondList,
      logout,
      isAuthenticated,
    }
  }
}
</script>