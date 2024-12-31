"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuare_service_1 = require("./services/configuare.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./services/user.service");
const User_1 = require("../shared/entities/User");
const user_validator_1 = require("./validator/user-validator");
const nest_winston_1 = require("nest-winston");
require("winston-daily-rotate-file");
const winston = require("winston");
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("../interceptor/response.interceptor");
const logger_middeware_1 = require("../logger/logger.middeware");
const unify_exception_filter_1 = require("../filter/unify-exception.filter");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
let SharedModule = class SharedModule {
    configure(consumer) {
        consumer.apply(logger_middeware_1.LoggerMiddleware).forRoutes({ path: "*", method: common_1.RequestMethod.ALL });
    }
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [configuare_service_1.ConfiguareService],
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        ...configService.config,
                        entities: [__dirname + '/**/entities/*{.ts,.js}'],
                        synchronize: true,
                        logging: true,
                    };
                }
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User]),
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        format: winston.format.combine(winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.colorize(), winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
                    }),
                    new winston.transports.DailyRotateFile({
                        level: 'info',
                        dirname: 'log',
                        filename: 'logs/info-%DATE%.log',
                        datePattern: 'YYYY-MM-DD',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${info.context ? '其余参数:' + JSON.stringify(info.context) : ''}   \n`)),
                    }),
                    new winston.transports.DailyRotateFile({
                        level: 'error',
                        dirname: 'log',
                        filename: 'logs/error-%DATE%.log',
                        datePattern: 'YYYY-MM-DD',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}  路径: ${info.url}  参数: ${JSON.stringify(info.query)} \n`)),
                    }),
                ],
            }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: (0, path_1.join)(__dirname, '../i18n'),
                    watch: true,
                },
                resolvers: [
                    nestjs_i18n_1.AcceptLanguageResolver,
                    new nestjs_i18n_1.QueryResolver(['lang']),
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang'])
                ]
            })
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: unify_exception_filter_1.UnifyExceptionFilter
            },
            configuare_service_1.ConfiguareService, user_service_1.UserService, user_validator_1.IsUserNameUniqueConstructor
        ],
        exports: [configuare_service_1.ConfiguareService, user_service_1.UserService, user_validator_1.IsUserNameUniqueConstructor],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map