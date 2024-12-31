/*
 * @Date: 2024-12-26 15:42:14
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 17:39:32
 * @Description:  
 */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
import { LoggerMiddleware } from './logger/logger.middeware';
@Module({
  imports: [SharedModule, AdminModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({path: "*", method: RequestMethod.ALL});
  // }
  
}
