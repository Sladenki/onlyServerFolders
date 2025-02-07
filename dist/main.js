"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
        origin: [
            process.env.CLIENT_URL,
            'capacitor://localhost',
            'ionic://localhost',
            'http://localhost',
            'https://graphon.up.railway.app',
            'http://localhost:8080',
            'https://graphon-client.onrender.com',
            'https://t.me'
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