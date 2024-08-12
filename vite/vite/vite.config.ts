/*
 * @Date: 2024-05-23 14:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-09 15:39:10
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
        assetFileNames:(assetInfo) => {
          console.log(assetInfo.name, 'assetInfo.name')
          if (assetInfo.name === 'vendor') {
            return 'assets/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        manualChunks(id, { getModuleInfo, getModuleIds }) {
          if (id.indexOf("node_modules") !== -1) {
            return 'vendor';
          }
        }
      }
    }
  }
})
