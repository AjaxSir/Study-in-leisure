import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { start } from "repl";
import { map, Observable } from "rxjs";
import { Logger } from "winston";
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest()
        return next.handle().pipe(
            map((data) => {
                this.logger.log({
                    level: 'info',
                    message: `Method: ${req.method}, URL: ${req.url}, Response: ${JSON.stringify(data)}`
                })
                return {
                    success: true,
                    data,
                    code: 200,
                    timestamp: new Date().toLocaleString()
                }
            })
        )
    }
    
}