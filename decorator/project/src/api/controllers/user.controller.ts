/*
 * @Date: 2024-12-27 14:52:37
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-27 16:12:52
 * @Description: 
 */
import { Controller, Post, Get, Body, ParseIntPipe, Param, Put, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto'
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService){

    }

    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto, 'createUserDto')
        return  this.userService.create(createUserDto)
    }

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        console.log(id, 'id')
        return this.userService.findOne({ where: { id }});
    }

    @Put(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Patch()
    async updateUserBatch(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update_1(updateUserDto);
    }
}
