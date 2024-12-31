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
exports.IsUserNameUniqueConstructor = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
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
let userRepository = null;
let IsUserNameUniqueConstructor = class IsUserNameUniqueConstructor {
    constructor(user) {
        this.user = user;
        this.validate = async (value, validationArguments) => {
            const result = await userRepository.findOne({
                where: {
                    username: value.toLowerCase(),
                }
            });
            return !result;
        };
        userRepository = userRepository ? userRepository : this.user;
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
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IsUserNameUniqueConstructor);
//# sourceMappingURL=user-validator.js.map