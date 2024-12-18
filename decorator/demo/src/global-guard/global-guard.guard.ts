/*
 * @Date: 2024-04-29 14:26:56
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 17:42:55
 * @Description: 守卫用于授权和认证检查。它们在处理请求之前检查当前用户是否有权限执行特定的操作。
 * 守卫可以基于请求的上下文（如用户身份）来决定是否继续处理请求。如果守卫返回 false 或抛出异常，请求将会被终止。
执行顺序：守卫在中间件之后、管道和拦截器之前执行。它们先于管道和拦截器执行，决定请求是否可以继续。
使用场景：例如：权限验证、用户认证等。
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
@Injectable()
export class GlobalGuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler())
    const request = context.switchToHttp().getRequest<Request>()
    const userRole = request.body;
    console.log(userRole, 'userRole', roles)
    
    // return roles.includes(userRole.role);
    return true
  }
}
