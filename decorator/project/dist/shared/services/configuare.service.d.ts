import { ConfigService } from '@nestjs/config';
export declare class ConfiguareService {
    private readonly configService;
    constructor(configService: ConfigService);
    get host(): string;
    get port(): number;
    get username(): string;
    get password(): string;
    get database(): string;
    get config(): {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}
