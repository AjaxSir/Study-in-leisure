import 'reflect-metadata'
export const Get = (path: string = ''):MethodDecorator => {
    return (target: Object, propertyKey: string | Symbol, desc: PropertyDescriptor): any => {
        Reflect.defineMetadata('path', path, desc.value)       
        Reflect.defineMetadata('method', 'GET', desc.value)       
    }
}

export const Post = (path: string = ''):MethodDecorator => {
    return (target: Object, propertyKey: string | Symbol, desc: PropertyDescriptor): any => {
        Reflect.defineMetadata('path', path, desc.value)       
        Reflect.defineMetadata('method', 'POST', desc.value)       
    }
}