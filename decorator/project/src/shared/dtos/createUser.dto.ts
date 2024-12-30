import { IsString, MinLength, MaxLength, IsEmail, IsBoolean,
 IsNotIn, 
 IsNumber,
 IsPositive,
 IsIn,
 ValidatorConstraintInterface,
 ValidationArguments,
 Validate,
 ValidatorConstraint,
 ValidationOptions,
 registerDecorator} from 'class-validator';
import { applyDecorators, Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';

@Injectable()
@ValidatorConstraint({ name: "usernameStartWith", async: false }) // 
class StartWithConstructor implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        
        return value.startsWith('user_');
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
       return 'username must start with user_'
    }
    
}
// 可以给参数验证器传参数
function startWith(prefix: string, options?: ValidationOptions) {
    return (target, propertyName) => {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: options,
            validator: {
                validate: (value: any) => value.startsWith(prefix),
                defaultMessage: (validationArguments?: ValidationArguments) => `${propertyName} must start with ${prefix}`
            }
        })
    }
}

@Injectable()
@ValidatorConstraint({ name: "IsUserNameUniqueConstructor", async: true }) // 
export class IsUserNameUniqueConstructor implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private readonly user: Repository<User> ) {

    }
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const result = await this.user.findOne({
            where: {
                username: value.toLowerCase(),
            }
        })
        console.log('IsUserNameUniqueConstructor', result)
        return !result
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const { property, value }  = validationArguments
       return `${property} ${value} is already taken!`
    }
    
}

export class CreateUserDto {

    @IsString()
    @MinLength(2)
    // @Validate(StartWithConstructor)
    // @startWith('user_')
    @Validate(IsUserNameUniqueConstructor)
    username: string

    @PasswordValidator()
    password: string

    @IsEmail()
    email: string

    @MoneyValidator()
    money: number

    @IsIn(['admin', 'vistor'])
    role: string
}

export class UpdateUserDto extends CreateUserDto {
    id: number
}

function PasswordValidator () {
    return applyDecorators(
        IsString(),
        MinLength(6),
        MaxLength(20)
    );
}

function MoneyValidator () {
    return applyDecorators(
        IsNumber(),
        IsPositive(), // 正整数
        Type(() => Number) // 强制类型转换 
    );
}