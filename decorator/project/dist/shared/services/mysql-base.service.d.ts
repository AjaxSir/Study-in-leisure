import { FindOneOptions, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare abstract class MySqlBaseService<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    findAll(): Promise<T[]>;
    create(createDto: DeepPartial<T>): Promise<T | ((T extends (infer U)[] ? DeepPartial<U>[] : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer M> ? Set<DeepPartial<M>> : T extends object ? { [K_1 in keyof T]?: DeepPartial<T[K_1]>; } : T) & T)>;
    findOne(options: FindOneOptions<T>): Promise<T>;
    update(id: number, updateDt0: QueryDeepPartialEntity<T>): Promise<import("typeorm").UpdateResult>;
    update_1(updateDto: DeepPartial<T>): Promise<DeepPartial<T> & T>;
}
