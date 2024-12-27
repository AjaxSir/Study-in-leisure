export declare class CreateUserDto {
    username: string;
    password: string;
    email: string;
    role: string;
}
export declare class UpdateUserDto extends CreateUserDto {
    id: number;
}
