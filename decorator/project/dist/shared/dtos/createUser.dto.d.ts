export declare class CreateUserDto {
    username: string;
    password: string;
    email: string;
    money: number;
    role: string;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: number;
}
export {};
