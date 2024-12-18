/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 14:57:10
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, SetMetadata } from '@nestjs/common';
import { ParseIntPipe,
ParseFloatPipe,
ParseArrayPipe,
ValidationPipe, // createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto)
ParseBoolPipe,
ParseEnumPipe,
DefaultValuePipe,
ParseUUIDPipe
 } from '@nestjs/common'
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {Status} from './enum' 
import { ListPipe } from './list.pipe' 
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam, ApiOperation } from '@nestjs/swagger'
@Controller({
  path: 'list',
  version: '1'
})
@ApiBearerAuth()
@ApiTags('用户列表')
export class ListController {
  constructor(private readonly listService: ListService
    ) {}

    // create(@Body(ValidationPipe) createListDto: CreateListDto) {
    // create(@Body(ListPipe) createListDto: CreateListDto) {
  @Post()
  // @ApiBody({
  //   description: '创建一个新的列表',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type:'string' },
  //       content: { type:'string' },
  //       status: { type: 'number' },
  //     },
  //     required: ['title', 'content','status'],
  //   }
    
  // })
  @SetMetadata('role', ['admin'])
  @ApiOperation({ summary: '创建一个新的列表', description: '创建一个新的列表' })
  // create(@Body() createListDto: CreateListDto) {
  create(@Body() data) {
    return this.listService.create(data);
  }

  @Post('all')
  getList(@Body() data: { keyword: string, page: number, pageSize: number}) {
    return this.listService.getList(data);
  }
  @Post('add/tags')
  addTags(@Body() data: { id : number, tags: string[]}) {
    return this.listService.addTags(data);
  }
  @Get()
  findAll(@Query('status', new DefaultValuePipe(Status.Activity), new ParseEnumPipe(Status)) status:Status) {
    console.log(status, 'status1')
    return this.listService.findAll(status);
  }

  @Post('transformCount')
  transForm(@Body() data: { fromId: number, toId: number, counts: number}) {
    console.log(data, 'transformCount=================')
    return this.listService.transForm(data)
  }

  @Get(':id') // 将string 转为 number
  @ApiParam({
    name: 'id',
    description: '列表id',
    type: 'integer',
    required: true,
    format: 'int64', // 格式是int64
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id, id)
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
