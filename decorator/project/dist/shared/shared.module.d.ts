import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import 'winston-daily-rotate-file';
export declare class SharedModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
