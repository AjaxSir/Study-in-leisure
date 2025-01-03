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
exports.AuthService = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utility_service_1 = require("../../utils/utility.service");
let AuthService = class AuthService {
    constructor(jwtService, utilityService, userService) {
        this.jwtService = jwtService;
        this.utilityService = utilityService;
        this.userService = userService;
    }
    async signIn(loginDto) {
        const { username, password } = loginDto;
        const user = await this.userService.findOne({ where: { username } });
        if (this.utilityService.compareField(user.password, password)) {
            const payload = { username, email: user.email };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return {
            message: 'Invalid credentials',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        utility_service_1.UtilityService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map