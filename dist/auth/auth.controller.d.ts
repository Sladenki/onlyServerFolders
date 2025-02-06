import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class AuthController {
    private jwtService;
    private readonly UserModel;
    private readonly configService;
    private supportsCapacitor;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>, configService: ConfigService);
    telegramAuthRedirect(req: Request, res: Response, query: any): Promise<any>;
    private findOrCreateUser;
}
