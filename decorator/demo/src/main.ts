/*
 * @Date: 2024-12-10 17:48:47
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 15:58:00
 * @Description: 程序主入口
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe, BadRequestException } from '@nestjs/common'
import * as session from 'express-session'
import { globalMiddleware } from './middleware'
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { Response } from './interceptor/response'
import { GlobalErrorFilter } from './interceptor/filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 开启版本控制
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.useStaticAssets(join(__dirname, './images'), {
    prefix: '/images'
  })
  app.use(cors())
  app.use(globalMiddleware)
  // app.useGlobalInterceptors(new Response())

  const options = new DocumentBuilder().addBearerAuth().setTitle('demo').setDescription("nestjs 接口测试").build()
  const document = SwaggerModule.createDocument(app,  options)
  SwaggerModule.setup('/api-docs', app, document)
  
  app.use(session({
    name: 'sxl.sid',secret: 'sxl',
    rolling: true,
    cookie: {
      maxAge: null // 负数则表示仅限当前会话关闭浏览器则消失
    }
  }))

  app.useGlobalPipes(new ValidationPipe()) // 全部pipe验证

  app.useGlobalFilters(new GlobalErrorFilter())
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
// 执行顺序
// 中间件：最先执行，处理请求的预处理逻辑（如日志、授权等）。
// 守卫：检查请求是否允许继续进行（如权限验证、认证等）。
// 管道：验证和转换请求数据。
// 拦截器：在请求处理前后可以做进一步的处理（如缓存、日志、性能分析等）。
// 路由处理程序：实际处理请求并返回响应。
// 过滤器：处理请求过程中抛出的异常，并返回统一的错误响应。