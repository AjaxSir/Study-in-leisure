/*
 * @Date: 2024-06-20 17:36:24
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-20 17:37:56
 * @Description: 
 */
export default defineNuxtRouteMiddleware((to, from) => {
    console.log(`from: ${from.path} to ${to.path}`)
})