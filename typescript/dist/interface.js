"use strict";
var demo = {
    name: 'tom',
    age: 20,
    sayHello() {
        console.log('hello');
    },
    sayHi() {
        return 'hi';
    },
    sayAge_() {
        return `${this.age} years old`;
    }
};
// 不能将类型“number”分配给类型“string”。
// let k:Ikey = {
//     age: 1
// }
let user = {
    name: 'tom',
    age: 20,
    sayHello() {
        console.log('hello');
    },
    sayHi() {
        return 'hi';
    },
    sexy: true
};
const obj = {
    x: 1,
    xx: 2,
    xxx: 3,
};
const ass = obj;
ass.x; // 1
//   const b: B = obj; 
let c2 = {
    x: 1,
    y: 1
};
let a_ = 4;
const adds = (a, b) => a + b;
var radd = 1;
