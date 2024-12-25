import { DataSource } from 'typeorm';
import {User} from './entity/User'
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '47.113.199.106',
    port: 3306,
    username: 'remote',
    password: '123456',
    database: 'nest',
    entities: [User],
    synchronize: true, // Automatically synchronize the database schema with your entities.
    logging: true
})