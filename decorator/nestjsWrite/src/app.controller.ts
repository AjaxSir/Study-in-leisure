/*
 * @Date: 2024-12-19 11:04:21
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-23 11:22:49
 * @Description: 
 */
import {
    Controller,
    Get, Post,
    Request, Req, Query, Headers, Sessions, Ip, Param, Body
} from '@nestjs/common'

@Controller()
export class AppController {
    @Get('cats')
    index(@Request() req, age: number, @Req() req1) {
        console.log(req.url, req1.method, 'age=========', age)
        return 'Hello World!'
    }
    @Get('query')
    handleQuery(@Query() query: any, @Query('id') id: string) {
        return `${JSON.stringify(query)}\n ${JSON.stringify(id)}`
    }

    @Get('headers')
    handleHeaders(@Headers() headers, @Headers('accept') accept) {
        console.log(headers,)
        return `${JSON.stringify(headers)}\n ${JSON.stringify(accept)}`
    }

    @Get('sessions')
    handleSessions(@Sessions() sessions, @Sessions('pageView') pageView: string) {
        if (sessions.pageView) {
            sessions.pageView += 1
        } else {
            sessions.pageView = 1
        }
        return `${pageView}`
    }
    @Get('ip')
    getIp(@Ip() ip: string) {
        return ip;
    }

    @Get(':name/info/:age')
    getParam(@Param() param: any, @Param('name') name: string, @Param('age') age: number) {
        console.log(`param`, param)
        console.log(`name`, name)
        console.log(`age`, age)
        return `${name} is ${age} years old`;
    }

    @Get('ab*cd')
    handleWildCard() {
        return 'handleWildCard'
    }

    @Post('create')
    createUser(@Body() user: any, @Body('name') name: string, @Body('age') age: number) {
        console.log(`user`, user)
        console.log(`name`, name)
        console.log(`age`, age)
        return `${name} is ${age} years old`;

    }
}