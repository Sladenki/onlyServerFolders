import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { UserService } from 'src/user/user.service';
export declare class TelegramBotService implements OnModuleInit {
    private readonly configService;
    private readonly userService;
    bot: TelegramBot;
    private WEB_APP_URL;
    private SERVER_URL;
    private SUPPORT_URL;
    private COPYRIGHT_PDF_PATH;
    constructor(configService: ConfigService, userService: UserService);
    onModuleInit(): void;
    getUserProfilePhotos(id: number): Promise<any>;
    setupBotCommands(): Promise<void>;
    handleStartCommand(): void;
    handleAuthCommand(): void;
    handleSupportCommand(): void;
    handleCallbackQueries(): void;
    sendAuthMessage(chatId: number): Promise<void>;
    sendCopyrightAgreement(chatId: number): Promise<void>;
    acceptCopyrightAgreement(chatId: number, telegramId: number): Promise<void>;
    sendSupportMessage(chatId: number): void;
    sendMessage(chatId: number, message: string): void;
}
