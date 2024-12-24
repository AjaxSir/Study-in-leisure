/*
 * @Date: 2024-12-24 14:17:33
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-24 14:20:08
 * @Description: 
 */

function Inject(): ParameterDecorator {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        // 当是构造函数参数时 target 表示的是类本身 [ class Person ]

        // 当时基本函数参数时 target 表示的是person 原型
        console.log(target, parameterIndex)
        if (parameterIndex === 0) {
            Object.keys(target)
            // console.log(target.prototype)
        }
    };
}
class Person {

    constructor(c: number, @Inject() public name: string) {

    }

    method(@Inject() a:number) {

    }
}