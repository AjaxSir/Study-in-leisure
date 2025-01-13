#!/bin/bash

# 构建 Vue 容器
echo "Building Vue app container..."
cd rtc-client || exit 1
docker build -t rtc-client . || exit 1
cd ..

# 构建 Node.js 容器
echo "Building Node.js container..."
cd rtc-server || exit 1
docker build -t rtc-server . || exit 1
cd ..

# 构建 Nginx 容器
echo "Building Nginx container..."
cd nginx || exit 1
docker build -t custom-nginx . || exit 1
cd ..

# 停止并删除旧容器
echo "Stopping and removing old containers (if any)..."
docker rm -f rtc-client rtc-server nginx 2>/dev/null || true

# 启动 Vue 容器
echo "Starting Vue app container..."
docker run -d --name rtc-client rtc-client || exit 1

# 启动 Node.js 容器
echo "Starting Node.js container..."
docker run -d --name rtc-server rtc-server || exit 1

# 启动 Nginx 容器，链接 Vue 和 Node.js 容器
echo "Starting Nginx container..."
docker run -d --name nginx --link rtc-client --link rtc-server -p 80:80 custom-nginx || exit 1

echo "All containers have been started successfully!"
