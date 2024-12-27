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
        const result = await this.repository.save(createDto)
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