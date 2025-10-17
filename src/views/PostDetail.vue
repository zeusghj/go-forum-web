<template>
  <el-card>
   <!-- 帖子详情 -->
    <section v-if="post">
      <h2>{{ post.title }}</h2>
      <p class="meta">
        作者: {{ post.username || '匿名' }} | 发布于: {{ formatDate(post.createdAt) }}
      </p>
      <p class="content">{{ post.content }}</p>
    </section>

    <!-- 评论列表 -->
    <section class="comments">
      <h3>评论 ({{ comments.length }})</h3>
      <ul>
        <li v-for="c in comments" :key="c.id">
          <strong>{{ c.username || '匿名' }}</strong>: {{ c.content }}
          <span class="time">{{ formatDate(c.createdAt) }}</span>
        </li>
      </ul>
    </section>

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
import { createComment, fetchComments, fetchPost } from '../api/services'
const route = useRoute()

const post = ref({})
const comments = ref([])
const commentForm = ref({ content: '' })

async function load() {
  const id = route.params.id
  try {
    const resPost = await fetchPost(id) // 后端需实现 GET /api/posts/:id
    post.value = resPost.data
  } catch (e) {
    console.error(e)
  }

  try {
    const res = await fetchComments(id) // 后端需实现
    comments.value = res.data.comments
  } catch (e) {
    console.error(e)
  }
}

async function submitComment() {
  try {
    const params = { post_id: Number(route.params.id), content: commentForm.value.content }
    await createComment(params)
    ElMessage.success('评论成功')
    commentForm.value.content = ''
    await load()
  } catch (e) {
    ElMessage.error(e.response?.data?.error || '评论失败')
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// function formatDate(dateStr, format = 'YYYY-MM-DD HH:mm:ss') {
//   const date = new Date(dateStr);
  
//   const replacements = {
//     'YYYY': date.getFullYear(),
//     'MM': String(date.getMonth() + 1).padStart(2, '0'),
//     'DD': String(date.getDate()).padStart(2, '0'),
//     'HH': String(date.getHours()).padStart(2, '0'),
//     'mm': String(date.getMinutes()).padStart(2, '0'),
//     'ss': String(date.getSeconds()).padStart(2, '0')
//   };
  
//   return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
// }

onMounted(load)
</script>

<style scoped>

.meta {
  font-size: 0.9rem;
  color: gray;
}
.content {
  margin: 1rem 0;
}

.time {
  font-size: 0.8rem;
  color: #999;
  margin-left: 8px;
}

</style>