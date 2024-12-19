/*
 * @Date: 2024-12-18 15:18:34
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-18 16:42:49
 * @Description: 方法装饰器
 * 1. 日志记录 AOP
 * 2. 权限控制
 * 3. 缓存控制
 */
// const methodDecorator: MethodDecorator = (target: any, key: string | Symbol, desc: Object) => {
//     console.log(target, key, desc, '方法装饰器')
// }
import fs from 'fs' 
import path from 'path'
const Logger = (target: any, key: string | Symbol, desc: PropertyDescriptor) => {
    const originalMethod = desc.value;
    const logDir = path.join(__dirname,'/log')
    const logPath = path.join(logDir, '1.log')
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
    }
    const ws = fs.createWriteStream(logPath, { flags: 'a' })
        desc.value = async function (...args: any[]) {
            ws.write(`${new Date()} \n`, (err) => {
                if (err) throw err;
                console.log('The file was saved!');
            })
            console.log(`Before ${key} called with`, args);
            const result = await originalMethod.apply(this, args);
            ws.write(`${args} calculator result is  ${result} \n `)
            // ws.close()
            return result
            
        };
        return desc;
}

const cache = (target: any, key: string, desc: PropertyDescriptor) => {
    const originalMethod = desc.value

    let cache = new Map<string, any>()

    desc.value = function(...args: any[]) {
        const cacheKey = JSON.stringify(args)
        if (cache.has(cacheKey)) {
            console.log(`${cacheKey} has Cached ${cache.get(cacheKey)}`)
            return cache.get(cacheKey)
        }
        const result = originalMethod.apply(this, args)
        cache.set(cacheKey, result)
        return result
    }
    return desc
}
class Operations {
    @Logger
    add(a:number, b: number) {
        return a + b;
    }

    @cache
    cacheOperations(n: number): number {
        if (n <= 1 ) return 1
        return n * this.cacheOperations(n  - 1)
    }
    get name() {
        return 'Operations'
    }
}
const o = new Operations()
// o.add(1,2)
// o.add(1,2)
console.log(o.cacheOperations(5))
console.log(o.cacheOperations(5))
console.log(o.name)
