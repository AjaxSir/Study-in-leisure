import 'reflect-metadata'
export function Injectable():ClassDecorator {
    return (target) => {
        Reflect.defineMetadata('injectable', true, target)
    }
}