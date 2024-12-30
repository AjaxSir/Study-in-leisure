export declare class User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    get contract(): string;
    updatedAt: Date;
    deletedAt: Date;
    isActive: boolean;
    email: string;
    role: string;
    money: number;
}
