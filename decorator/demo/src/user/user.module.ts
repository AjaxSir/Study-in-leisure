/*
 * @Date: 2024-12-10 17:52:11
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-11 16:35:05
 * @Description: 
 */
import { Module, NestMiddleware, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from '../middleware/log'
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(customer: MiddlewareConsumer) {
    // customer.apply(Logger).forRoutes(UserController); // 应用 Logger 到 UserController 路由
    customer.apply(Logger).forRoutes({
      path: '/v1/user',
      method: RequestMethod.ALL,
    });
  }
}
