/*
 * @Date: 2024-12-26 16:53:44
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 15:00:46
 * @Description: 
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/shared/services/user.service';

@Controller('admin/user')
@ApiTags('admin/users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async findAll() {
        const result = await this.userService.findAll()
        return result
    }
}
