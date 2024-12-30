import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto';
import { User } from 'src/shared/entities/User';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User | ({
        id?: number;
        username?: string;
        password?: string;
        createdAt?: import("typeorm").DeepPartial<Date>;
        readonly contract?: string;
        updatedAt?: import("typeorm").DeepPartial<Date>;
        deletedAt?: import("typeorm").DeepPartial<Date>;
        isActive?: import("typeorm").DeepPartial<boolean>;
        email?: string;
        role?: string;
        money?: number;
    } & User)>;
    findOneById(id: number): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateUserBatch(updateUserDto: UpdateUserDto): Promise<import("typeorm").DeepPartial<User> & User>;
}
