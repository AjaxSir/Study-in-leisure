function A () {}
var a = new A();
// console.log(a.prototype === A.prototype) // false
// console.log(a.__proto__ === A.prototype) // true
// console.log(a.prototype === A) // false
// console.log(a.prototype) // undefined
console.log(A.__proto__ === Function.prototype) // true
console.log(Function.__proto__ === Object.prototype) // false
console.log(Object.__proto__ == null) // false
console.log(A.__proto__.__proto__ === Object.prototype) // true