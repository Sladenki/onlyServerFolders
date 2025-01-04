import { ConfigService } from '@nestjs/config';
import { VerifyCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
