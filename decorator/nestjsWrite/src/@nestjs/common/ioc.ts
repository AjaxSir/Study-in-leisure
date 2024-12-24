/*
 * @Date: 2024-12-23 17:47:59
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-24 10:15:10
 * @Description: 
 */
import 'reflect-metadata'
function Injectable(target) {
    // 不需要做任何操作代码 只是给构造函数添加元数据
}

@Injectable
class Engine {
    start() {
        console.log('Engine started');
    }
}
@Injectable
class Car {
    //  
    engine 
    constructor(engine: Engine) {
        this.engine = engine
        // 1
        // this.engine = new Engine()
    }

    drive() {
        this.engine.start()
        console.log('Drive started');
    }
}

// 2
// const engine = new Engine()
// const car = new Car(engine)
// car.drive()


// 通过IOC依赖注入容器

class DIContainer {
    private instances: Map<string, any> = new Map()
    register <T>(name: string, Service: new (...args) => T) {
        this.instances.set(name, Service)
    }

    resolve<T>(name: string) {
        const Service = this.instances.get(name)
        const metaData = Reflect.getMetadata('design:paramtypes', Service) ?? [] // 获取元数据 [Engine]
        const Instances = metaData.map(e => {
            return this.resolve(e.name) // 递归解析依赖
        })
        console.log(metaData, '=================')

        return new Service(...Instances)
    }
}

const di = new DIContainer()
di.register('Engine', Engine)
di.register('Car', Car)

const car = di.resolve('Car')

car.drive();