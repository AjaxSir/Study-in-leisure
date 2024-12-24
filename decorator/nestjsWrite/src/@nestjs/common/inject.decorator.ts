import 'reflect-metadata'
export function Inject(name: string): ParameterDecorator {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        // 当是构造函数参数时 target 表示的是类本身 [ class Person ]
        // 当时基本函数参数时 target 表示的是person 原型
        
        const exiting = Reflect.getMetadata('inject-class',target) ?? []
        exiting[parameterIndex] = name
        Reflect.defineMetadata('inject-class',exiting, target)
    };
}