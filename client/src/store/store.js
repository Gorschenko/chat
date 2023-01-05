import { createStore } from 'vuex'
import auth from '@/store/modules/auth.store'
import user from '@/store/modules/user.store'

const store = createStore({
  modules: {
    auth,
    user,
  },
  state: {
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated (state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    SET_AUTHENTICATION (state, boolean) {
      state.isAuthenticated = boolean
    }
  },
})

export default store
