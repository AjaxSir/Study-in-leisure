/*
 * @Date: 2024-12-19 11:04:21
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-20 11:23:34
 * @Description: 
 */
import { Controller, Get, Request, Req } from '@nestjs/common'

@Controller()
export class AppController {
    @Get('cats')
    index(@Request() req, age: number, @Req() req1) {
        console.log(req.url, req1.method, 'age=========', age)
        return 'Hello World!'
    }
}