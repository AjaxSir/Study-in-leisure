/*
 * @Date: 2024-07-11 10:36:21
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-07-12 10:23:11
 * @Description: 
 */
// 爬到第n级楼梯需要的步数
// 解法 1：
function getSteps(n) {
    if (n === 1) return 1
    if (n === 2) return 2
    let arr = [1 , 2]
    for(let k = 2; k <= n; k++) {
        arr[k] = arr[k-1] + arr[k-2]
    }
    return arr[n]
}
// 解法 2 缓存之前的相加结果
function getStep2(n) {
    let res = 1, n0 = 1, n1 = 1
    for(let k = 2; k <= n; k++) {
       res = n0 + n1
       n0 = n1
       n1 = res
    }
    return res
}

// 爬到最高级楼梯需要的最小体力
var stepEnergtic = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
function getMinEnergetic(n) {    
    if(!(n instanceof Array)) return 0
    if (n.length === 1 || !n.length) return 0
    n.push(0)
    let arr = [n[0], n[1]]
    for(let k = 2; k < n.length; k++) {
        arr[k] = Math.min(arr[k-1], arr[k-2]) + n[k]
    }
    return arr[n.length - 1]
    // cost.push(0)
    // let dp = [], n = cost.length
    // dp[0] = cost[0]
    // dp[1] = cost[1]
    // for(let i = 2; i < n; i++){
    //     dp[i] = Math.min(dp[i-2] , dp[i-1]) + cost[i]
    // }
    // return dp[n-1]
}
// 优化
function getMinEnergetic_2(cost) {
    const n = cost.length;
    let prev = 0, curr = 0;
    for (let i = 2; i <= n; i++) {
        let next = Math.min(curr + cost[i - 1], prev + cost[i - 2]);
        prev = curr;
        curr = next;
    }
    return curr;
}
console.log(getMinEnergetic_2([1, 100, 1, 1, 4]))
console.log(getMinEnergetic([1, 100, 1, 1, 4]))
// history.push(stepEnergtic)

// 冒泡排序
function bubbleSort(arr) {
    for(var i = 0;i < arr.length - 1;i++) {
        for(var j = i+1;j<arr.length;j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr
}
// 选择排序

function selectSort(arr) {
    for(var i = 0;i < arr.length - 1; i++) {
        var minIndex = i;
        for(var j = i+1;j<arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if(minIndex!= i) {
            let temp = arr[i];               
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr
}
console.log(selectSort([9,3,6,7,3,2,6,1]))