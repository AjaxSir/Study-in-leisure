import { Inject, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from 'winston'
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {

    }
    use(req: Request, res: Response, next: NextFunction) {
        const {
            query, params, path, body, headers, url, method,
        } = req

        this.logger.log({
            level: 'info',
            message: `Request: ${method} ${url}`,
            context: {
                query,
                params,
                path,
                body,
                headers
            }
        });
        next()
    }

}