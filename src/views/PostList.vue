<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h2>帖子列表</h2>
      <el-button type="primary" @click="$router.push('/create')">发帖</el-button>
    </div>
    <el-divider />
    <el-list>
      <el-list-item v-for="p in posts" :key="p.ID" @click="$router.push(`/posts/${p.ID}`)">
        <div><strong>{{ p.Title || p.title }}</strong></div>
        <div>{{ p.Content || p.content }}</div>
      </el-list-item>
    </el-list>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPosts } from '../api/services'

const posts = ref([])

async function load() {
  try {
    const res = await fetchPosts()
    posts.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(load)
</script>
