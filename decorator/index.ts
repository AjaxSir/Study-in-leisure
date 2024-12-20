/*
 * @Date: 2024-12-10 16:47:15
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-19 10:34:43
 * @Description: 
 */
const classDecorators: ClassDecorator = (target) => {
    console.log(target, '类装饰器')
}

const ProtoDecorator:PropertyDecorator = (target: any, key: string | Symbol) => {
    console.log(target, key, '属性装饰器')
}

const methodDecorator: MethodDecorator = (target: any, key: string | Symbol, desc: Object) => {
    console.log(target, key, desc, '方法装饰器')
}

const paramDecorator: ParameterDecorator = (target: any, key: string| Symbol| undefined, index:number) => {
    console.log(target, key, index, ' 参数装饰器')
}
// 执行顺序 调用的先后顺序 类控制器最后执行 
// 方法装饰器, 参数装饰器，属性装饰器 由近到远 , 参数装饰器从右到左
// classDecorators 中的target 是表示一个类  而其他装饰器中的target则是表示的是类的原型
@classDecorators
class Controller {
    @ProtoDecorator
    public name: string
    constructor() {
        this.name = 'w'
    }
    @methodDecorator
    getName(id: number, @paramDecorator name: string) {

    }

}
const c = new Controller()
console.log(c.name)