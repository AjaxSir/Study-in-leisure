import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { I18nService } from "nestjs-i18n";

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

let userRepository = null
@Injectable()
@ValidatorConstraint({ name: "IsUserNameUniqueConstructor", async: true }) // 
export class IsUserNameUniqueConstructor implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {
        userRepository =  userRepository? userRepository : this.user
        // console.log('IsUserNameUniqueConstructor',this.user )
    }
    validate = async (value: any, validationArguments?: ValidationArguments): Promise<boolean> => {
        const result = await userRepository.findOne({
            where: {
                username: value.toLowerCase(),
            }
        })
        // console.log('IsUserNameUniqueConstructor', result)
        return !result
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const { property, value }  = validationArguments
       return `${property} ${value} is already taken!`
    }
    
}