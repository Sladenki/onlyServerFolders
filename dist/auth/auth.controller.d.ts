import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
export declare class AuthController {
    private jwtService;
    private readonly UserModel;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>);
    onModuleInit(): void;
    telegramAuthRedirect(req: Request, res: Response, query: any): Promise<any>;
    private findOrCreateUser;
    logout(req: Request, res: Response): Promise<void>;
}
