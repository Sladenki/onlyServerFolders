import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
export declare const getMongoConfig: (ConfigService: ConfigService<Record<string, unknown>, false>) => Promise<TypegooseModuleOptions>;
