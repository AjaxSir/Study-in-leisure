/*
 * @Date: 2024-09-02 15:01:35
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-09-03 10:02:55
 * @Description: 
 */
const str = 'addfsdfsggwerascvxmcvjfos'
// const result = {}
// for(const s of str) {
//  if (result[s]) {
//     result[s]++
//  } else {
//     result[s] = 1
//  }
// }
// console.log(result)/

// const result = [...str].reduce((r, c) => (r[c] ? r[c]+=1 : r[c] = 1, r), {})
// console.log(result)
// (a, b , c) 括号运算符 会返回最后一个执行值
const result = [...str].reduce((r,c) => {
    r[c] = (r[c] || 0) + 1
    return r;
}, {})
console.log(result)