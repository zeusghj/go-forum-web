import { defineStore } from "pinia"
import api from '../api'
import { fetchProfile } from "../api/services"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null, 
        username: localStorage.getItem('username') || null,
        userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null
    }),
    getters: {
        isLoggedIn: (state) => !! state.token
    },
    actions: {
        setAuth(token) {
            this.token = token
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        async fetchProfile() {
            try {
                // 你后端有 /api/profile 接口可返回 user_id/username
                const res = await fetchProfile()
                this.userId = res.data.user_id
                this.username = res.data.username
                localStorage.setItem('userId', String(this.userId))
                localStorage.setItem('username', this.username)
            } catch (err) {
                console.error('fetchProfile err', err)
                // 如果 token 无效或过期，可以选择 logout()
                // this.logout()
            }
        },
        logout() {
            this.token = null
            this.userId = null
            this.username = null
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            delete api.defaults.headers.common['Authorization']
        }
    }
})
