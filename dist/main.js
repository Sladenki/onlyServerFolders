"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            process.env.CLIENT_URL,
            'http://localhost:3000',
            'https://localhost:3000',
        ],
        credentials: true,
        exposedHeaders: 'set-cookie',
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map