/*
 * @Date: 2024-06-13 14:17:39
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-21 11:44:28
 * @Description: 
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {
    themes: ['dark']
  }
  // ssr: false
})
