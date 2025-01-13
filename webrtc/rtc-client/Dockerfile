# 使用 Node.js 构建 Vue 项目
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 使用轻量化的 Nginx 镜像
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
