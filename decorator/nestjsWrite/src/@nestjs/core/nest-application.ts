
/*
 * @Date: 2024-12-19 11:40:10
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-23 11:26:43
 * @Description: 
 */
import { Logger } from './log'
import 'express-session'
import express, { Express, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import path from 'path'
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
    // 配置路由等
    async init() {
        // 获取controllers 数组信息
        // module 这里就是已经经过装饰器修饰的 AppModule 
        const controllers = Reflect.getMetadata('controllers', this.module)
        for (const Controller of controllers) {
            const controller = new Controller()
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
                        res.send(result)
                    })
                }
            }
        }
        Logger.log('NestApplication started successful', 'NestApplication')
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