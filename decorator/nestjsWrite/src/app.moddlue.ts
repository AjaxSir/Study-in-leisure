/*
 * @Date: 2024-12-19 11:06:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-24 15:39:14
 * @Description: 
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { LoggerService,UseValueService } from './log.service'
@Module({
    controllers: [AppController],
    providers: [LoggerService, {
        provide: 'serviceToken',
        useValue: UseValueService
    }]
})
export class AppModule {

}