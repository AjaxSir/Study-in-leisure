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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../shared/services/user.service");
const createUser_dto_1 = require("../../shared/dtos/createUser.dto");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const User_1 = require("../../shared/entities/User");
const unify_exception_filter_1 = require("../../filter/unify-exception.filter");
const utility_service_1 = require("../../utils/utility.service");
const login_dto_1 = require("../../shared/dtos/login.dto");
const auth_service_1 = require("../../shared/services/auth.service");
const constant_1 = require("../../guard/constant");
const redis_service_1 = require("./../../shared/services/redis.service");
let UserController = class UserController {
    constructor(userService, utilService, authService, redisService) {
        this.userService = userService;
        this.utilService = utilService;
        this.authService = authService;
        this.redisService = redisService;
    }
    async findAll() {
        return await this.userService.findAll();
    }
    async login(loginDto, req) {
        const { user, access_token } = await this.authService.signIn(loginDto);
        if (user) {
            this.redisService.set(`user-${user.id}`, JSON.stringify(user));
            req.session.userId = user.id;
            return { user, access_token };
        }
        else {
            return {
                message: '用户名或密码错误'
            };
        }
    }
    async createUser(createUserDto) {
        if (createUserDto.password) {
            createUserDto.password = await this.utilService.hashField(createUserDto.password);
        }
        console.log(createUserDto, 'createUserDto');
        return await this.userService.create(createUserDto);
    }
    async findOneById(id, i18n) {
        console.log(id, 'id');
        const result = await this.userService.findOne({ where: { id } });
        if (!result) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async updateUser(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    async updateUserBatch(updateUserDto) {
        return this.userService.update_1(updateUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: [User_1.User] }),
    (0, swagger_1.ApiOperation)({
        summary: '获取全部用户列表',
        description: "获取全部用户列表"
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: "用户登录",
        summary: "用户登录"
    }),
    (0, constant_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, type: User_1.User }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "参数错误" }),
    (0, swagger_1.ApiOperation)({
        description: "创建用户",
        summary: "创建用户"
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    FindOne(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, nestjs_i18n_1.I18n)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nestjs_i18n_1.I18nContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({
        description: "更新用户",
        summary: "更新用户"
    }),
    (0, swagger_1.ApiBody)({ type: createUser_dto_1.UpdateUserDto, description: "更新用户,id必传" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserBatch", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('api/users'),
    (0, common_1.UseFilters)(unify_exception_filter_1.UnifyExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService,
        utility_service_1.UtilityService,
        auth_service_1.AuthService,
        redis_service_1.RedisService])
], UserController);
function FindOne() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({ status: 201, type: User_1.User }), (0, swagger_1.ApiParam)({ name: 'id', description: "用户id" }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: "参数错误", type: User_1.User }), (0, swagger_1.ApiOperation)({
        description: "通过id查询用户",
        summary: "通过id查询用户"
    }));
}
//# sourceMappingURL=user.controller.js.map