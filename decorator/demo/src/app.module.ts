/*
 * @Date: 2024-12-10 17:48:47
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 15:05:50
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { SpiderModule } from './spider/spider.module';
import { GlobalGuardGuard } from './global-guard/global-guard.guard'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: '47.113.199.106',
      port: 3306,
      username: 'remote',
      password: '123456',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      retryDelay:500, //重试连接数据库间隔
      retryAttempts:10,//重试连接数据库的次数
      // autoLoadEntities:true,
      synchronize: true, // 自动同步数据库表
    }),
    UserModule, 
    ListModule, 
    ConfigModule.forRoot({ path: 'user' }), 
    UploadModule, 
    SpiderModule],
  controllers: [AppController],
  providers: [AppService2, {
    provide: "ABC",
    useClass: AppService
  }, {
    provide: 'BBB',
    useValue: "BBB"
  }, {
    provide: "ccc",
    inject: [AppService2],
    // useFactory(a: AppService2) {
    //     return a.getHello() 
    // },
    async useFactory(a: AppService2) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(a.getHello())
        }, 3000)
      })
  },
  }, {
    provide: APP_GUARD,
    useClass: GlobalGuardGuard // 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。
  }],
})
export class AppModule {}
