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
exports.ConfiguareService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfiguareService = class ConfiguareService {
    constructor(configService) {
        this.configService = configService;
    }
    get host() {
        return this.configService.get('MYSQL_HOST');
    }
    get port() {
        return this.configService.get('MYSQL_PORT');
    }
    get username() {
        return this.configService.get('MYSQL_USERNAME');
    }
    get password() {
        return this.configService.get('MYSQL_PASSWORD');
    }
    get database() {
        return this.configService.get('MYSQL_DATABASE');
    }
    get config() {
        return {
            host: this.host,
            port: +this.port,
            username: this.username,
            password: this.password,
            database: this.database,
        };
    }
    get RedisHost() {
        return this.configService.get('REDIS_HOST');
    }
    get RedisPort() {
        return this.configService.get('REDIS_PORT');
    }
    get RedisPassword() {
        return this.configService.get('REDIS_PASSWORD');
    }
    get RedisConig() {
        return {
            host: this.RedisHost,
            port: +this.RedisPort,
            password: this.RedisPassword,
        };
    }
};
exports.ConfiguareService = ConfiguareService;
exports.ConfiguareService = ConfiguareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfiguareService);
//# sourceMappingURL=configuare.service.js.map