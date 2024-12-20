import { join } from 'path';
/*
 * @Date: 2024-12-19 11:40:10
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-19 17:03:51
 * @Description: 
 */
import { Logger } from './log'
import express, { Express, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import path from 'path'
export class NestApplication {
    private readonly app: Express = express()
    constructor(protected readonly module: any) {
        // this.module = module
    }   
    // 配置路由等
    async init () {
       // 获取controllers 数组信息
       // module 这里就是已经经过装饰器修饰的 AppModule 
       const controllers = Reflect.getMetadata('controllers', this.module)
       for (const Controller of controllers) {
        const controller = new Controller()
        // 获取方法信息
        const prefix  = Reflect.getMetadata('prefix', Controller) || '/'
        Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver')
        const controllerPrototype = Controller.prototype
        for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
            const method = controllerPrototype[methodName] // 获取方法函数
            const httpMethod = Reflect.getMetadata('method', method) as string; // 元数据获取当前方法的请求方法
            const _path = Reflect.getMetadata('path', method)// 元数据获取当前方法的请求路径
            if (httpMethod) { // httpMethod 还有可能是构造函数
                const routerPath = path.posix.join('/', prefix, _path)
                Logger.log(`Mapped { ${routerPath} methodName: ${ methodName }}`, '[RoutesResolver]')
                this.app[httpMethod.toLocaleLowerCase()](routerPath, async (req: Request, res: Response, nest: NextFunction) => {
                    const result = await method.call(controller)
                    res.send(result)
                })
            }
        }
       }
       Logger.log('NestApplication started successful', 'NestApplication')
    }
    async listen(port = 3000) {
        await this.init()
        this.app.listen(port)
        Logger.log(`Server running on http://localhost:${port}`, 'NestApplication');
    }
}