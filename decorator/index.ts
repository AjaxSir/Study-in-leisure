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