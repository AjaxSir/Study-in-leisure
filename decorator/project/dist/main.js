"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const class_validator_1 = require("class-validator");
const connect_redis_1 = require("connect-redis");
const redis_service_1 = require("./shared/services/redis.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    const redisService = app.get(redis_service_1.RedisService);
    const redisClient = redisService.getClient();
    const redisStore = new connect_redis_1.RedisStore({
        client: redisClient,
        prefix: 'cms:',
        ttl: 60 * 60 * 24,
    });
    app.use(session({
        store: redisStore,
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new nestjs_i18n_1.I18nValidationPipe({ transform: true }));
    app.useGlobalFilters(new nestjs_i18n_1.I18nValidationExceptionFilter({ detailedErrors: true }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('cms api')
        .addTag('cms')
        .setDescription('cms api 接口文档')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/docs-api', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map