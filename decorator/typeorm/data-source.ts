/*
 * @Date: 2024-12-25 10:00:41
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-25 17:01:49
 * @Description: 
 */
import { DataSource } from 'typeorm';
import {User} from './entity/User'
import {Profile} from './entity/Profile'
import { Order } from './entity/Order';
import { Role } from './entity/Role';
import { Category } from './entity/Category'
import {
    MYSQL_HOST,
    MYSQL_HOST_PORT,
    MYSQL_HOST_USER,
    MYSQL_HOST_PASSWORD,
    MYSQL_DATABASE_NAME,
} from './config'
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: MYSQL_HOST,
    port: +MYSQL_HOST_PORT,
    username: MYSQL_HOST_USER,
    password: MYSQL_HOST_PASSWORD,
    database: MYSQL_DATABASE_NAME,
    entities: [User, Role, Category],
    synchronize: true, // Automatically synchronize the database schema with your entities.
    logging: true
})