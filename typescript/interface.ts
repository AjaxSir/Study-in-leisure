/*
 * @Date: 2024-07-08 15:53:28
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-07-09 10:24:30
 * @Description: 
 */
interface IDemo {
    readonly name: string;
    age: number;
    sexy?:boolean;
    sayHello(): void;
    sayHi(): string;
    sayAge?: () => string
    // [prop: string]: any;
}

interface IDemo_ {
    sayAge_(): string
}

var demo: IDemo & IDemo_ = {
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
} ;



interface Student extends IDemo {
    classRoom: string
}
interface Ikey {
    [key: string]: string
}
// 不能将类型“number”分配给类型“string”。
// let k:Ikey = {
//     age: 1
// }

let user: IDemo = {
    name: 'tom',
    age: 20,
    sayHello() {
        console.log('hello');
    },
    sayHi() {
        return 'hi';
    },
    sexy: true
}
// user.name = 'tom'; // 无法为“name”赋值，因为它是只读属性。


interface A {
    x: number;
  }
  interface B extends A {
    y: number;
  }
  const obj = {
    x: 1,
    xx: 2,
    xxx: 3,
  };
  const ass: A = obj;
  ass.x; // 1
//   const b: B = obj; 
let c2: A & B = {
    x: 1,
    y:1
}
type A1 = 1 | 2 | 3;
type B1 = 2 | 3 | 4;
type C = A1 & B1; // C为: 2 | 3


type Last<T extends any[]> = [never, ...T][T['length']]

let a_:Last<[1,2,3,4]> = 4;


const adds = (a: number, b: number) => a + b;
type GetReturnType<T extends Function> =  T extends (...args: any[]) => infer R ? R : any;

var radd:GetReturnType<typeof adds> = 1