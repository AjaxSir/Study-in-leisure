/*
 * @Date: 2024-12-19 10:55:13
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-19 11:47:23
 * @Description: 
 */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.moddlue'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}

bootstrap();