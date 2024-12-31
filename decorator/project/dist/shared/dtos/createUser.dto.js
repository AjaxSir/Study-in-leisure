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
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const user_validator_1 = require("../validator/user-validator");
const nestjs_i18n_1 = require("nestjs-i18n");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.Validate)(user_validator_1.IsUserNameUniqueConstructor),
    (0, swagger_1.ApiProperty)({ name: 'username', default: 'nick' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    PasswordValidator(),
    (0, swagger_1.ApiProperty)({ name: 'password', default: '124' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.required', { field: 'email' }) }),
    (0, swagger_1.ApiProperty)({ name: 'email', default: '123@qq.com' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    MoneyValidator(),
    (0, swagger_1.ApiProperty)({ name: 'money', default: 10 }),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "money", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['admin', 'vistor']),
    (0, swagger_1.ApiProperty)({ name: 'role', default: 'vistor' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
class UpdateUserDto extends (0, swagger_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', default: 'vistor' }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
function PasswordValidator() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(6, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.minLength', { field: 'password', minLength: 6 }) }), (0, class_validator_1.MaxLength)(8, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.maxLength', { field: 'password', maxLength: 8 }) }));
}
function MoneyValidator() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(() => Number));
}
//# sourceMappingURL=createUser.dto.js.map