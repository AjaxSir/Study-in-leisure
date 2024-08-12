import { Request, Response, NextFunction } from "express";
import { getList } from './posts.servers'
export const index = (
    req: Request,
    res: Response,
    next:NextFunction
) => {
    if (req.headers['auth'] !== 'sxl') {
        return next(new Error('没有权限'))
    }
    const data = getList()
    res.send(data);
}