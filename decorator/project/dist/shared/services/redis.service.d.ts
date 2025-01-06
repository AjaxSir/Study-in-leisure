import { ConfiguareService } from './configuare.service';
import { OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly configuareService;
    redisClient: Redis;
    constructor(configuareService: ConfiguareService);
    onModuleDestroy(): void;
    get(key: string): Promise<any>;
    getClient(): Redis;
    set(key: string, value: string, expiresIn?: number): Promise<void>;
    del(key: string): Promise<void>;
}
