/*
 * @Date: 2024-12-26 15:42:14
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-26 16:52:55
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AdminModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
