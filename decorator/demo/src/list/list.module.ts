/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 11:28:35
 * @Description: 
 */
import { Global, Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './entities/list.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tags } from './entities/tags.entity'
console.log('List nestjs')

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([List, Tags])],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
