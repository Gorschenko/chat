import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export function useRoot () {
  const store = useStore()
  const router = useRouter()

  const firstFetch = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      await setAppInfo();
    }
  }

  const setAppInfo = async () => {
    await store.dispatch('user/SET_USER')
    store.commit('auth/SET_AUTHENTICATION', true)
    router.push({ name: 'chat' })
  }

  const logout = () => {
    localStorage.removeItem('token')
    store.commit('auth/SET_AUTHENTICATION', false)
    router.push({ name: 'sign-in' })
  }

  return {
    firstFetch,
    logout,
  }
}