<template>
  <el-card>
    <h2>注册</h2>
    <el-form :model="form" @submit.prevent="onSubmit">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage, formContextKey } from 'element-plus'
import { useRouter } from 'vue-router'
import { register } from '../api/services'

const router = useRouter()
const form = reactive({username: '', password: ''})

async function onSubmit() {
    try {
        await register(form)
        ElMessage.success('注册成功, 请登录')
        router.push('/login')
    } catch (e) {
        ElMessage.error(e.response?.data?.error || '注册失败')
    }
}
</script>
