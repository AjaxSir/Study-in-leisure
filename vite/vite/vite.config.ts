/*
 * @Date: 2024-05-23 14:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-27 11:26:06
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      dirs: ['./src/**']
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames:(assetInfo) => {
          // console.log(assetInfo.name, 'assetInfo.name')
          // if (assetInfo.name === 'vendor') {
          //   return 'assets/[name][extname]'
          // }
          // return 'assets/[name]-[hash][extname]'
          if(assetInfo.name!.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          const imgExts = [ '.png', '.jpg', '.jpeg', '.gif']
          if(imgExts.some(e => assetInfo.name!.endsWith(e))) {
            return 'images/[name]-[hash][ext]'
          }
          return 'assets/[name]-[hash][ext]'
        },
        manualChunks(id, { getModuleInfo, getModuleIds }) {
          if (id.indexOf("node_modules") !== -1) {
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, '/v1')
      },
      '/images': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, '/images')
      }
    }
  }
})
