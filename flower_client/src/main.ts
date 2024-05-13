import { createApp } from 'vue'

import pinia from './stores'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import '@/styles/main.scss'

import 'virtual:svg-icons-register'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
