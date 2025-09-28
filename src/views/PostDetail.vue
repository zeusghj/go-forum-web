<template>
  <el-card>
    <h2>{{ post.Title || post.title }}</h2>
    <p>{{ post.Content || post.content }}</p>
    <el-divider />
    <h3>评论</h3>
    <div v-for="c in comments" :key="c.ID">
      <p><strong>{{ c.UserID }}</strong>: {{ c.Content || c.content }}</p>
    </div>

    <el-form :model="commentForm">
      <el-form-item>
        <el-input type="textarea" v-model="commentForm.content" />
      </el-form-item>
      <el-button type="primary" @click="submitComment">评论</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()

const post = ref({})
const comments = ref([])
const commentForm = ref({ content: '' })

async function load() {
  const id = route.params.id
  try {
    const resPost = await api.get(`/api/posts/${id}`) // 后端需实现 GET /api/posts/:id
    post.value = resPost.data
  } catch (e) {
    console.error(e)
  }

  try {
    const res = await api.get(`/api/posts/${id}/comments`) // 后端需实现
    comments.value = res.data
  } catch (e) {
    console.error(e)
  }
}

async function submitComment() {
  try {
    await api.post('/api/comments', { post_id: route.params.id, content: commentForm.value.content })
    ElMessage.success('评论成功')
    commentForm.value.content = ''
    await load()
  } catch (e) {
    ElMessage.error(e.response?.data?.error || '评论失败')
  }
}

onMounted(load)
</script>
