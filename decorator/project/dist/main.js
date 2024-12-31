"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use(session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
    }));
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