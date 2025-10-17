<template>
  <div>
    <h1>欢迎来到 Go + Vue 简易论坛</h1>

    <div v-if="!auth.isLoggedIn">
      <p>请登录以查看帖子和发帖。</p>
    </div>

    <div v-else>
      <el-button type="primary" @click="router.push('/create')">发帖</el-button>
      <el-divider></el-divider>

      <el-card v-for="p in posts" :key="p.id" @click="$router.push(`/posts/${p.id}`)" class="mb-2">
        <h3>{{ p.title }}</h3>
        <p>{{ p.content }}</p>
        <small>作者：{{ p.username }} | 评论数：{{ p.commentCount }}</small>
      </el-card> 
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ElMessage } from 'element-plus';
import { fetchPosts } from '../api/services';

const auth = useAuthStore()
const router = useRouter()
const posts = ref([])

async function loadPosts() {
  try {
    const res = await fetchPosts()
    posts.value = res.data.posts
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  if (auth.isLoggedIn) loadPosts()
})

</script>

<style scoped>
h2 {
  color: #42b983;
}

.mb-2 {
  margin-bottom: 12px;
}
</style>
