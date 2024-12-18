/*
 * @Date: 2024-12-12 14:18:26
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 16:30:49
 * @Description: 中间件是 NestJS 中处理请求的最早阶段，它们会在请求被路由处理程序（Controller）之前进行处理。
 * 中间件的作用类似于 Express 中的中间件，可以用来执行一些预处理操作，比如验证请求、记录日志、设置请求头等。
执行顺序：所有中间件会按照它们在应用中注册的顺序依次执行。
使用场景：例如：验证请求的授权、记录访问日志、请求体解析等。
 */
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'
export class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req)
        // if (req.originalUrl === '/v1/user') {
        //     res.send({
        //         success: false,
        //         message: "Logged in"
        //     })
        // } else {
            next()
        // }
        
    }
}