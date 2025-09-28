<template>
  <el-card>
    <h2>登录</h2>
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-button type="primary" @click="onLogin">登录</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../api'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '../api/services'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ username: '', password: '' })

async function onLogin() {
  try {
    const res = await login(form)
    const token = res.data.token
    if (!token) throw new Error('no token')

    auth.setAuth(token)
    await auth.fetchProfile() // 获取用户信息（后端 /api/profile）
    ElMessage.success('登录成功')
    router.push('/')
  } catch (err) {
    console.error(err)
    ElMessage.error(err.response?.data?.error || '登录失败')
  }
}
</script>
