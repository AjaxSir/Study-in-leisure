import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto';
import { I18nContext } from 'nestjs-i18n';
import { User } from 'src/shared/entities/User';
import { UtilityService } from 'src/utils/utility.service';
export declare class UserController {
    private readonly userService;
    private readonly utilService;
    constructor(userService: UserService, utilService: UtilityService);
    findAll(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findOneById(id: number, i18n: I18nContext): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateUserBatch(updateUserDto: UpdateUserDto): Promise<import("typeorm").DeepPartial<User> & User>;
}
