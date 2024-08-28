/*
 * @Date: 2024-08-27 16:55:54
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-27 17:42:41
 * @Description: from './
 */
import { createStore } from 'vuex'
import counter from './module/counter'
import persist from './persist'
export default createStore({
    modules: {
        counter
    },
    plugins: [persist]
})