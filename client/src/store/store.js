import { createStore } from 'vuex'
import auth from '@/store/modules/auth.store'
import user from '@/store/modules/user.store'

const store = createStore({
  modules: {
    auth,
    user,
  },
})

export default store
