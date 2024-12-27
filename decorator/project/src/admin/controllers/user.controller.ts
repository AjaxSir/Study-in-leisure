/*
 * @Date: 2024-12-26 16:53:44
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-26 17:07:41
 * @Description: 
 */
import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/shared/services/user.service';

@Controller('admin/user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async findAll() {
        const result = await this.userService.findAll()
        return result
    }
}
