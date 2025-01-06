import { ConfiguareService } from './configuare.service';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis'
@Injectable()
export class RedisService implements OnModuleDestroy {
    redisClient: Redis
    constructor(
        private readonly configuareService: ConfiguareService,
    ) {
        this.redisClient = new Redis({
            host: this.configuareService.RedisHost,
            port: this.configuareService.RedisPort,
            password: this.configuareService.RedisPassword,
        })
    }
    onModuleDestroy() {
        this.redisClient.quit()
    }
    async get(key: string): Promise<any> {
        return await this.redisClient.get(key)
    }

    getClient(): Redis {
        return this.redisClient
    }

    async set(key: string, value: string, expiresIn?: number): Promise<void> {
        if (expiresIn) {
            await this.redisClient.set(key, value, 'EX', expiresIn)
        } else {
            await this.redisClient.set(key, value)
        }

    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key)
    }
}
