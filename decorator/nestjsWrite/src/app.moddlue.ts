/*
 * @Date: 2024-12-19 11:06:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-24 14:11:10
 * @Description: 
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { LoggerService } from './log.service'
@Module({
    controllers: [AppController],
    providers: [LoggerService, {
        provide: 'serviceToken',
        useValue: LoggerService
    }]
})
export class AppModule {

}