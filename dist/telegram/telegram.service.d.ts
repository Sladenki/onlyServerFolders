import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
export declare class TelegramBotService implements OnModuleInit {
    private readonly configService;
    bot: TelegramBot;
    private WEB_APP_URL;
    private SERVER_URL;
    private SUPPORT_URL;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    getUserProfilePhotos(id: number): Promise<any>;
    setupBotCommands(): Promise<void>;
    handleStartCommand(): void;
    handleAuthCommand(): void;
    handleSupportCommand(): void;
    sendAuthMessage(chatId: number): void;
    sendSupportMessage(chatId: number): void;
    sendMessage(chatId: number, message: string): void;
}
