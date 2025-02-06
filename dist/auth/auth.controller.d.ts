import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { TelegramBotService } from 'src/telegram/telegram.service';
export declare class AuthController {
    private jwtService;
    private readonly UserModel;
    private readonly configService;
    private readonly telegramBotService;
    private supportsCapacitor;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>, configService: ConfigService, telegramBotService: TelegramBotService);
    onModuleInit(): void;
    telegramAuthRedirect(req: Request, res: Response, query: any): Promise<any>;
    private findOrCreateUser;
}
