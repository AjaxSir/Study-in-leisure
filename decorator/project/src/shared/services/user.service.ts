import { Injectable } from '@nestjs/common'
import { MySqlBaseService } from './mysql-base.service';
import { User } from '../entities/User'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService extends MySqlBaseService<User> {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {
     super(user)
    }
}