import axios from "axios"
import { useAuthStore } from "../store/auth"

const api = axios.create({
    baseURL: 'http://62.234.40.7:8082', // 开发时用 Vite proxy，生产打包后由 Nginx 配置
    timeout: 5000
})

// 请求拦截： 自动带token
api.interceptors.request.use(config => {
    const authStore = useAuthStore()
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
})

// 响应拦截：可以统一处理错误
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // 401 表示未授权或 token过期
            const authStore = useAuthStore()
            authStore.logout()
            alert("登录过期，请重新登录")
        }
        return Promise.reject(error)
    }

)

export default api

