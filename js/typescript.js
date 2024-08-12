/*
 * @Date: 2024-04-29 11:18:09
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-10 09:42:41
 * @Description:
 */
// function hello(name: string):string
// function hello(age: number):number
// function hello(value: string | number):string | number {
//     if (typeof value === 'string') {
//         console.log(value.toUpperCase())
//         return 'string'
//     } else if(typeof value === 'number') {
//        return value
//     } else {
//         return 'err'
//     }
// }
// hello(12)
// interface Keys {
//     [key:string]: any
// }
// class Article {
//     title: string
//     content: string
//     aaa?: string
//     constructor(title: string, content: string) {
//         this.title = title
//         this.content = content
//     }
// }
// class User {
//     name: string
//     age: number
//     private _pwd: string = '';
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }
//     get pwd() {
//         return '*****'
//     }
//     set pwd(value: string) {
//         this._pwd = value
//     }
// }
// const u = new User('sxl', 12)
// console.log(u.pwd);
// u.pwd = '123'
// console.log(u.pwd);
// abstract class Animal {
//     abstract name: string
//     get sound() {
//         return this.name  === 'dog' ? 'wangwang' : 'miaomiao'
//     }
// }
// class Cat extends Animal {
//     name = 'cat'
// }
// const cat = new Cat()
// console.log(cat.sound)
var Singleton = /** @class */ (function () {
    function Singleton() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    // 示例方法
    Singleton.prototype.someMethod = function () {
        console.log("I am doing something.");
    };
    return Singleton;
}());
// 使用单例
var instance1 = new Singleton();
var instance2 = new Singleton();
instance1.someMethod(); // Output: I am doing something.
console.log(instance1 === instance2); // Output: true
