// test middlewares
export default {
  namespaced: true,
  state() {
    return {
      isAdmin: false,
      isAuthenticated: true,
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    isAdmin(state) {
      return state.isAdmin
    },
  },
}