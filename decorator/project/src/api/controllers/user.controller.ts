/*
 * @Date: 2024-12-27 14:52:37
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 16:26:15
 * @Description: 
 */
import { Controller, Post, Get, Body, ParseIntPipe, Param, Put, Patch, HttpStatus, applyDecorators, UseInterceptors, ClassSerializerInterceptor, HttpException, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n'
import { User } from 'src/shared/entities/User';
import { UnifyExceptionFilter } from 'src/filter/unify-exception.filter';
import { UtilityService } from 'src/utils/utility.service';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from 'src/shared/dtos/login.dto';
import { AuthService } from 'src/shared/services/auth.service';
import { Public } from 'src/guard/constant'
@Controller('api/user')
@ApiTags('api/users')
@UseFilters(UnifyExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor) // 响应拦截
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly utilService: UtilityService,
        private readonly authService: AuthService
        ) {

    }
    @ApiResponse({ status: 200, type: [User] })
    @ApiOperation({
        summary: '获取全部用户列表',
        description: "获取全部用户列表"
    })
    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    @ApiOperation({
        description: "用户登录",
        summary: "用户登录"
    })
    
    @Public()
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.signIn(loginDto)
    }

    @Post()
    @ApiResponse({ status: 201, type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "参数错误" })
    @ApiOperation({
        description: "创建用户",
        summary: "创建用户"
    })
    async createUser(@Body() createUserDto: CreateUserDto) {
        if (createUserDto.password) {
            createUserDto.password = await this.utilService.hashField(createUserDto.password);
        }
        console.log(createUserDto, 'createUserDto')
        return await this.userService.create(createUserDto)
    }

    @FindOne()
    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number, @I18n() i18n:I18nContext) {
        console.log(id, 'id')
        const result = await this.userService.findOne({ where: { id } });
        if (!result) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return result
        // return `${i18n.t('user.hello', {args: { username: result.username } })} - ${result.username}`
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