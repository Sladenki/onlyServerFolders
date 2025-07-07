import { OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
export declare class RedisService implements OnModuleDestroy {
    private redisClient;
    constructor(redisClient: RedisClientType);
    onModuleDestroy(): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
    getKeys(pattern: string): Promise<string[]>;
    delPattern(pattern: string): Promise<void>;
    ping(): Promise<boolean>;
}
