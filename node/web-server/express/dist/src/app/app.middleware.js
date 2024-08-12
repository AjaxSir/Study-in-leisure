"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = exports.printfRequestUrl = void 0;
const printfRequestUrl = (request, response, next) => {
    console.log(request.url);
    next();
};
exports.printfRequestUrl = printfRequestUrl;
/**
 * 默认异常处理
 */
const defaultErrorHandler = (error, request, response, next) => {
    let statusCode, message;
    switch (error.message) {
        default:
            statusCode = 500;
            message = '服务器出现异常';
    }
    response.status(statusCode).send({ message });
};
exports.defaultErrorHandler = defaultErrorHandler;
//# sourceMappingURL=app.middleware.js.map