"use strict";
class Test {
    constructor(className, id) {
        this.className = className;
        this.id = id;
    }
}
const isSame = (op, np) => {
    if (op.length !== np.length)
        return false;
    for (let i = 0; i < op.length; i++) {
        if (op[i] !== np[i])
            return false;
    }
    return true;
};
const singleTon = (className) => {
    let ins = null;
    let params = [];
    return new Proxy(className, {
        construct(target, argArray) {
            console.log('construct');
            if (!ins) {
                params = argArray;
                ins = new target(...argArray);
            }
            if (!isSame(params, argArray)) {
                throw new Error('参数不一致');
            }
            return ins;
        },
    });
};
const TestClass = singleTon(Test);
const test1 = new TestClass('sxl', 29);
const test2 = new TestClass('syl', 4);
console.log(test1 === test2);
console.log(test2.className);
