import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
export declare class TelegramBotService implements OnModuleInit {
    private readonly configService;
    bot: TelegramBot;
    private WEB_APP_URL;
    private SERVER_URL;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    getUserProfilePhotos(id: number): Promise<any>;
    getBotInfo(): Promise<any>;
    changeBotName(newName: string): Promise<boolean>;
    setupBotCommands(): Promise<void>;
    setupBotInfo(): Promise<void>;
    handleStartCommand(): void;
    handleAuthCommand(): void;
    sendAuthMessage(chatId: number): void;
    sendMessage(chatId: number, message: string): void;
}
