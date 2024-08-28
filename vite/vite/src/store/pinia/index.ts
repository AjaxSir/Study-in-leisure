/*
 * @Date: 2024-08-27 18:06:26
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-28 09:40:00
 * @Description: 
 */
import { useCounterStore } from './module/counter'
import { useUserStore } from './module/user'

export default function useStore() {
    return {
        counterStore: useCounterStore(),
        userStore: useUserStore()
    }
}
