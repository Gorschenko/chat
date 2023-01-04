import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Socketio from '@/plugins/socket.plugin'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App).use(router).use(store)

app.use(Socketio, {
  debug: true,
  connection: 'http://localhost:3000',
})

app.use(Notifications)

app.mount('#app')
