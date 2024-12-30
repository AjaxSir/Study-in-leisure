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
exports.UpdateUserDto = exports.CreateUserDto = exports.IsUserNameUniqueConstructor = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
let StartWithConstructor = class StartWithConstructor {
    validate(value, validationArguments) {
        return value.startsWith('user_');
    }
    defaultMessage(validationArguments) {
        return 'username must start with user_';
    }
};
StartWithConstructor = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "usernameStartWith", async: false })
], StartWithConstructor);
function startWith(prefix, options) {
    return (target, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: target.constructor,
            propertyName: propertyName,
            options: options,
            validator: {
                validate: (value) => value.startsWith(prefix),
                defaultMessage: (validationArguments) => `${propertyName} must start with ${prefix}`
            }
        });
    };
}
let IsUserNameUniqueConstructor = class IsUserNameUniqueConstructor {
    constructor(user) {
        this.user = user;
    }
    async validate(value, validationArguments) {
        const result = await this.user.findOne({
            where: {
                username: value.toLowerCase(),
            }
        });
        console.log('IsUserNameUniqueConstructor', result);
        return !result;
    }
    defaultMessage(validationArguments) {
        const { property, value } = validationArguments;
        return `${property} ${value} is already taken!`;
    }
};
exports.IsUserNameUniqueConstructor = IsUserNameUniqueConstructor;
exports.IsUserNameUniqueConstructor = IsUserNameUniqueConstructor = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "IsUserNameUniqueConstructor", async: true }),
    __param(0, (0, typeorm_2.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], IsUserNameUniqueConstructor);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.Validate)(IsUserNameUniqueConstructor),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    PasswordValidator(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    MoneyValidator(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "money", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['admin', 'vistor']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
class UpdateUserDto extends CreateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
function PasswordValidator() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(6), (0, class_validator_1.MaxLength)(20));
}
function MoneyValidator() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(() => Number));
}
//# sourceMappingURL=createUser.dto.js.map