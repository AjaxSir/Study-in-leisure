import { plainToInstance } from 'class-transformer';
/*
 * @Date: 2024-12-27 11:23:06
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-31 17:24:04
 * @Description: 
 */
import { Injectable, Get } from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
@Injectable()
export abstract class MySqlBaseService<T> {
    constructor(protected readonly repository: Repository<T>) {}
    
    async findAll() {
        const users = await this.repository.find()
        return users
    }

    async create(createDto: DeepPartial<T>) {
        const ins = await this.repository.create(createDto)
        const result = await this.repository.save(ins)
        // const result = await this.repository.save(createDto) 这样不会经过ClassSerializerInterceptor处理 需要自行修改
        // plainToInstance(User, result) 这样就会处理
        return result
    }

    async findOne(options: FindOneOptions<T>) {
        return await this.repository.findOne(options);
    }

    async update(id: number , updateDt0: QueryDeepPartialEntity<T>) {
        return await this.repository.update(id, updateDt0)
    }

    async update_1(updateDto: DeepPartial<T>) {
        return await this.repository.save(updateDto)
    }

}