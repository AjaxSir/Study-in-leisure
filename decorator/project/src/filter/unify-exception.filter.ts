import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Request, Response } from 'express'
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Logger } from "winston";
export class UnifyExceptionFilter implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message || 'Internal Server Error';

        let validationErrors = null;
        if (exception instanceof HttpException) {
            status = exception.getStatus()
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
        this.logger.error({
            error: exception,
            message,
            timestamp: new Date().toISOString(),
            method: request.method,
            query: request.body || request.query,
            url: request.url,
            statusCode: status,
            stack: exception.stack
        })
        response.send({
            message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
    
}