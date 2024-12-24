
/*
 * @Date: 2024-12-19 11:40:10
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-24 15:41:12
 * @Description: 
 */
import { Logger } from './log'
import 'express-session'
import express, { Express, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import path from 'path'
import { LoggerService, UseValueService } from '../../log.service'
import { di } from '@nestjs/common'
export class NestApplication {
    private readonly app: Express = express()
    constructor(protected readonly module: any) {
        this.app.use(express.json()) // 把json格式的数据放在req.body上
        this.app.use(express.urlencoded({ extended: true })) // 把form表单格式的数据放在body上
        // this.module = module
    }

    use(middleware: any) {
        this.app.use(middleware)
    }

    private resolveInjectableDependencies(controller) {
        const dependencies = Reflect.getMetadata('inject-class', controller)
        console.log('构造函数添加Inject ', dependencies)

        const allDependencies = Reflect.getMetadata('design:paramtypes', controller)
        console.log('全部构造函数需要注入的' , allDependencies)

        return allDependencies.map((dependency) =>  di.resolve(dependency.name))
    }

    // 配置路由等
    async init() {
        // 获取controllers 数组信息
        // module 这里就是已经经过装饰器修饰的 AppModule 
        const controllers = Reflect.getMetadata('controllers', this.module)

        const providers = Reflect.getMetadata('providers', this.module)
        for (const provider of providers) {
            const types = typeof provider
            switch (types) {
                case 'function':
                    const isInjectable = Reflect.getMetadata('injectable', provider)
                    isInjectable && di.register(provider.name, provider)
                    break;
                case 'object':
                    if (provider.provide && provider.useValue) {
                        const isInjectable = Reflect.getMetadata('injectable', provider.useValue)
                        isInjectable && di.register(provider.useValue.name, provider.useValue)
                    }
                    // 注入
                    break;
                default:
                    break;
            }
        }
        console.log(di.instances, '')
        for (const Controller of controllers) {
            const dependencies = this.resolveInjectableDependencies(Controller)
            const controller = new Controller(...dependencies)
            // 获取方法信息
            const prefix = Reflect.getMetadata('prefix', Controller) || '/'
            Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver')
            const controllerPrototype = Controller.prototype
            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                const method = controllerPrototype[methodName] // 获取方法函数
                const httpMethod = Reflect.getMetadata('method', method) as string; // 元数据获取当前方法的请求方法
                const _path = Reflect.getMetadata('path', method)// 元数据获取当前方法的请求路径
                if (httpMethod) { // httpMethod 还有可能是构造函数
                    const routerPath = path.posix.join('/', prefix, _path)
                    Logger.log(`Mapped { ${routerPath} methodName: ${methodName}}`, '[RoutesResolver]')
                    this.app[httpMethod.toLocaleLowerCase()](routerPath, async (req: Request, res: Response, nest: NextFunction) => {
                        const args = this.paramsResolve(req, res, nest, methodName, controller)
                        const result = await method.call(controller, ...args) // call 是分别传入 apply 是数组
                        const responseMetaData = this.getResponseMetaData(controller, methodName)
                        if (!responseMetaData || (responseMetaData && responseMetaData?.data?.passthrough)) {
                            // 使用了response res 装饰器 那么nest则不负责返回 自己使用返回 如果未使用 那么则挂起
                            res.send(result)
                        }
                    })
                }
            }
        }
        Logger.log('NestApplication started successful', 'NestApplication')
    }

    private getResponseMetaData(controller, methodName) {
        let paramsList = Reflect.getMetadata('params', controller, methodName) ?? []
        return paramsList.filter(Boolean).find(e => e.name === 'Responese' || e.name === 'Res')
    }   

    private paramsResolve(req: any, res, nest, methodName, controllerPrototype) {
        let paramsList = Reflect.getMetadata('params', controllerPrototype, methodName) ?? []
        console.log('paramsList', paramsList)
        // 排序的原因 装饰器从右到左 而参数是顺序传入
        const result = paramsList.map(e => {
            switch (e.name) {
                case "Request":
                    return req
                case "Req":
                    return req
                case 'Query':
                    return e.data ? req.query[e.data] : req.query
                case 'Headers':
                    return e.data ? req.headers[e.data] : req.headers
                case 'Sessions':
                    return e.data ? req.session[e.data] : req.session
                case 'Ip':
                    return req.ip;
                case 'Param':
                    return e.data ? req.params[e.data] : req.params
                case 'Body':
                    return e.data ? req.body[e.data] : req.body
                case 'Response':
                case 'Res':
                    return res;    
                default:
                    return null
            }
        })
        return result
    }
    async listen(port = 3000) {
        await this.init()
        this.app.listen(port)
        Logger.log(`Server running on http://localhost:${port}`, 'NestApplication');
    }
}