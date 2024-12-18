/*
 * @Date: 2024-12-10 17:48:47
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-11 15:15:38
 * @Description: 
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('ABC') private readonly appService: AppService,
    @Inject('BBB') private readonly b: string,
    @Inject('ccc') private readonly c: string,

    ) {}

  @Get()
  getHello(): string {
    return this.b
  }
}
