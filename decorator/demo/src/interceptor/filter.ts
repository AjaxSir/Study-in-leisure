/*
 * @Date: 2024-12-12 14:18:26
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 17:41:26
 * @Description: 异常过滤器用于捕获并处理请求过程中的异常。如果请求在生命周期的任何阶段抛出异常，异常过滤器会捕获它们并格式化响应。
                 执行顺序：异常过滤器是请求生命周期的最后一步。无论请求过程中发生了什么异常，异常过滤器都会捕获并处理。
                 使用场景：例如：统一格式化异常响应、处理未处理的异常等。
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class GlobalErrorFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        let message = exception.message || 'Internal Server Error';
        let validationErrors = null;
        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
              // 提取 ValidationPipe 抛出的验证错误
              message = exceptionResponse['message'];
              if (Array.isArray(message)) {
                validationErrors = message; // 如果是数组，说明是验证错误
                message = validationErrors.join(','); // 修改顶层错误信息
              }
            }
          }
        
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception instanceof HttpException
        ? exception.getStatus()  // 如果是 HttpException，调用 getStatus
        : 500;
        response.status(status).json({
            status,
            time: new Date(),
            path: request.url,
            message,
            success: false
        })
    }
}