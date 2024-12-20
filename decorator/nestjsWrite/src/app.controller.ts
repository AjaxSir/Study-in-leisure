/*
 * @Date: 2024-12-19 11:04:21
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-19 15:54:19
 * @Description: 
 */
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
    @Get('cats')
    index() {
        return 'Hello World!'
    }
}