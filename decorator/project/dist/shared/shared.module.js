"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuare_service_1 = require("./services/configuare.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./services/user.service");
const User_1 = require("../shared/entities/User");
const user_validator_1 = require("./validator/user-validator");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [configuare_service_1.ConfiguareService],
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        ...configService.config,
                        entities: [__dirname + '/**/entities/*{.ts,.js}'],
                        synchronize: true,
                        logging: true,
                    };
                }
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User])
        ],
        providers: [configuare_service_1.ConfiguareService, user_service_1.UserService, user_validator_1.IsUserNameUniqueConstructor],
        exports: [configuare_service_1.ConfiguareService, user_service_1.UserService, user_validator_1.IsUserNameUniqueConstructor],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map