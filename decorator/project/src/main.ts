import { I18n } from 'nestjs-i18n';
/*
 * @Date: 2024-12-26 15:42:14
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-31 17:18:31
 * @Description: 
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n'
import { useContainer } from 'class-validator'
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
  // 自定义验证器注入容器
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  // app.useGlobalPipes(new ValidationPipe({ transform: true })) // 将dto普通对象转为实例
  app.useGlobalPipes(new I18nValidationPipe({ transform: true })) // }))
  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: true })) // 自定义的过滤器则需要自己去调用i18n 翻译
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
