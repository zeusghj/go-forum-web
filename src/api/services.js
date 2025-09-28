import api from ".";

// 用户相关
export function register(data) {
    // data: { username, password }
    return api.post('/register', data)
}

export function login(data) {
  // data: { username, password }
  return api.post('/login', data)
}

export function fetchProfile() {
  // 返回 { user_id, username }
  return api.get('/api/profile')
}

// 帖子相关
export function fetchPosts() {
  return api.get('/api/posts')
}

export function createPost(data) {
  // data: { title, content }
  return api.post('/api/posts', data)
}

// 评论相关
export function fetchComments(postId) {
  return api.get(`/api/posts/${postId}/comments`)
}

export function createComment(postId, data) {
  // data: { content }
  return api.post(`/api/posts/${postId}/comments`, data)
}