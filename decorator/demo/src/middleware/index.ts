import { Request, Response, NextFunction } from 'express'
const DIASABLE_LIST = ['/v1/user']
export const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (DIASABLE_LIST.includes(req.originalUrl)){
            res.send({
                success: false,
                message: "disabled",
            })
    }
    else {
        next()
    }
}