/*
 * @Date: 2024-12-10 17:48:47
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 15:18:18
 * @Description: 拦截器用于处理请求和响应之间的逻辑，允许你修改请求的响应内容、包装返回值、记录日志、实现缓存等。拦截器还可以控制请求生命周期中的额外逻辑，例如记录执行时间、改变返回格式等。
 */
import { NestInterceptor, Injectable, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
interface Data<T> {
    data: T,
    status: number,
    message: string,
    success: boolean
}

@Injectable()
export class Response<T> implements NestInterceptor {
    intercept(_context, next: CallHandler):Observable<Data<T>>  {
        return next.handle().pipe(
            tap(data => console.log('Response================>', data)),
            map((data) => {
                
                return {
                    data,
                    status: 200,
                    message: 'OK',
                    success: true
                }
            })
        )
    }
}