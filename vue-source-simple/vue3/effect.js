/*
 * @Date: 2024-05-13 16:12:40
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-13 16:25:35
 * @Description: 
 */
export function track(target, key) {
    console.log(`%c 依赖收集${target[key]}`, 'color: #f00')
}

export function trigger(target, key, val) {
    console.log(`%c 派发更新${key} 为 ${val}, old ${target[key]}`, 'color: #f0f')
}