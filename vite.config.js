import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/forum/', // 👈 关键！指定资源的基础路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 定义 @ 为 src 目录
    },
  },
})
