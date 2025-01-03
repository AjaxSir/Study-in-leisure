/*
 * @Date: 2025-01-03 15:57:11
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 16:25:43
 * @Description: 
 */
import { UserService } from 'src/shared/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from '../dtos/login.dto'
import { UtilityService } from 'src/utils/utility.service';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly utilityService: UtilityService,
        private readonly userService: UserService) {}

    async signIn(loginDto: LoginDto){
        const { username, password } = loginDto
        const user = await this.userService.findOne({ where: { username } });
        if (this.utilityService.compareField(user.password, password)) {
            const payload = { username, email: user.email };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return {
            message: 'Invalid credentials',
        }
        
    }
}
