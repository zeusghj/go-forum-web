# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## 🔧 使用 systemd管理系统

- 立即启动Nginx​
```bash
sudo systemctl start nginx
```

- 设置Nginx开机自动启动​
```bash
sudo systemctl enable nginx
```

- 检查Nginx的运行状态​
```bash
sudo systemctl status nginx
```

- 重新启动Nginx​（通常在修改配置文件后需要执行此操作）
```bash
sudo systemctl restart nginx
```

- 重新加载Nginx配置​（平滑重载，不会中断正在处理的连接）
```bash
sudo systemctl reload nginx
```

- 停止Nginx服务​
```bash
sudo systemctl stop nginx
```

## 部署到nginx 
```
sudo cp -r /home/goer/workspace/vue/go-forum-web/dist/* /usr/share/nginx/html/dist/
```