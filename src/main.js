import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useAuthStore } from './store/auth'
import api from './api'

const app = createApp(App)
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
