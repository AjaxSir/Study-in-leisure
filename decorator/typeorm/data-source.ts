/*
 * @Date: 2024-12-25 10:00:41
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-25 14:20:12
 * @Description: 
 */
import { DataSource } from 'typeorm';
import {User} from './entity/User'
import {Profile} from './entity/Profile'
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '47.113.199.106',
    port: 3306,
    username: 'remote',
    password: '123456',
    database: 'nest',
    entities: [User, Profile],
    synchronize: true, // Automatically synchronize the database schema with your entities.
    logging: true
})