import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'

import { useAuthStore } from "../store/auth"

const routes = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/posts', component: PostList },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/posts/:id', component: PostDetail, props: true },
  { path: '/create', component: CreatePost, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory('/forum/'),
  routes
})

// 简单路由守卫：需要鉴权的页检查 token
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router