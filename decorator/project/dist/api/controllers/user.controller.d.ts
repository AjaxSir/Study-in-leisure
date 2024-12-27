import { UserService } from 'src/shared/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/createUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../../shared/entities/User").User[]>;
    createUser(createUserDto: CreateUserDto): Promise<import("../../shared/entities/User").User | ({
        id?: number;
        username?: string;
        password?: string;
        createdAt?: import("typeorm").DeepPartial<Date>;
        updatedAt?: import("typeorm").DeepPartial<Date>;
        deletedAt?: import("typeorm").DeepPartial<Date>;
        isActive?: import("typeorm").DeepPartial<boolean>;
        email?: string;
        role?: string;
        money?: number;
    } & import("../../shared/entities/User").User)>;
    findOneById(id: number): Promise<import("../../shared/entities/User").User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateUserBatch(updateUserDto: UpdateUserDto): Promise<import("typeorm").DeepPartial<import("../../shared/entities/User").User> & import("../../shared/entities/User").User>;
}
