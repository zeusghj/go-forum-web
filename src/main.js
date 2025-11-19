import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import './assets/reset.css'   // ★★★ 新增：全局样式重置

import App from './App.vue'
import WinterActivityPage from './views/WinterActivityPage.vue'
import November from './views/November.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useAuthStore } from './store/auth'
import api from './api'


const app = createApp(November)
const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore()
if (auth.token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
    auth.fetchProfile().catch(() => auth.logout())
}

app.use(router)
app.use(ElementPlus)
app.mount('#app')
