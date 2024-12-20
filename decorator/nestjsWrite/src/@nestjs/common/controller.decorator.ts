import 'reflect-metadata'
interface ControllerOptions {
    prefix?: string
}
export function Controller(): ClassDecorator;
export function Controller(path: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function  Controller(path?: string | ControllerOptions):ClassDecorator {
    let options: ControllerOptions = {}
    if (typeof path === 'string') {
        options.prefix = path
    } else if (typeof path === 'object') {
        options = path
    }
    return (target: Function) => {
        Reflect.defineMetadata('prefix', options.prefix, target)
    }
}