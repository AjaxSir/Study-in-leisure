"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifyExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const nestjs_i18n_1 = require("nestjs-i18n");
const winston_1 = require("winston");
let UnifyExceptionFilter = class UnifyExceptionFilter {
    constructor(logger, i18n) {
        this.logger = logger;
        this.i18n = i18n;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message || 'Internal Server Error';
        let validationErrors = null;
        if (exception instanceof common_1.HttpException) {
            if (exception instanceof nestjs_i18n_1.I18nValidationException) {
                const { errors } = exception;
                message = errors.map(e => this.formatErrorsMessage(e, request.i18nLang)).join(',');
            }
            else {
                status = exception.getStatus();
                const exceptionResponse = exception.getResponse();
                if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
                    message = exceptionResponse['message'];
                    if (Array.isArray(message)) {
                        validationErrors = message;
                        message = validationErrors.join(',');
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
        });
        response.send({
            message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
    formatErrorsMessage(e, lang) {
        const { property, value, constraints } = e;
        const constraintsValues = Object.values(constraints);
        console.log('formatErrorsMessage', constraints, constraintsValues);
        return constraintsValues.map((c) => {
            const [variable, description] = c.split('|');
            return description ? this.i18n.translate(variable, { lang, args: JSON.parse(description) }) : variable;
        }).join(';');
    }
};
exports.UnifyExceptionFilter = UnifyExceptionFilter;
exports.UnifyExceptionFilter = UnifyExceptionFilter = __decorate([
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [winston_1.Logger,
        nestjs_i18n_1.I18nService])
], UnifyExceptionFilter);
//# sourceMappingURL=unify-exception.filter.js.map