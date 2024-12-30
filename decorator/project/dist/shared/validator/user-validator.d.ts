import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { User } from "../entities/User";
export declare class IsUserNameUniqueConstructor implements ValidatorConstraintInterface {
    private readonly user;
    constructor(user: Repository<User>);
    validate: (value: any, validationArguments?: ValidationArguments) => Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
