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
 registerDecorator, 
 IsNotEmpty} from 'class-validator';
import { applyDecorators, Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsUserNameUniqueConstructor } from '../validator/user-validator'
import { i18nValidationMessage }  from 'nestjs-i18n'

export class CreateUserDto {

    @IsString()
    @MinLength(2)
    // @Validate(StartWithConstructor)
    // @startWith('user_')
    @Validate(IsUserNameUniqueConstructor)
    @ApiProperty({ name: 'username', default: 'nick' })
    username: string

    @PasswordValidator()
    @ApiProperty({ name: 'password', default: '124' })
    password: string

    @IsEmail()
    @IsNotEmpty({ message: i18nValidationMessage('validation.required', { field: 'email' }) })
    @ApiProperty({ name: 'email', default: '123@qq.com' })
    email: string

    @MoneyValidator()
    @ApiProperty({ name: 'money', default:10})
    @ApiPropertyOptional()
    money: number

    @IsIn(['admin', 'vistor'])
    @ApiProperty({ name: 'role', default: 'vistor' })
    role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ name: 'id', default: 'vistor' })
    id: number
}

function PasswordValidator () {
    return applyDecorators(
        IsString(),
        MinLength(6, { message: i18nValidationMessage('validation.minLength', { field: 'password', minLength: 6 }) }),
        MaxLength(8, { message: i18nValidationMessage('validation.maxLength', { field: 'password', maxLength: 8 }) })
    );
}

function MoneyValidator () {
    return applyDecorators(
        IsNumber(),
        IsPositive(), // 正整数
        Type(() => Number) // 强制类型转换 
    );
}