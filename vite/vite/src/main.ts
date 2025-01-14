/*
 * @Date: 2024-05-23 14:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-28 09:54:15
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
// import store from './store/vuex'
import { createPinia } from 'pinia'
import persist from './store/pinia/persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "vue-global-api"
const pinia = createPinia()
pinia.use(persist)
createApp(App)
// .use(store)
.use(pinia)
.use(ElementPlus)
.mount('#app')
