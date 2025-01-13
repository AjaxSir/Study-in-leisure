import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, 'src/assets')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@assets/media.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api')
          }
        }
  }
})
