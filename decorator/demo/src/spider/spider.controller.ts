/*
 * @Date: 2024-12-12 17:08:53
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-13 10:06:31
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpiderService } from './spider.service';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Post()
  create(@Body() createSpiderDto: CreateSpiderDto) {
    return this.spiderService.create(createSpiderDto);
  }

  @Get()
  findAll() {
    return this.spiderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spiderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpiderDto: UpdateSpiderDto) {
    return this.spiderService.update(+id, updateSpiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spiderService.remove(+id);
  }
}
