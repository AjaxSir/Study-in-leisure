/*
 * @Date: 2024-12-18 14:24:01
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-18 15:17:47
 * @Description: 类装饰器的使用
 */

/**
 * 
 * @param construct 需要装饰的类
 * @returns 返回一个新增了时间戳的类
 */
const addTimeStamp = <T extends {new(...args:any[]): {}}>(construct: T) => {
    return class extends construct {
        timestamp = new Date()
    }
}
function addTimeStamp1<T extends {new(...args:any[]): {}}> (construct: T) {
    return class extends construct {
        timestamp = new Date()
    }
}


interface Car {
    timestamp: Date
}

@addTimeStamp
class Car {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const car = new Car('audi');
console.log(car.name)
console.log(car.timestamp)


const SayHello  = (word: string) => {
    return (target: Person) => {
        console.log(`${target} is ${word}`)
    }
}

@SayHello('Hello')
class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

// 构造签名类型，表示接受一个 string 参数并返回相应的实例
type Constructor<T> = new (...args: any[]) => T;
// type A = 1| 2
// const a:A = 2
// 工厂函数，它接受一个构造函数并返回该构造函数的实例
function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
    console.log()
    return new ctor(...args);
}

const t = createInstance(Person, '123')

