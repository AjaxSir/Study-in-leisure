import { UserService } from 'src/shared/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../../shared/entities/User").User[]>;
}
