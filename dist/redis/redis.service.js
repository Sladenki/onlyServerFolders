"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
let RedisService = class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient;
        console.log('✅ Redis service initialized successfully');
    }
    async onModuleDestroy() {
        await this.redisClient.quit();
    }
    async get(key) {
        try {
            const result = await this.redisClient.get(key);
            if (result) {
                console.log(`📖 Redis CACHE HIT: ${key}`);
                return JSON.parse(result);
            }
            else {
                console.log(`❌ Redis CACHE MISS: ${key}`);
                return null;
            }
        }
        catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    }
    async set(key, value, ttl) {
        try {
            const serializedValue = JSON.stringify(value);
            if (ttl) {
                await this.redisClient.setEx(key, ttl, serializedValue);
            }
            else {
                await this.redisClient.set(key, serializedValue);
            }
            console.log(`💾 Redis CACHE SET: ${key} (TTL: ${ttl || 'no expiry'}s)`);
        }
        catch (error) {
            console.error('Redis set error:', error);
        }
    }
    async del(key) {
        try {
            await this.redisClient.del(key);
            console.log(`🗑️ Redis CACHE DEL: ${key}`);
        }
        catch (error) {
            console.error('Redis del error:', error);
        }
    }
    async reset() {
        try {
            await this.redisClient.flushDb();
            console.log('🧹 Redis CACHE RESET: All data cleared');
        }
        catch (error) {
            console.error('Redis reset error:', error);
        }
    }
    async getKeys(pattern) {
        try {
            const keys = await this.redisClient.keys(pattern);
            console.log(`🔍 Redis KEYS: Found ${keys.length} keys for pattern "${pattern}"`);
            return keys;
        }
        catch (error) {
            console.error('Redis getKeys error:', error);
            return [];
        }
    }
    async delPattern(pattern) {
        try {
            const keys = await this.getKeys(pattern);
            if (keys.length > 0) {
                await this.redisClient.del(keys);
                console.log(`🗑️ Redis DEL PATTERN: Deleted ${keys.length} keys for pattern "${pattern}"`);
            }
        }
        catch (error) {
            console.error('Redis delPattern error:', error);
        }
    }
    async ping() {
        try {
            const result = await this.redisClient.ping();
            return result === 'PONG';
        }
        catch (error) {
            console.error('Redis ping error:', error);
            return false;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map