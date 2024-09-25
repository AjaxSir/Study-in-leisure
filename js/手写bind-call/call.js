/*
 * @Date: 2024-09-24 10:43:25
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-09-24 17:24:05
 * @Description: 
 */
function fn(a,b,c,d) {
    console.log('fn called')
    console.log('agrs', a,b,c,d)
    console.log('this', this)
    return 123;
}

Function.prototype.myCall = function(ctx, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function')
    }
    const context = ctx || globalThis
    const fn = Symbol('key')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    console.log(context, 'context')
    return result
}

fn.myCall({b: 1}, 1, 2)
fn.call({a: 1}, 1, 2)