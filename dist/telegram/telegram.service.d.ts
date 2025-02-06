import { OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
export declare class TelegramBotService implements OnModuleInit {
    bot: TelegramBot;
    constructor();
    onModuleInit(): void;
    getUserProfilePhotos(id: number): Promise<any>;
    handleStartCommand(): void;
    sendMessage(chatId: number, message: string): void;
}
