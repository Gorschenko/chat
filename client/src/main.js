import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import Socketio from '@/plugins/socket.plugin'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App).use(router).use(store)

app.use(Socketio, {
  connection: `${process.env.VUE_APP_BASE_URL}`,
  options: {
    autoConnect: false,
  }
})

app.use(Notifications)

app.mount('#app')
