/*
 * @Date: 2024-05-22 10:00:22
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-06 10:07:11
 * @Description: 
 */
setTimeout(() => {
    console.log('setTimeout')
}, 0)

new Promise((resolve, reject) => {
    console.log('promise')
    setTimeout(() => {
        console.log('timeout 2000')
        resolve()
    }, 2000)
   
}).then(() => {
    console.log('then1')
}).then(() => {
    console.log('then2')
})


console.log('sync')
// promise sync  setTimeout timeout 2000 then1 then2