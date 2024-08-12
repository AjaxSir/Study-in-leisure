/*
 * @Date: 2024-05-30 10:07:47
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-03 09:24:18
 * @Description: 
 */
const nature = () => {
    console.log('...')
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('resolve')
                resolve('🦖')
            }, 2000)
    }) 
}
nature().then(res => {
    console.log(res) 
})
console.log('🌋')
// 10.28.16.246  

// jimp