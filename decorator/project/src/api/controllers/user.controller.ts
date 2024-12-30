/*
 * @Date: 2024-12-27 14:52:37
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 15:31:59
 * @Description: 
 */
import { Controller, Post, Get, Body, ParseIntPipe, Param, Put, Patch, HttpStatus, applyDecorators, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/entities/User';
@Controller('api/user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @ApiResponse({ status: 200, type: [User] })
    @ApiOperation({
        summary: '获取全部用户列表',
        description: "获取全部用户列表"
    })
    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Post()
    @ApiResponse({ status: 201, type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "参数错误" })
    @ApiOperation({
        description: "创建用户",
        summary: "创建用户"
    })
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto, 'createUserDto')
        return this.userService.create(createUserDto)
    }

    @FindOne()
    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        console.log(id, 'id')
        return this.userService.findOne({ where: { id } });
    }

    @Put(":id")
    @ApiOperation({
        description: "更新用户",
        summary: "更新用户"
    })
    @ApiBody({ type: UpdateUserDto, description: "更新用户,id必传" })
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Patch()
    async updateUserBatch(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update_1(updateUserDto);
    }
}

function FindOne() {
    return applyDecorators(ApiResponse({ status: 201, type: User }),
        ApiParam({ name: 'id', description: "用户id" }),
        ApiResponse({ status: HttpStatus.NOT_FOUND, description: "参数错误", type: User }),
        ApiOperation({
            description: "通过id查询用户",
            summary: "通过id查询用户"
        }))
}