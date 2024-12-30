/*
 * @Date: 2024-12-26 16:14:59
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-30 15:57:53
 * @Description: 
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ConfiguareService } from './services/configuare.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './services/user.service'
import { MySqlBaseService } from './services/mysql-base.service'
import { User } from  '../shared/entities/User'
import { IsUserNameUniqueConstructor } from './validator/user-validator' 
@Global()
@Module({
    
    imports: [
        // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        ConfigModule.forRoot({isGlobal: true,}),
        TypeOrmModule.forRootAsync({
            inject: [ConfiguareService],
            useFactory: (configService: ConfiguareService) => {
                return {
                    type: 'mysql',
                    ...configService.config, 
                    // autoLoadEntities: true,
                    entities: [__dirname + '/**/entities/*{.ts,.js}'],
                    synchronize: true, // 自动同步数据库表
                    logging: true, // 开启 SQL 执行的日志
    
                }
            }
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [ConfiguareService, UserService, IsUserNameUniqueConstructor],
    exports: [ConfiguareService, UserService, IsUserNameUniqueConstructor],
})
export class SharedModule { }
