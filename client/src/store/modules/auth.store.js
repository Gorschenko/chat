export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: true,
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
  },
  mutations: {
    SET_AUTHENTICATION (state, boolean) {
      state.isAuthenticated = boolean
    }
  },
}