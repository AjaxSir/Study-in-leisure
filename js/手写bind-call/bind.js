/*
 * @Date: 2024-09-24 10:43:25
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-09-24 10:59:33
 * @Description: 
 */
function fn(a,b,c,d) {
    console.log('fn called')
    console.log('agrs', a,b,c,d)
    console.log('this', this)
    return 123;
}

Function.prototype.myBind = function(ctx, ...args) {
    const fn = this
    return function(...resetArgs) {
        if (new.target) {
            return new fn(ctx, [...args, ...resetArgs]);
        }
        return fn.apply(ctx, [...args, ...resetArgs]);
    }
}

const newFn = fn.myBind('ctx', 1, 2)
const newFn1 = fn.bind('ctx', 1, 2)
console.log(new newFn(3, 4))
console.log(new newFn1(3,4))
