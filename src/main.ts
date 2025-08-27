import { createApp } from 'vue'
import { configure } from 'vue-gtag'
import App from './App.vue'
import router from './router'

import './assets/normalize.css'

configure({
  tagId: 'G-ERT6R36PBS',
})
const app = createApp(App)

app.use(router)

app.mount('#app')
