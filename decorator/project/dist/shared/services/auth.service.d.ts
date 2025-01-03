import { UserService } from 'src/shared/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';
import { UtilityService } from 'src/utils/utility.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly utilityService;
    private readonly userService;
    constructor(jwtService: JwtService, utilityService: UtilityService, userService: UserService);
    signIn(loginDto: LoginDto): Promise<{
        access_token: string;
        message?: undefined;
    } | {
        message: string;
        access_token?: undefined;
    }>;
}
