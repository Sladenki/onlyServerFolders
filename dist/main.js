"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const fs = require("fs");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
        origin: [
            process.env.CLIENT_URL,
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