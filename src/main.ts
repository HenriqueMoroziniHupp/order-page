import { createApp } from 'vue'
import { configure } from 'vue-gtag'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'

import './assets/normalize.css'

configure({
  tagId: 'G-ERT6R36PBS',
})
const head = createHead()
const app = createApp(App)

app.use(head)
app.use(router)

app.mount('#app')
