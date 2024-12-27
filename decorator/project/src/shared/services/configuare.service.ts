/*
 * @Date: 2024-12-26 16:42:34
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-26 17:41:51
 * @Description: 
 */
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class ConfiguareService {
    constructor(private readonly configService: ConfigService) {}

    get host(): string {
        return this.configService.get('MYSQL_HOST');
    }
    get port(): number {
        return this.configService.get('MYSQL_PORT');
    }

    get username(): string {
        return this.configService.get('MYSQL_USERNAME');
    }

    get password(): string {
        return this.configService.get('MYSQL_PASSWORD');
    }

    get database(): string {
        return this.configService.get('MYSQL_DATABASE');
    }

    get config() {
        return {
            host: this.host,
            port: +this.port,
            username: this.username,
            password: this.password,
            database: this.database,
        }
    }
}
