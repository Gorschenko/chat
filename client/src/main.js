import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-3-socket.io'

const app = createApp(App).use(router).use(store)

app.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  options: {
    transports : ['websocket'],
  },
}))

app.mount('#app')
