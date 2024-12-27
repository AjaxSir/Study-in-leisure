import { MySqlBaseService } from './mysql-base.service';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
export declare class UserService extends MySqlBaseService<User> {
    private readonly user;
    constructor(user: Repository<User>);
}
