import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Request, Response } from 'express'
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { I18nService, I18nValidationException } from "nestjs-i18n";
import { Logger } from "winston";
export class UnifyExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  private readonly i18n: I18nService) { }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: Request & { i18nLang:string } = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message || 'Internal Server Error';

    let validationErrors = null;
    if (exception instanceof HttpException) {
      if (exception instanceof I18nValidationException) {
        const { errors  } = exception
        message = errors.map(e => this.formatErrorsMessage(e, request.i18nLang)).join(',')
      } else {
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
  private formatErrorsMessage(e, lang) {
      const { property, value, constraints } = e
      const constraintsValues = Object.values(constraints)
      console.log('formatErrorsMessage', constraints, constraintsValues)
      return constraintsValues.map((c:string) => {
        const [variable, description] = c.split('|')
       return description? this.i18n.translate(variable, { lang, args: JSON.parse(description) }) : variable
      }).join(';')
  }

}