/*
 * @Date: 2024-04-23 10:15:26
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-21 10:15:51
 * @Description: 
 */
// var arr = [1,2,3,4,5,6,7,8,9]
// var res = 0
// function sum(arrs, i = 0) {
//     if (i === arrs.length) return 0
//     console.log(arrs[i], 'arrs[i]')
//     return arrs[i] + sum(arrs, i + 1)
// }
// console.log(sum(arr))

// for(初始代码;条件代码;循环代码) {}

// function m() {
//     var res = 0
//     var i = 0
//     function _m() {
//         // 条件代码
//         if (i >= arr.length) {
//             return
//         }
//         res += arr[i]
//         i++
//         _m()
//     }
//     _m()
//     console.log(res)
// }
// m()

// Promise.MyAll = function (promises) {
    
//     return new Promise((resolve, reject) => {
//         let count = 0
//         let resArr = []
//         for (let i = 0; i < promises.length; i++) {
//             Promise.resolve(promises[i]).then(res => {
//                 resArr[i] = res
//                 count++
//                 if (count === promises.length) {
//                     resolve(resArr)
//                 }
//             }).catch(err => {
//                 reject(resArr)
//             })
//         }
//     })

// }

// Promise.MyAll([1,Promise.reject(1), 2,3,4,]).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
const h = []
const w = []
async function async1() {
	console.log('async1 start');
	await async2();
    w.push('asnyc1 end')
	console.log('asnyc1 end');
}
async function async2() {
    w.push('async2')
	console.log('async2');
}
console.log('script start');
setTimeout(() => {
	console.log('setTimeOut');
    console.log(w, '微任务')
}, 0);
async1();
new Promise(function (reslove) {
	console.log('promise1');
    w.push('promise1')
	reslove();
}).then(function () {
	console.log('promise2');
    w.push('promise2')
})
console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// asnyc1 end
// promise2
// setTimeOut
