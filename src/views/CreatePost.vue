<template>
  <el-card>
    <h2>发帖</h2>
    <el-form :model="form">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" />
      </el-form-item>
      <el-button type="primary" @click="onCreate">提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ title: '', content: '' })

async function onCreate() {
  try {
    const res = await api.post('/api/posts', form)
    ElMessage.success('发帖成功')
    router.push(`/posts/${res.data.post_id || res.data.id || ''}`)
  } catch (e) {
    ElMessage.error(e.response?.data?.error || '发帖失败')
  }
}
</script>
