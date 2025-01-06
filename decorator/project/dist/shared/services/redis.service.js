"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const configuare_service_1 = require("./configuare.service");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor(configuareService) {
        this.configuareService = configuareService;
        this.redisClient = new ioredis_1.default({
            host: this.configuareService.RedisHost,
            port: this.configuareService.RedisPort,
            password: this.configuareService.RedisPassword,
        });
    }
    onModuleDestroy() {
        this.redisClient.quit();
    }
    async get(key) {
        return await this.redisClient.get(key);
    }
    getClient() {
        return this.redisClient;
    }
    async set(key, value, expiresIn) {
        if (expiresIn) {
            await this.redisClient.set(key, value, 'EX', expiresIn);
        }
        else {
            await this.redisClient.set(key, value);
        }
    }
    async del(key) {
        await this.redisClient.del(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuare_service_1.ConfiguareService])
], RedisService);
//# sourceMappingURL=redis.service.js.map