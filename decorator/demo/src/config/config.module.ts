import { DynamicModule, Global, Module } from '@nestjs/common';
@Global()
@Module({
    // providers: [{
    //     provide: 'ccc',
    //     useValue: 'config-ccc'
    // }],
    // exports: [
    //     {
    //         provide: 'ccc',
    //         useValue: 'config-ccc'
    //     }
    // ]
})
export class ConfigModule {
    static forRoot(options: { path: string }): DynamicModule {
        return {
            module: ConfigModule,
            providers: [{
                provide: 'ccc',
                useValue: 'config-ccc' + options.path
            }],
            exports: [
                {
                    provide: 'ccc',
                    useValue: 'config-ccc'  + options.path
                }
            ]
        };
    }
}
