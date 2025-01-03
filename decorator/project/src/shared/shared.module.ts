/*
 * @Date: 2024-12-26 16:14:59
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 16:11:13
 * @Description: 
 */
import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ConfiguareService } from './services/configuare.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './services/user.service'
import { MySqlBaseService } from './services/mysql-base.service'
import { User } from '../shared/entities/User'
import { IsUserNameUniqueConstructor } from './validator/user-validator'

import { WinstonModule } from 'nest-winston'
import 'winston-daily-rotate-file' // 用于实现日志文件的定期归档。由于应用日志量一般都非常大，因此需要定期自动对日志文件进行轮换、归档与删除。
import * as winston from 'winston'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/interceptor/response.interceptor';
import { LoggerMiddleware } from 'src/logger/logger.middeware';
import { UnifyExceptionFilter } from 'src/filter/unify-exception.filter';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import { join } from 'path';
import { watch } from 'fs';
import { UtilityService } from 'src/utils/utility.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from 'src/guard/authGuard';
import { jwtConstants } from 'src/guard/constant';
@Global()
@Module({

    imports: [
        // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        ConfigModule.forRoot({ isGlobal: true, }),
        TypeOrmModule.forRootAsync({
            inject: [ConfiguareService],
            useFactory: (configService: ConfiguareService) => {
                return {
                    type: 'mysql',
                    ...configService.config,
                    // autoLoadEntities: true,
                    entities: [__dirname + '/**/entities/*{.ts,.js}'],
                    synchronize: true, // 自动同步数据库表
                    logging: true, // 开启 SQL 执行的日志

                }
            }
        }),
        TypeOrmModule.forFeature([User]),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.colorize(),
                        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
                    ),
                }), // 输出到控制台
                new winston.transports.DailyRotateFile({ // 按日期分割日志文件。
                    level: 'info',
                    dirname: 'log',
                    filename: 'logs/info-%DATE%.log',
                    datePattern: 'YYYY-MM-DD', // 'YYYY-MM-DD' 表示按天分割日志文件。
                    zippedArchive: true, // 是否压缩日志文件。如果设置为 true，旧日志文件会被压缩成 .gz 格式
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${info.context ? '其余参数:' + JSON.stringify(info.context) : ''}   \n`),
                    ),
                }),
                new winston.transports.DailyRotateFile({ // 按日期分割日志文件。
                    level:'error',
                    dirname: 'log',
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD', // 'YYYY-MM-DD' 表示按天分割日志文件。
                    zippedArchive: true, // 是否压缩日志文件。如果设置为 true，旧日志文件会被压缩成 .gz 格式
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}  路径: ${info.url}  参数: ${JSON.stringify(info.query)} \n`),
                    ),
                }),
            ],
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: join(__dirname, '../i18n'),
                watch: true,
            },
            resolvers: [
                AcceptLanguageResolver,
                new QueryResolver(['lang']),
                new HeaderResolver(['x-custom-lang'])
            ]
        }),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' }, // token 有效期为 1 小时
        })
    ],
    providers: [
        
        // {
        //     provide: APP_FILTER,
        //     useClass: UnifyExceptionFilter // 全局过滤器
        // },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor, // 全局响应拦截器
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        UtilityService
        ,ConfiguareService, UserService, IsUserNameUniqueConstructor, AuthService],
    exports: [UtilityService, ConfiguareService, UserService, IsUserNameUniqueConstructor, AuthService],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: "*", method: RequestMethod.ALL});
  }
  
}


