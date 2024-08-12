"use strict";
/*
 * @Date: 2024-07-08 16:18:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-07-09 14:19:30
 * @Description:
 */
// 在 TypeScript 的类型定义，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// 在 ES6 中，=> 叫做箭头函数中
let add = (a, b) => {
    return a + b + '';
};
let add_ = (c, d) => { return c + d; };
const sum = add_(1, 2);
function push(arr, ...arg) {
    let a = [];
    a.push(arr);
    arg.forEach(item => {
        a.push(item);
    });
    return a;
}
const fn = debounce(add, 1000);
console.log(fn(1, 2));
