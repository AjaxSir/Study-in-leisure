/*
 * @Date: 2024-04-24 19:37:33
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-04-25 09:45:34
 * @Description: 
 */
class UIGoods {
    constructor(goodInfo) {
        Object.defineProperty(this, 'goodInfo', {
            get() {
                return goodInfo;
            },
            set(value) {
                goodInfo = value;  
            },
            enumerable: true,
            writable: false
        })
    }
}
var info = {
    price: 200,
    name: "apple",
    category: "fruit"
}

var g = new UIGoods(info);
g.goodInfo = '23'
console.log(g.goodInfo); // { price: 200, name: 'apple', category: 'fruit' }