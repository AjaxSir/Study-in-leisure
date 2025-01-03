import { ApiProperty } from '@nestjs/swagger'
export class LoginDto {
    @ApiProperty({
        default: 'nick',
        description: "用户名"
    })
    username: string;
    
    @ApiProperty({
        default: 'password',
        description: "密码"
    })
    password: string;
}