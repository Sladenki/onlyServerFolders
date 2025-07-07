"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("./redis.service");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'REDIS_CLIENT',
                useFactory: async (configService) => {
                    const { createClient } = await Promise.resolve().then(() => require('@redis/client'));
                    const client = createClient({
                        socket: {
                            host: configService.get('redis.host'),
                            port: configService.get('redis.port'),
                        },
                    });
                    console.log('🔗 Connecting to Redis...');
                    console.log(`   Host: ${configService.get('redis.host')}:${configService.get('redis.port')}`);
                    console.log(`   Default TTL: 24 hours (86400s)`);
                    await client.connect();
                    console.log('✅ Redis connected successfully');
                    return client;
                },
                inject: [config_1.ConfigService],
            },
            redis_service_1.RedisService,
        ],
        exports: [redis_service_1.RedisService],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map