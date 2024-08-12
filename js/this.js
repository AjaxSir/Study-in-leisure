/*
 * @Date: 2024-04-23 14:38:37
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-04-23 15:13:01
 * @Description: 
 */
var a = {
    a: () => {
        console.log(this.c)
    },
    b: function() {
        console.log(this.c)
    },
    c: 2
}
a.a()
a.b()

function delay(time = 1000) {
    const times = new Date().valueOf()
    return function() {
        while(new Date().valueOf() - times < time) {}
    }
    
}
const d = delay()
d()