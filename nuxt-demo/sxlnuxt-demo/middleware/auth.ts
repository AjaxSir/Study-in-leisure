/*
 * @Date: 2024-06-17 15:13:09
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-20 17:41:44
 * @Description: 
 */
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('auth 中间件')
    return navigateTo({
        path: '/login'
    })
})