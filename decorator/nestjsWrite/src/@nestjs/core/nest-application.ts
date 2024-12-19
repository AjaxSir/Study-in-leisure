import { Logger } from './log'
import express, { Express } from 'express'
export class NestApplication {
    private readonly app: Express = express()
    constructor(protected readonly module: any) {
        // this.module = module
    }   
    // 配置路由等
    async init () {

    }
    async listen(port = 3000) {
        await this.init()
        this.app.listen(port)
        Logger.log(`Server running on http://localhost:${port}`, 'NestApplication');
    }
}