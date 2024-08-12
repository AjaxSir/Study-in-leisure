import { Request, Response, NextFunction } from 'express'

export const printfRequestUrl = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.url);
    next();
}
/**
 * 默认异常处理
 */
export const defaultErrorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
    ) => {
        let statusCode: number , message: string;
        switch (error.message) {
            default: 
                statusCode = 500;
                message = '服务器出现异常'
        }
        response.status(statusCode).send({message});
}