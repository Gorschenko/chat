import { getUser } from '@/api/users.api/'
export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
  },
  actions: {
    async SET_USER (context) {
      const user = await getUser()
      context.commit('SET_USER', user)
      return user
    },
  },
}