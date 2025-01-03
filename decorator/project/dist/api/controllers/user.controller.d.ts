import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto';
import { I18nContext } from 'nestjs-i18n';
import { User } from 'src/shared/entities/User';
import { UtilityService } from 'src/utils/utility.service';
import { LoginDto } from 'src/shared/dtos/login.dto';
import { AuthService } from 'src/shared/services/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly utilService;
    private readonly authService;
    constructor(userService: UserService, utilService: UtilityService, authService: AuthService);
    findAll(): Promise<User[]>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        message?: undefined;
    } | {
        message: string;
        access_token?: undefined;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findOneById(id: number, i18n: I18nContext): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateUserBatch(updateUserDto: UpdateUserDto): Promise<import("typeorm").DeepPartial<User> & User>;
}
