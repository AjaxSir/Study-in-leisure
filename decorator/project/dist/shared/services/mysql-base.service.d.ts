import { FindOneOptions, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare abstract class MySqlBaseService<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    findAll(): Promise<T[]>;
    create(createDto: DeepPartial<T>): Promise<Awaited<T> & T>;
    findOne(options: FindOneOptions<T>): Promise<T>;
    update(id: number, updateDt0: QueryDeepPartialEntity<T>): Promise<import("typeorm").UpdateResult>;
    update_1(updateDto: DeepPartial<T>): Promise<DeepPartial<T> & T>;
}
