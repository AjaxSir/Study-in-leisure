// class User {
//     constructor(name) {
//         this.name = name;
//     }
//     sleep() { // 不可枚举
//         console.log(`${this.name} is sleeping`)
//     }
// }

'use strict';

function User(name) {
	if (!new.target) {
		throw new TypeError(
			`You must use "new" to create instances of this class.`
		);
	}
	this.name = name;
}

// User.prototype.sleep = function () {
// 	console.log(`${this.name} is sleeping`);
// };
Object.defineProperty(User.prototype, 'sleep', {
	enumerable: false, // 是否可枚举
	writable: false, // 
	configurable: false, // 
	value: function () {
		console.log(`${this.name} is sleeping`);
	},
});
/**
 * configurable 决定之后的属性是否还能被重新定义 为false时 下面重新配置会报错
 */
// Object.defineProperty(User.prototype, 'sleep', {
// 	enumerable: false, // 是否可枚举
// 	writable: false, // 
// 	configurable: false,
// 	value: function () {
// 		console.log(`${this.name} is sleeping2`);
// 	},
// });
const user = new User('sxl');
/** 
 * writable: true,  为true才能被重新定义 */
// user.sleep = function () {
//     console.log('edit')
// };
user.sleep()
for (const key in user) {
	console.log(key);
}


