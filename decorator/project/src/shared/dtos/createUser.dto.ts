// import {  } from 'class-validator'
export class CreateUserDto {
    username: string
    password: string
    email: string
    role: string
}

export class UpdateUserDto extends CreateUserDto {
    id: number
}