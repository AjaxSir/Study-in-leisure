/*
 * @Date: 2024-12-10 17:52:11
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 15:00:57
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Req, Res, Session, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as Captcha from 'svg-captcha'
import { ListService } from '../list/list.service'
import { Role } from '../global-guard/role/role.decorator'
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly listService: ListService,
    @Inject('ccc') private readonly c: string) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res, @Session() session){
    const captcha = Captcha.create({
      size: 4,
      width: 100,
      height: 34,
      background: '#f5f5f5',
      noise: 2,
      color: true,
      ignoreChars: '0o1i',
    })

    session.code = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
  
  @Get()
  // @Role('admin')
  useListService() {
    return this.c
  }

  @Post('login')
  login(@Body() body: { code: string, name: string, pwd: string }, @Res() res, @Session() session: { code:string }) {
    console.log(body, session.code)
    const { code } = session
    if (body.code.toLocaleLowerCase() === code.toLocaleLowerCase()) {
      return res.status(200).json({
        success: true,
        message: 'Login successful'
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Verification code error'
      })
    }
  }
}
