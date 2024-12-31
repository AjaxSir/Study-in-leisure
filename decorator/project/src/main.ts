/*
 * @Date: 2024-12-26 15:42:14
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 17:25:16
 * @Description: 
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
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

  // 配置swagger
  const options = new DocumentBuilder()
  .setTitle('cms api')
  .addTag('cms')
  .setDescription('cms api 接口文档')
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs-api', app, document)

  await app.listen(3001);
}
bootstrap();
