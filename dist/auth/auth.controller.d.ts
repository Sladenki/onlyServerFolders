import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class AuthController implements OnModuleInit {
    private jwtService;
    private readonly UserModel;
    private readonly configService;
    private bot;
    private supportsCapacitor;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>, configService: ConfigService);
    onModuleInit(): void;
    telegramAuthRedirect(req: Request, res: Response, query: any): Promise<any>;
    private findOrCreateUser;
}
