import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt.service';
export declare class AuthController {
    private jwtAuthService;
    private readonly UserModel;
    constructor(jwtAuthService: JwtAuthService, UserModel: ModelType<UserModel>);
    onModuleInit(): void;
    telegramAuthRedirect(req: Request, res: Response, query: any): Promise<any>;
    private findOrCreateUser;
    logout(req: Request, res: Response): Promise<void>;
}
