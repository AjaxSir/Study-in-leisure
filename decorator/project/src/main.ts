/*
 * @Date: 2024-12-26 15:42:14
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 10:29:07
 * @Description: 
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use(cookieParser())
  app.use(session({
    secret: 'secret key',
    resave: false, // 当 session 没有修改时，是否强制保存 session。resave: false 意味着只有 session 被修改时才会保存
    saveUninitialized: false, // 作用：如果 session 没有初始化，就不会创建一个新的 session
    cookie: {
      maxAge: 60 * 60 * 1000, // session 1 hour
    },
  }))
  app.useGlobalPipes(new ValidationPipe({ transform: true })) // 将dto普通对象转为实例

  await app.listen(3001);
}
bootstrap();
