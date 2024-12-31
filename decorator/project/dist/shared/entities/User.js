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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
let User = class User {
    get contract() {
        return `联系方式: ${this.email}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ name: 'id', default: '124' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ name: 'username', default: '124' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiProperty)({ name: 'password', default: '124' }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ name: 'createdAt', default: '2024年12月30日15:14:20' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'contract', description: "联系方式" }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], User.prototype, "contract", null);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ name: 'updatedAt', default: '2024年12月30日15:14:20' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)({ name: 'deletedAt', default: '2024年12月30日15:14:20' }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true }),
    (0, swagger_1.ApiProperty)({ name: 'isActive', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    (0, swagger_1.ApiProperty)({ name: 'email', default: '1234@qq.com' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['admin', 'mannager', 'user', 'vistor'], default: "vistor" }),
    (0, swagger_1.ApiProperty)({ name: 'role', default: 'vistor' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, default: 10 }),
    (0, swagger_1.ApiProperty)({ name: 'money', default: 10 }),
    (0, class_transformer_1.Transform)(({ value }) => value ? value.toLocaleString('en-US') : value),
    __metadata("design:type", Number)
], User.prototype, "money", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'project_user'
    })
], User);
//# sourceMappingURL=User.js.map