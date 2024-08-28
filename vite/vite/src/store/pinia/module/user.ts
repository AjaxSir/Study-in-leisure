/*
 * @Date: 2024-08-27 18:22:11
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-27 18:22:26
 * @Description: 
 */
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
    const count = ref(0)
    const name = ref('user')
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
  
    return { count, name, doubleCount, increment }
  })