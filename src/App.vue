<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-header>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>

        <template v-if="!auth.isLoggedIn">
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
        </template>

        <template v-else>
          <el-menu-item disabled>{{ auth.username }}</el-menu-item>
          <el-menu-item index="/create">发帖</el-menu-item>
          <el-menu-item @click="onLogout">退出登录</el-menu-item>
        </template>
      </el-menu>
    </el-header>

    <!-- 页面内容 -->
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function onLogout() {
  auth.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 20px;
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
}
</style>
