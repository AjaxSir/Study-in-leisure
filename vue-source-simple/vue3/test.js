/*
 * @Date: 2024-05-13 16:18:55
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-13 16:19:36
 * @Description: 
 */
import { reactivr } from './reactive.js'
let obj =   reactivr({
        a: 1,
        b: 2
    })

const fn = () => {
    obj.a;
    obj.b
}
fn()
obj.a++
